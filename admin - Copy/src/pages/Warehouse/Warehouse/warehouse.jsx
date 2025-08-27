import CustomPaginationTable from '@/components/shared/CustomTable/CustomPaginationTable';
import SkeletionTable from '@/components/skeleton/Table';
import envConfig from '@/configs/envConfig';
import useNoImage from '@/hooks/useNoImage';

import useSubmit from '@/hooks/useSubmit';
import { useGetAllWarehouseByPaginationQuery } from '@/store/api/app/Warehouse/warehouseApiSlice';
import { useGetSingleRoleByIdQuery } from '@/store/api/app/Role/roleApiSlice';
import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

const Warehouse = () => {
  const [paginationPage, setPaginationPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [warehouse, setWarehouse] = useState('desc');
  const noImage = useNoImage();

  // Fetch warehouses data

  const { data, isLoading: isWarehousesLoading, isError, error } =
    useGetAllWarehouseByPaginationQuery({
      page: paginationPage,
      limit: limit,
      warehouse: warehouse,
    });

  // Fetch role permissions
  const { isAuth, auth } = useSelector((state) => state.auth);
  const { data: roleData, isLoading: isRoleLoading } = useGetSingleRoleByIdQuery({
    id: auth?.user?.roleRef,
    permission: 'warehouse',
  });
  const id = auth?.user?.roleRef

  // Memoize permissions to avoid unnecessary re-renders
  // const permission = useMemo(() => roleData?.data?.permissions?.warehouse, [roleData]);
  const permission = {
    "access": true,
    "create": true,
    "edit": true,
    "delete": true,
  };

  // Check if data or permissions are still loading
  if (isWarehousesLoading || isRoleLoading) {
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
  //               "warehouseType": "warehouse",
  const COLUMNS = [
    {
      Header: "Warehouse Name",
      accessor: "name",
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: "Location",
      accessor: "location",
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: "Manager",
      accessor: "managerRef.name",
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: "Contact",
      accessor: "contact",
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
  ];


  return (
    <>
      <CustomPaginationTable
        title="Warehouses"
        COLUMNS={COLUMNS}
        data={data?.data}
        paginationPage={paginationPage}
        setPaginationPage={setPaginationPage}
        limit={limit}
        setLimit={setLimit}
        warehouse={warehouse}
        setWarehouse={setWarehouse}
        defaultStatus={false}
        permission={permission}
        // control={control}
        warehouse_status_show={true}
      />
    </>
  );
};

export default Warehouse;
