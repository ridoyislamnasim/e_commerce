import CustomPaginationTable from '@/components/shared/CustomTable/CustomPaginationTable';
import SkeletionTable from '@/components/skeleton/Table';
import envConfig from '@/configs/envConfig';
import useNoImage from '@/hooks/useNoImage';
import { useGetBannersByPaginationQuery } from '@/store/api/app/Banner/bannerApiSlice';
import { useGetSingleRoleByIdQuery } from '@/store/api/app/Role/roleApiSlice';
import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

const Banner = () => {
  const [paginationPage, setPaginationPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState('desc');
  const noImage = useNoImage();

  // Fetch banners data
  const { data, isLoading: isBannersLoading, isError, error } =
    useGetBannersByPaginationQuery({
      page: paginationPage,
      limit: limit,
      order: order,
    });

  // Fetch role permissions
  const { isAuth, auth } = useSelector((state) => state.auth);
  const { data: roleData, isLoading: isRoleLoading } = useGetSingleRoleByIdQuery({
    id: auth?.user?.roleRef,
    permission: 'banner',
  });

  // Memoize permissions to avoid unnecessary re-renders
  const permission = useMemo(() => roleData?.data?.permissions?.banner, [roleData]);

  // Check if data or permissions are still loading
  if (isBannersLoading || isRoleLoading) {
    return <SkeletionTable />;
  }
  console.log("banners ", data);

  // Handle errors
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  // if (!permission) {
  //   return <div>You do not have permission to view this data.</div>;
  // }

  const COLUMNS = [
    {
      Header: 'Banner Type',
      accessor: 'bannerType',
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: 'Banner Image',
      accessor: 'image',
      Cell: (row) => (
        
        <img
          src={`${row?.cell?.value}`}
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
    //   Header: 'Title',
    //   accessor: 'title',
    //   Cell: (row) => <span>{row?.cell?.value}</span>,
    // },
    // {
    //   Header: 'Details',
    //   accessor: 'details',
    //   Cell: (row) => <span>{row?.cell?.value}</span>,
    // },
  ];

  return (
    <>
      <CustomPaginationTable
        title="Banners"
        COLUMNS={COLUMNS}
        data={data?.data}
        paginationPage={paginationPage}
        setPaginationPage={setPaginationPage}
        isView={false}
        limit={limit}
        setLimit={setLimit}
        order={order}
        setOrder={setOrder}
        defaultStatus={false}
        permission={permission}
      />
    </>
  );
};

export default Banner;
