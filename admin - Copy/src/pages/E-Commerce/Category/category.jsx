import CustomPaginationTable from '@/components/shared/CustomTable/CustomPaginationTable';
import SkeletionTable from '@/components/skeleton/Table';
import envConfig from '@/configs/envConfig';
import useNoImage from '@/hooks/useNoImage';
import { useGetCategorysByPaginationQuery } from '@/store/api/app/Category/categoryApiSlice';
import { useGetSingleRoleByIdQuery } from '@/store/api/app/Role/roleApiSlice';
import { fa } from '@faker-js/faker';
import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

const Category = () => {
  const [paginationPage, setPaginationPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState('desc');
  const noImage = useNoImage();

  // Fetch categories data
  const { data, isLoading: isCategoriesLoading, isError, error } =
    useGetCategorysByPaginationQuery({
      page: paginationPage,
      limit: limit,
      order: order,
      search: '',
    });

  // Fetch role permissions
  const { auth } = useSelector((state) => state.auth);
  const { data: roleData, isLoading: isRoleLoading } = useGetSingleRoleByIdQuery({
    id: auth?.user?.roleRef,
    permission: 'category', // Adjusted permission key
  });

  // Memoize permissions to avoid unnecessary re-renders
  const permission = useMemo(() => roleData?.data?.permissions?.category, [roleData]);

  // Check if data or permissions are still loading
  if (isCategoriesLoading || isRoleLoading) {
    return <SkeletionTable />;
  }

  // Handle errors
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  // if (!permission) {
  //   return <div>You do not have permission to view this data.</div>;
  // }

  const COLUMNS = [
    {
      Header: 'Name',
      accessor: 'name',
      Cell: (row) => <span>{row.cell.value}</span>,
    },
    {
      Header: 'Image',
      accessor: 'image',
      Cell: (row) => (
        <img
          src={row?.cell?.value}
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
    //   Header: 'Color Code',
    //   accessor: 'colorCode',
    //   Cell: (row) => (
    //     <div
    //       style={{
    //         backgroundColor: row.cell.value,
    //         width: '30px',
    //         height: '30px',
    //         borderRadius: '4px',
    //         display: 'inline-block',
    //       }}
    //       className="border border-black-400"
    //     ></div>
    //   ),
    // },
  ];

  return (
    <>
      <CustomPaginationTable
        title="Categories"
        COLUMNS={COLUMNS}
        data={data?.data}
        paginationPage={paginationPage}
        setPaginationPage={setPaginationPage}
        limit={limit}
        setLimit={setLimit}
        order={order}
        setOrder={setOrder}
        permission={permission}
        defaultStatus={false}
        isView={false}

      />
    </>
  );
};

export default Category;
