import CustomPaginationTable from '@/components/shared/CustomTable/CustomPaginationTable';
import SkeletionTable from '@/components/skeleton/Table';
import envConfig from '@/configs/envConfig';
import useNoImage from '@/hooks/useNoImage';

import { useGetSingleRoleByIdQuery } from '@/store/api/app/Role/roleApiSlice';
import { useGetWishListsByPaginationQuery } from '@/store/api/app/WishList/wishListApiSlice';

import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

const WishList = () => {
  const [paginationPage, setPaginationPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState('desc');
  const noImage = useNoImage();
console.log("this call wish list")
  // Fetch wishLists data
  const { data, isLoading: isWishListsLoading, isError, error } =
    useGetWishListsByPaginationQuery({
      page: paginationPage,
      limit: limit,
      order: order,
    });

  // Fetch role permissions
  const { isAuth, auth } = useSelector((state) => state.auth);
  const { data: roleData, isLoading: isRoleLoading } = useGetSingleRoleByIdQuery({
    id: auth?.user?.roleRef,
    permission: 'wishlist',
  });

  // Memoize permissions to avoid unnecessary re-renders
  const permission = useMemo(() => roleData?.data?.permissions?.wishlist, [roleData]);

  // Check if data or permissions are still loading
  if (isWishListsLoading || isRoleLoading) {
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
      Header: 'User Name',
      accessor: 'userRef.name',
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: 'Product Name',
      accessor: 'productRef.name',
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
  ];

  return (
    <>
      <CustomPaginationTable
        title="WishLists"
        COLUMNS={COLUMNS}
        data={data?.data}
        paginationPage={paginationPage}
        setPaginationPage={setPaginationPage}
        limit={limit}
        setLimit={setLimit}
        order={order}
        setOrder={setOrder}
        defaultStatus={false}
        addNew={false}
        isEdit={false}
        permission={permission}
      />
    </>
  );
};

export default WishList;
