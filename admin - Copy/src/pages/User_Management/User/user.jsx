import CustomPaginationTable from '@/components/shared/CustomTable/CustomPaginationTable';
import SkeletionTable from '@/components/skeleton/Table';
import envConfig from '@/configs/envConfig';
import useNoImage from '@/hooks/useNoImage';


import { useGetSingleRoleByIdQuery } from '@/store/api/app/Role/roleApiSlice';
import { useGetUsersByPaginationQuery } from '@/store/api/app/User/userApiSlice';
import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

const User = () => {
  const [paginationPage, setPaginationPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState('desc');
  const noImage = useNoImage();

  // Fetch childCategorys data
  const { data, isLoading: isUsersLoading, isError, error } =
    useGetUsersByPaginationQuery({
      page: paginationPage,
      limit: limit,
      order: order,
    });

  // Fetch role permissions
  const { isAuth, auth } = useSelector((state) => state.auth);
  const { data: roleData, isLoading: isRoleLoading } = useGetSingleRoleByIdQuery({
    id: auth?.user?.roleRef,
    permission: 'user',
  });

  // Memoize permissions to avoid unnecessary re-renders
  const permission = useMemo(() => roleData?.data?.permissions?.user, [roleData]);

  // Check if data or permissions are still loading
  if (isUsersLoading || isRoleLoading) {
    return <SkeletionTable />;
  }

  // Handle errors
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!permission) {
    return <div>You do not have permission to view this data.</div>;
  }

  const COLUMNS = [
    {
      Header: 'User ID',
      accessor: 'userId',
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: 'User Name',
      accessor: 'name',
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: 'Email',
      accessor: 'email',
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: 'Phone Number',
      accessor: 'phone',
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: 'User Role',
      accessor: 'roleRef.role',
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: 'Warehouse',
      accessor: 'warehouseRef.name',
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: 'Child Category Image',
      accessor: 'image',
      Cell: (row) => (
        <img
          src={`${envConfig.apiUrl}${row?.cell?.value}`}
          alt="slider"
          className="h-20 w-auto object-cover rounded-lg"
          onError={(e) => {
            e.target.onerror = null; // Prevents looping
            e.target.src = noImage;
          }}
        />
      ),
    },

    // {
    //   Header: 'Details',
    //   accessor: 'details',
    //   Cell: (row) => <span>{row?.cell?.value}</span>,
    // },
  ];

  return (
    <>
      <CustomPaginationTable
        title="Users"
        COLUMNS={COLUMNS}
        data={data?.data}
        paginationPage={paginationPage}
        setPaginationPage={setPaginationPage}
        limit={limit}
        setLimit={setLimit}
        order={order}
        setOrder={setOrder}
        // defaultStatus={true}
        permission={permission}
      />
    </>
  );
};

export default User;
