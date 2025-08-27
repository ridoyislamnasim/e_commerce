import CustomPaginationTable from '@/components/shared/CustomTable/CustomPaginationTable';
import CustomTable from '@/components/shared/CustomTable/CustomTable';
import SkeletionTable from '@/components/skeleton/Table';
import envConfig from '@/configs/envConfig';
import useNoImage from '@/hooks/useNoImage';

import useSubmit from '@/hooks/useSubmit';
import { useGetProfitReportQuery } from '@/store/api/app/Report/reportApiSlice';
import { useGetSingleRoleByIdQuery } from '@/store/api/app/Role/roleApiSlice';
import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

const ProfitReport = () => {
  const { isAuth, auth } = useSelector((state) => state.auth);
  // Fetch orders data

  const { data, isLoading: isProfitReportsLoading, isError, error } =
    useGetProfitReportQuery({
      duration: 'this-year',
      warehouseRef: auth?.user?.warehouseRef,
    });
  console.log(" Profit Report data", data)
  // Fetch role permissions

  const { data: roleData, isLoading: isRoleLoading } = useGetSingleRoleByIdQuery({
    id: auth?.user?.roleRef,
    permission: 'order',
  });
  const id = auth?.user?.roleRef

  // Memoize permissions to avoid unnecessary re-renders
  const permission = useMemo(() => roleData?.data?.permissions?.order, [roleData]);

  // Check if data or permissions are still loading
  if (isProfitReportsLoading || isRoleLoading) {
    return <SkeletionTable />;
  }

  // Handle errors
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!permission) {
    return <div>You do not have permission to view this data.</div>;
  }


  console.log("data", data?.data)
  const SellData = [
    // { label: "Opening Stock (By purchase price)", value: `৳ ${data?.data?.totalStock[0]?.totalTotalStockWarehousePrice}` },
    // { label: "In Stock (By purchase price)", value: `৳ ${data?.data?.totalStock[0]?.totalInStockWarehousePrice}` },
    // { label: "Total purchase (Exc. tax, Discount)", value: "৳ 1,608,190.05" },
    // { label: "Total Stock Adjustment", value: "৳ 100.00" },
    // { label: "Total Expense", value: "৳ 252,614.00" },
    // { label: "Total purchase shipping charge", value: "৳ 0.00" },
    // { label: "Purchase additional expenses", value: "৳ 0.00" },
    // { label: "Total transfer shipping charge", value: "৳ 0.00" },
    { label: "Total  Sell", value: `৳ ${data?.data?.totalSales?.totalSales}` },
    { label: "Total Sell discount", value: `৳ ${data?.data?.totalSales?.discount}` },
    // { label: "Total customer reward", value: "৳ 100.00" },
    // { label: "Total Sell Return", value: "৳ 75,794.00" },
  ];
  const stockData = [
    { label: "Opening Stock (By purchase price)", value: `৳ ${data?.data?.totalStock[0]?.totalTotalStockWarehousePrice}` },
    { label: "In Stock (By purchase price)", value: `৳ ${data?.data?.totalStock[0]?.totalInStockWarehousePrice}` },
  ];


  return (
    <div className="mb-4 transition-all lg:col-span-2 duration-200 bg-white shadow-sm rounded-xl ring-1 hover:shadow-md hover:translate-y-0.5 ring-gray-200">
      <div className="p-4 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-800">Sales</h2>
        <div className="w-full">
          {SellData.map((item, index) => (
            <div
              key={index}
              className={`flex justify-between py-3 px-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}`}
            >
              <span className="font-medium text-gray-700">{item.label}:</span>
              <span className="text-gray-900 font-semibold">{item.value}</span>
            </div>
          ))}
          <div className={`flex justify-between py-3 px-4 mt-2 rounded-md bg-white border border-black-500  border-dashed`}>
            <span className="font-medium text-gray-700">SubTotal Sales:</span>
            <span className="text-gray-900 font-semibold">{data?.data?.totalSales?.subTotalPrice}</span>
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-800">Stock</h2>
        <div className="w-full">
          {stockData.map((item, index) => (
            <div
              key={index}
              className={`flex justify-between py-3 px-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}`}
            >
              <span className="font-medium text-gray-700">{item.label}:</span>
              <span className="text-gray-900 font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-800">Profit And Loss</h2>
        <h2 className="text-sm  text-gray-500">( Profit = Opening Stock - In Stock + Total Sales )</h2>
        <div className="w-full">
          <div className={`flex justify-between py-3 px-4 bg-gray-50 `}>
            <span className="font-medium text-gray-700">In Stock:</span>
            <span className="text-gray-900 font-semibold">{data?.data?.totalStock[0]?.totalInStockWarehousePrice}</span>
          </div>
          <div className={`flex justify-between py-3 px-4 bg-gray-50 `}>
            <span className="font-medium text-gray-700">Total Sales:</span>
            <span className="text-gray-900 font-semibold">  {data?.data?.totalSales?.subTotalPrice}</span>
          </div>
          <div className={`flex justify-between py-3 px-4 mt-2 rounded-md bg-white border border-black-500  border-dashed`}>
            <span className="font-medium text-gray-700">In Stock + Total Sales:</span>
            <span className="text-gray-900 font-semibold">{data?.data?.totalSales?.subTotalPrice + data?.data?.totalStock[0]?.totalInStockWarehousePrice}</span>
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-800">Profit And Loss</h2>
        <div className="w-full">
          <div className={`flex justify-between py-3 px-4 bg-gray-50 `}>
            <span className="font-medium text-gray-700">In Stock + Total Sales:</span>
            <span className="text-gray-900 font-semibold">{data?.data?.totalSales?.subTotalPrice + data?.data?.totalStock[0]?.totalInStockWarehousePrice}</span>
          </div>
          <div className={`flex justify-between py-3 px-4 bg-gray-50 `}>
            <span className="font-medium text-gray-700">Opening Stock :</span>
            <span className="text-gray-900 font-semibold">  {data?.data?.totalStock[0]?.totalTotalStockWarehousePrice}</span>
          </div>
          <div className={`flex justify-between py-3 px-4 mt-2 rounded-md bg-white border border-black-500  border-dashed`}>
            <span className="font-medium text-gray-700">Profit / Loss:</span>
            <span className="text-gray-900 font-semibold">{data?.data?.totalSales?.subTotalPrice + data?.data?.totalStock[0]?.totalInStockWarehousePrice - data?.data?.totalStock[0]?.totalTotalStockWarehousePrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitReport;
