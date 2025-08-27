import CustomPaginationTable from '@/components/shared/CustomTable/CustomPaginationTable';
import SkeletionTable from '@/components/skeleton/Table';
import envConfig from '@/configs/envConfig';
import useNoImage from '@/hooks/useNoImage';

import useSubmit from '@/hooks/useSubmit';

import { useGetSingleRoleByIdQuery } from '@/store/api/app/Role/roleApiSlice';
import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useGetAllTransferToByPaginationQuery } from '@/store/api/app/Transfer/transferApiSlice';

const ReceviedTransfer = () => {
  const [paginationPage, setPaginationPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [limit, setLimit] = useState(10);
  const [receviedTransfer, setReceviedTransfer] = useState('desc');
  const noImage = useNoImage();
  const { isAuth, auth } = useSelector((state) => state.auth);
  // Fetch receviedTransfers data

  const { data, isLoading: isReceviedTransfersLoading, isError, error } =
    useGetAllTransferToByPaginationQuery({
      page: paginationPage,
      limit: limit,
      // receviedTransfer: receviedTransfer,
      idTo: auth?.user?.warehouseRef,
    });

  // Fetch role permissions

  const { data: roleData, isLoading: isRoleLoading } = useGetSingleRoleByIdQuery({
    id: auth?.user?.roleRef,
    permission: 'receviedTransfer',
  });
  const id = auth?.user?.roleRef

  // Memoize permissions to avoid unnecessary re-renders
  // const permission = useMemo(() => roleData?.data?.permissions?.receviedTransfer, [roleData]);
  const permission = {
    "access": true,
    "create": true,
    "edit": true,
    "delete": true,
  };

  // Check if data or permissions are still loading
  if (isReceviedTransfersLoading || isRoleLoading) {
    return <SkeletionTable />;
  }

  // Handle errors
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!permission) {
    return <div>You do not have permission to view this data.</div>;
  }

  // "productRef": "6799f7bdd16aaa99acd0da45"
  // "quantity": 44,
  //               "availableQuantity": 44,
  //               "soldQuantity": 0,
  //               "restockingQuantity": 0,
  //               "receviedTransferType": "receviedTransfer",
  const COLUMNS = [
    {
      Header: "Send Warehouse Name",
      accessor: "fromWarehouseRef.name",
      Cell: (row) => <span>
        {row?.cell?.value}
      </span>,
    },
    {
      Header: "Recevied Warehouse Name",
      accessor: "toWarehouseRef.name",
      Cell: (row) => <span>
        {row?.cell?.value}
      </span>,
    },
    {
      Header: "Quantity",
      accessor: "quantity",
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: "Level",
      accessor: "inventoryRef.level",
      // Cell: (row) => <span>{row?.cell?.value}</span>,
      Cell: (row) => <span>{row.cell.value || "N/A"}</span>,
    },
    {
      Header: "Color Name",
      accessor: "inventoryRef.name",
      // Cell: (row) => <span>{row?.cell?.value}</span>,
      Cell: (row) => <span>{row.cell.value || "N/A"}</span>,
    },
    {
      Header: "Color",
      accessor: "inventoryRef.color",
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
  console.log("Inventory selected", selectedRows,)

  return (
    <>
      <CustomPaginationTable
        title="ReceviedTransfers"
        COLUMNS={COLUMNS}
        data={data?.data}
        paginationPage={paginationPage}
        setPaginationPage={setPaginationPage}
        limit={limit}
        setLimit={setLimit}
        receviedTransfer={receviedTransfer}
        setReceviedTransfer={setReceviedTransfer}
        defaultStatus={false}
        defaultAction={false}
        // isView={false}
        // isEdit={false}
        // isDelete={false}
        permission={permission}
        // control={control}
        transfer_status_show = {true}
      />
    </>
  );
};

export default ReceviedTransfer;
