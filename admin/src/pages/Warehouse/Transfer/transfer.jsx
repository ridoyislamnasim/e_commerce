import CustomPaginationTable from '@/components/shared/CustomTable/CustomPaginationTable';
import SkeletionTable from '@/components/skeleton/Table';
import envConfig from '@/configs/envConfig';
import useNoImage from '@/hooks/useNoImage';

import useSubmit from '@/hooks/useSubmit';

import { useGetSingleRoleByIdQuery } from '@/store/api/app/Role/roleApiSlice';
import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useGetInventorysByPaginationQuery } from '@/store/api/app/Inventory/inventoryApiSlice';
import Button from '@/components/ui/Button';
import SelectWarehouse from '@/components/shared/Select/SelectWarehouse';
import SelectWarehouseWithoutForm from '@/components/shared/Select/SelectWarehouseWithoutForm';
import { useCreateTransferMutation } from '@/store/api/app/Transfer/transferApiSlice';
import { toast } from 'react-toastify';
// import useSubmit from '@/hooks/useSubmit';
const Transfer = () => {
  const [paginationPage, setPaginationPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [limit, setLimit] = useState(10);
  const [transfer, setTransfer] = useState('desc');
  const noImage = useNoImage();
  const { isAuth, auth } = useSelector((state) => state.auth);
  const [warehouseId, setWarehouseId] = useState('');
  const [warehouseItem, setWarehouseItem] = useState(null);
  // const { submit, isSubmitting } = useSubmit();
  const [quantities, setQuantities] = useState({});
  // Fetch transfers data
  console.log("--------", warehouseId, warehouseItem)
  const { data, isLoading: isTransfersLoading, isError, error } =
    useGetInventorysByPaginationQuery({
      page: paginationPage,
      limit: limit,
      transfer: transfer,
      warehouseRef: auth?.user?.warehouseRef,
    });
  const [createTransfer] = useCreateTransferMutation();
  // Fetch role permissions

  const { data: roleData, isLoading: isRoleLoading } = useGetSingleRoleByIdQuery({
    id: auth?.user?.roleRef,
    permission: 'transfer',
  });
  const id = auth?.user?.roleRef

  // Memoize permissions to avoid unnecessary re-renders
  // const permission = useMemo(() => roleData?.data?.permissions?.transfer, [roleData]);
  const permission = {
    "access": true,
    "create": true,
    "edit": true,
    "delete": true,
  };

  // Check if data or permissions are still loading
  if (isTransfersLoading || isRoleLoading) {
    return <SkeletionTable />;
  }

  // Handle errors
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!permission) {
    return <div>You do not have permission to view this data.</div>;
  }

  // Handle quantity input
  const handleQuantityChange = (inventoryID, availableQuantity, value) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue <= availableQuantity) {
      setQuantities((prev) => ({ ...prev, [inventoryID]: parsedValue }));
    }
  };
  const celarSelectedId = () => {
    setSelectedRows([]);
    setQuantities({});
  }
  console.log("Setting quantity", quantities)
  // // Submit Data
  const handleSubmit = async () => {
    const quantitys = Object.values(quantities)
    const inventoryRefs = selectedRows.map((row) => (row._id));

    if (!warehouseItem) {
      toast.error("Please select a warehouse!");
      return;
    }
    if (quantitys.length !== inventoryRefs.length) {
      toast.error("Mismatch between selected items and quantities!");
      return;
    }
    
// quantities get all  transfers from 
// quantitys length and inventoryRefs length are same length other wise error show 

    const data = {
      quantitys,
      inventoryRefs,
      fromWarehouseRef: auth?.user?.warehouseRef,
      toWarehouseRef: warehouseItem
    };

    // await createTransfer(data)
    // toast.success("Transfer successful!");
    try {
      const response = await createTransfer(data).unwrap();
      toast.success("Transfer successful!");
      celarSelectedId(); // Clear selection after success
    } catch (err) {
      toast.error(err?.data?.message || "Transfer failed!");
    }
  };

  const COLUMNS = [
    {
      Header: "Inventory ID",
      accessor: "inventoryID",
      Cell: (row) => <span>
        {row?.cell?.value}
      </span>,
    },
    {
      Header: "Product Name",
      accessor: "productRef.name",
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: "Product ID",
      accessor: "productRef.productId",
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: "Total  Quantity",
      accessor: "quantity",
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: "Available Quantity",
      accessor: "availableQuantity",
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: "Solded Quantity",
      accessor: "soldQuantity",
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: "Hold Quantity",
      accessor: "holdQuantity",
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: "Level",
      accessor: "level",
      // Cell: (row) => <span>{row?.cell?.value}</span>,
      Cell: (row) => <span>{row.cell.value || "N/A"}</span>,
    },
    {
      Header: "Color Name",
      accessor: "name",
      // Cell: (row) => <span>{row?.cell?.value}</span>,
      Cell: (row) => <span>{row.cell.value || "N/A"}</span>,
    },
    {
      Header: "Color",
      accessor: "color",
      // Cell: (row) => <span>{row?.cell?.value}</span>,
      Cell: (row) => (
        <div
          style={{
            backgroundColor: row.cell.value,
            width: '30px',
            height: '30px',
            borderRadius: '4px',
            display: 'inline-block',
          }}
          className="border border-black-400"
        ></div>
      ),
    },
    {
      Header: "Inventory Type",
      accessor: "inventoryType",
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: "Create Date",
      accessor: "createdAt",
      Cell: (row) => (
        <span>
          {new Date(row?.cell?.value).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      ),
    },

  ];
  console.log("Inventory selected", selectedRows,)

  return (
    <>
      {selectedRows.length > 0 && (
        <div className="text-base dark:text-white dark:bg-black-700 mb-4 p-4 border border-gray-300 rounded-lg bg-gray-100">
          <h2 className="text-lg font-semibold mb-2">Selected Items for Transfer</h2>
          <SelectWarehouseWithoutForm
            label="Received Warehouse"
            required
            setState={setWarehouseId}
            setItem={setWarehouseItem}
            state={warehouseId}
            defaultValue={warehouseId}
          />
          <table className="mt-10 rounded min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
            <thead className=''>
              <tr className="">
                <th className="border border-gray-400 px-4 py-2">Inventory ID</th>
                <th className="border border-gray-400 px-4 py-2">Product Name</th>
                <th className="border border-gray-400 px-4 py-2">Available Quantity</th>
                <th className="border border-gray-400 px-4 py-2">Transfer Quantity</th>
              </tr>
            </thead>
            <tbody>
              {selectedRows.map((row) => (
                <tr key={row.inventoryID} className="text-center">
                  <td className="border border-gray-400 px-4 py-2">{row.inventoryID}</td>
                  <td className="border border-gray-400 px-4 py-2">{row.productRef.name}</td>
                  <td className="border border-gray-400 px-4 py-2">{row.availableQuantity}</td>
                  <td className="border border-gray-400 ">
                    <input
                      type="number"
                      placeholder='Enter transfer quantity'
                      // max={row.availableQuantity}
                      value={quantities[row.inventoryID] || ""}
                      onChange={(e) =>
                        handleQuantityChange(row.inventoryID, row.availableQuantity, e.target.value)
                      }
                      className=" bg-gray-100 px-4 py-2 w-full h-full"
                      required
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="ltr:text-right rtl:text-left space-x-3 rtl:space-x-reverse mt-6">
            {/* <Button
						onClick={() => celarSelectedId()}
						text="Cancel"
						className="btn-light"
					/> */}
            <Button
              onClick={handleSubmit}
              // isLoading={isLoading} //
              type="submit"
              text="Save" // {isSubmitting ? "Submitting..." : "Submit Transfer"}
              className="btn-dark"
            />
          </div>
        </div>
      )}

      <CustomPaginationTable
        rowSelect={true}
        selectedIds={selectedRows}
        setSelectedIds={setSelectedRows}
        title="Transfers"
        COLUMNS={COLUMNS}
        data={data?.data}
        paginationPage={paginationPage}
        setPaginationPage={setPaginationPage}
        limit={limit}
        setLimit={setLimit}
        transfer={transfer}
        setTransfer={setTransfer}
        defaultStatus={false}
        defaultAction={false}
        permission={permission}
      />

    </>
  );
};

export default Transfer;
