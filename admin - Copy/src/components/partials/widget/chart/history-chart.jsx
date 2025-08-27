import React from "react";
import Chart from "react-apexcharts";
import { colors } from "@/constant/data";
import useDarkMode from "@/hooks/useDarkMode";

const HistoryChart = ({ height = 360, adminDashboardChart }) => {
  const [isDark] = useDarkMode();
  // const series = [
  //   {
  //     name: "Parcel Active",
  //     data: [4, 5, 67, 3, 4, 3]
  //   },
  //   {
  //     name: "Parcel Return",
  //     data: [4, 52, 61, 3, 4, 3],
  //   },
  //   {
  //     name: "Parcel Delivery",
  //     data: [4, 54, 17, 3, 4, 3],
  //   },
  // ];
  console.log("adminDashboardChart", adminDashboardChart);
  const series = [
    {
      name: "Parcel Active",
      data: adminDashboardChart?.data?.graph_data?.map((item) => item.parcel_active),
    },
    {
      name: "Parcel Return",
      data: adminDashboardChart?.data?.graph_data?.map((item) => item.parcel_return),
    },
    {
      name: "Parcel Delivery",
      data: adminDashboardChart?.data?.graph_data?.map((item) => item.parcel_delivery),
    },
  ];
  console.log("series", series);

  const thisMonth = adminDashboardChart?.data?.graph_data?.map((item) => item.placeholder?.toString() || '') || [];
  console.log("thisMonth", thisMonth);

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      offsetX: 0,
      offsetY: 0,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 2,
    },
    colors: [colors.primary, colors.warning, colors.secondary],
    tooltip: {
      theme: "dark",
    },
    legend: {
      offsetY: 4,
      show: true,
      fontSize: "12px",
      fontFamily: "Inter",
      labels: {
        colors: isDark ? "#CBD5E1" : "#475569",
      },
      markers: {
        width: 6,
        height: 6,
        offsetY: 0,
        offsetX: -5,
        radius: 12,
      },
      itemMargin: {
        horizontal: 18,
        vertical: 0,
      },
    },
    grid: {
      show: true,
      borderColor: isDark ? "#334155" : "#e2e8f0",
      strokeDashArray: 10,
      position: "back",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.3,
        opacityFrom: 0.4,
        opacityTo: 0.5,
        stops: [0, 30, 0],
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
      },
    },
    xaxis: {
      // type: "datetime",
      categories: adminDashboardChart?.data?.graph_data?.map((item) => item.placeholder?.toString() || '') || [],
      // categories: [
      //   "2018-09-19T00:00:00.000Z",
      //   "2018-09-19T01:30:00.000Z",
      //   "2018-09-19T02:30:00.000Z",
      //   "2018-09-19T03:30:00.000Z",
      //   "2018-09-19T04:30:00.000Z",
      //   "2018-09-19T05:30:00.000Z",
      //   "2018-09-19T06:30:00.000Z",
      // ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
      },
    },
  };
  return (
    <>
      <Chart options={options} series={series} type="area" height={height} />
    </>
  );
};

export default HistoryChart;
