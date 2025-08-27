import CustomPaginationTable from '@/components/shared/CustomTable/CustomPaginationTable';
import SkeletionTable from '@/components/skeleton/Table';
import envConfig from '@/configs/envConfig';
import useNoImage from '@/hooks/useNoImage';

import useSubmit from '@/hooks/useSubmit';
import { useGetAllOrderByPaginationQuery } from '@/store/api/app/Order/orderApiSlice';
import { useGetSingleRoleByIdQuery } from '@/store/api/app/Role/roleApiSlice';
import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

const Order = () => {
  const [paginationPage, setPaginationPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState('desc');
  const noImage = useNoImage();
  const { isAuth, auth } = useSelector((state) => state.auth);
  // Fetch orders data

  const { data, isLoading: isOrdersLoading, isError, error } =
    useGetAllOrderByPaginationQuery({
      page: paginationPage,
      limit: limit,
      order: order,
      warehouseRef: auth?.user?.warehouseRef,
    });

  // Fetch role permissions

  const { data: roleData, isLoading: isRoleLoading } = useGetSingleRoleByIdQuery({
    id: auth?.user?.roleRef,
    permission: 'order',
  });
  const id = auth?.user?.roleRef

  // Memoize permissions to avoid unnecessary re-renders
  const permission = useMemo(() => roleData?.data?.permissions?.order, [roleData]);

  // Check if data or permissions are still loading
  if (isOrdersLoading || isRoleLoading) {
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
  //               "orderType": "order",
  const COLUMNS = [
    {
      Header: "Order ID",
      accessor: "orderId",
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: "Product Details",
      accessor: "productDetails", // Unique accessor
      Cell: ({ row }) => (
        <div className="space-y-2">
          {row.original.products.map((product, index) => (
            <div
              key={index}
              className={`pb-1 ${index !== row.original.products.length - 1 ? "border-b" : ""}`}
            >
              <p>
                <strong>Product ID:</strong> {product?.productRef?.productId}
              </p>
              <p>
                <strong>Product Name:</strong> {product?.productRef?.name}
              </p>
              <p>
                <strong>Product Price:</strong> {product?.productRef?.mrpPrice}
              </p>
              <p>
                <strong>Quantity:</strong> {product?.quantity}
              </p>
            </div>
          ))}
        </div>
      ),
    },
    {
      Header: "Inventory Details",
      accessor: "inventoryDetails", // Unique accessor
      Cell: ({ row }) => (
        <div className="space-y-2">
          {row.original.products.map((product, index) => (
            <div
              key={index}
              className={`pb-1 ${index !== row.original.products.length - 1 ? "border-b" : ""}`}
            >
              <p>
                <strong>Inventory ID:</strong> {product?.inventoryRef?.inventoryID}
              </p>
              <p>
                <strong>Discount:</strong> {product?.productDiscount * product.quantity}
              </p>
              <p>
                <strong>Color:</strong> {product?.color}
              </p>
              <p>
                <strong>Level:</strong> {product?.level}
              </p>
            </div>
          ))}
        </div>
      ),
    },
    {
      Header: "Total Amount",
      accessor: "totalPrice",
      Cell: (row) => <span>{row?.cell?.value.toFixed(2)}</span>,
    },
    {
      Header: "Total Discount",
      accessor: "discount",
      Cell: (row) => <span>{row?.cell?.value.toFixed(2)}</span>,
    },
    {
      Header: "Sub Total Amount",
      accessor: "subTotalPrice",
      Cell: (row) => <span>{row?.cell?.value.toFixed(2)}</span>,
    },
    {
      Header: "Payment",
      accessor: "paymentRef",
      Cell: ({ row }) => {
        const totalAmount = row.original.paymentRef?.reduce(
          (sum, payment) => sum + (payment?.amount || 0),
          0
        );

        return <strong>{totalAmount.toFixed(2)}</strong>;
      },
    },
    {
      Header: "Deu",
      accessor: "Deu",
      Cell: ({ row }) => {
        const totalAmount = row.original.paymentRef?.reduce(
          (sum, payment) => sum + (payment?.amount || 0),
          0
        );
        const deu = row.original.subTotalPrice - totalAmount
        return <strong>{deu.toFixed(2)}</strong>;
      },
    },
    {
      Header: "User Type",
      accessor: "isGuestUser",
      Cell: (row) => <span>{row?.cell?.value == true ? "Yes" : "No"}</span>,
    },
    {
      Header: "User Name",
      accessor: "userRef.name",
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


  return (
    <>
      <CustomPaginationTable
        title="Orders"
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
        // control={control}
        order_status_show={true}
      />
    </>
  );
};

export default Order;
