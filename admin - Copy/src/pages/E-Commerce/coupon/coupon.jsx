import CustomPaginationTable from '@/components/shared/CustomTable/CustomPaginationTable';
import SkeletionTable from '@/components/skeleton/Table';
import envConfig from '@/configs/envConfig';
import useNoImage from '@/hooks/useNoImage';
import { useGetCouponsByPaginationQuery } from '@/store/api/app/Coupon/couponApiSlice';

import { useGetSingleRoleByIdQuery } from '@/store/api/app/Role/roleApiSlice';
import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

const Coupon = () => {
  const [paginationPage, setPaginationPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState('desc');
  const noImage = useNoImage();

  // Fetch coupons data
  const { data, isLoading: isCouponsLoading, isError, error } =
    useGetCouponsByPaginationQuery({
      page: paginationPage,
      limit: limit,
      order: order,
    });

  // Fetch role permissions
  const { isAuth, auth } = useSelector((state) => state.auth);
  const { data: roleData, isLoading: isRoleLoading } = useGetSingleRoleByIdQuery({
    id: auth?.user?.roleRef,
    permission: 'coupon',
  });

  // Memoize permissions to avoid unnecessary re-renders
  const permission = useMemo(() => roleData?.data?.permissions?.coupon, [roleData]);

  // Check if data or permissions are still loading
  if (isCouponsLoading || isRoleLoading) {
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
      Header: "Coupon Code",
      accessor: "code",
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: "Discount",
      accessor: "discount",
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: "Use Limit",
      accessor: "useLimit",
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: "Coupon Used",
      accessor: "used",
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: "Start Date",
      accessor: "startDate",
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
    {
      Header: "Expire Date",
      accessor: "expireDate",
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
    {
      Header: "Discount Type",
      accessor: "discountType",
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: "Brand Coupon",
      accessor: "brandRef.name", // Dot notation for nested fields
      Cell: ({ cell: { value } }) => <span>{value || "N/A"}</span>,
    },
    {
      Header: "Category Coupon",
      accessor: "categoryRef.name", // Dot notation for nested fields
      Cell: ({ cell: { value } }) => <span>{value || "N/A"}</span>,
    },
    {
      Header: "Sub Category Coupon",
      accessor: "subCategoryRef.name", // Dot notation for nested fields
      Cell: ({ cell: { value } }) => <span>{value || "N/A"}</span>,
    },
  ];
  

  return (
    <>
      <CustomPaginationTable
        title="Coupons"
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
      />
    </>
  );
};

export default Coupon;
