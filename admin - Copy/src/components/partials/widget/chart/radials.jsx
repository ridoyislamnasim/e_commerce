import React from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import useWidth from "@/hooks/useWidth";
import { useGetOrderReportQuery } from "@/store/api/app/Report/reportApiSlice";
import Loading from "@/components/Loading";

const RadialsChart = ({ selectChartDuration }) => {
  const [isDark] = useDarkMode();
  const { width, breakpoints } = useWidth();

  const { data, isLoading , isFetching} = useGetOrderReportQuery({ duration: selectChartDuration });
  if (isLoading || isFetching) return <Loading />;
  const rawSeries = data?.data?.map((item) => item.totalOrders) ;
  const labels = data?.data?.map((item) => item.status);

  // Calculate total orders
  const totalOrders = rawSeries?.reduce((sum, value) => sum + value, 0);

  // Normalize series to percentages
  const series =  rawSeries?.map((value) => Math.round((value / totalOrders) * 100));

  const options = {
    chart: { toolbar: { show: true } },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "30%", // Reduce the hollow size to make bars thicker
        },
        track: {
          background: "#E2E8F0",
          strokeWidth: "85%", // Increase stroke width to make the track wider
        },
        dataLabels: {
          name: { fontSize: "22px", color: isDark ? "#CBD5E1" : "#475569" },
          value: { fontSize: "16px", color: isDark ? "#CBD5E1" : "#475569", formatter: (val) => `${val}%` },
          total: {
            show: true,
            label: "Total",
            color: isDark ? "#CBD5E1" : "#475569",
            formatter: () => "100%",
          },
        },
      },
    },
    tooltip: {
      enabled: true,
      custom: function({ seriesIndex, series, dataPointIndex, w }) {
        const item = data?.data[seriesIndex]; 
        const status = item?.status || "No Status";
        const totalOrders = item?.totalOrders || 0;
        const totalSubTotalPrice = item?.totalSubTotalPrice || 0;
        const totalProducts = item?.totalProducts || 0;
        return `
          <div style="padding: 10px; font-size: 14px; color: ${isDark ? '#CBD5E1' : '#475569'}">
            <strong>Status:</strong> ${status} <br/>
            <strong>Total Orders:</strong> ${totalOrders} <br/>
            <strong>Total Products:</strong> ${totalProducts} <br/>
            <strong>Total SubTotal Price:</strong> $${totalSubTotalPrice.toFixed(2)} <br/>
          </div>
        `;
      },
    },
    labels,
    colors: ["#4669FA", "#FA916B", "#50C793", "#0CE7FA"],
  };

  return (
    <div className="py-[30px]">
      <Chart options={options} series={series} type="radialBar" height={width > breakpoints.md ? 340 : 250} />
    </div>
  );
};

export default RadialsChart;
