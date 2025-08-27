import CustomPaginationTable from '@/components/shared/CustomTable/CustomPaginationTable';
import SkeletionTable from '@/components/skeleton/Table';
import envConfig from '@/configs/envConfig';
import useNoImage from '@/hooks/useNoImage';
import { useGetInventorysByPaginationQuery } from '@/store/api/app/Inventory/inventoryApiSlice';
import { useGetSingleRoleByIdQuery } from '@/store/api/app/Role/roleApiSlice';
import BarcodeGenerator from '@/utils/barcodeGenerator';
// import BarcodeGenerator from '@/utils/barcodeGenerator';
import Button from '@/components/ui/Button';
import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

const Inventory = () => {
  const [paginationPage, setPaginationPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState('desc');
  const [selectedRows, setSelectedRows] = useState([]);
  const noImage = useNoImage();
  const { isAuth, auth } = useSelector((state) => state.auth);

  // Fetch inventorys data
  const { data, isLoading: isInventorysLoading, isError, error } =
    useGetInventorysByPaginationQuery({
      page: paginationPage,
      limit: limit,
      order: order,
      warehouseRef: auth?.user?.warehouseRef,
    });

  const { data: roleData, isLoading: isRoleLoading } = useGetSingleRoleByIdQuery({
    id: auth?.user?.roleRef,
    permission: 'inventory',
  });

  const permission = useMemo(() => roleData?.data?.permissions?.inventory, [roleData]);
  console.log("Permission inventory: " ,  permission)

  if (isInventorysLoading || isRoleLoading) {
    return <SkeletionTable />;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!permission) {
    return <div>You do not have permission to view this data.</div>;
  }


  const COLUMNS = [
    {
      Header: "Inventory ID",
      accessor: "inventoryID",
      Cell: (row) => <span>
        {row?.cell?.value}
      </span>,
    },
    {
      Header: "BarCode",
      accessor: "barcode",
      Cell: (row) => (<span>
        <BarcodeGenerator value={row?.cell?.value} />
        {/* { console.log("------------------------------------",row?.row?.values?.inventoryID)} */}
      </span>),
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
      Header: "Price",
      accessor: "productRef.price",
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: "Available Price",
      accessor: "product",
      Cell: (row) => <span>{
        <div className="">
        <p>
          <strong>Available Price:</strong> {(row?.row?.original?.availableQuantity * row?.row?.original?.productRef?.price)}
        </p>
        <p>
          <strong>Total Stock Price:</strong> {((row?.row?.original?.quantity + row?.row?.original?.soldQuantity) * row?.row?.original?.productRef?.price)}
        </p>

      </div>
        

      }</span>,
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


  return (
    <>

      <CustomPaginationTable
        rowSelect={true}
        selectedIds={selectedRows}
        setSelectedIds={setSelectedRows}
        title="Inventorys"
        COLUMNS={COLUMNS}
        data={data?.data}
        paginationPage={paginationPage}
        setPaginationPage={setPaginationPage}
        limit={limit}
        setLimit={setLimit}
        order={order}
        setOrder={setOrder}
        defaultStatus={false}
        permission={permission}
        // defaultAction={false}
        isPrintInventory={true}
        isPrintBarcode={true}
      />
    </>
  );
};

export default Inventory;
