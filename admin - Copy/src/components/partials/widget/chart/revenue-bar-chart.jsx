import React, { useState } from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import useRtl from "@/hooks/useRtl";
import { useSelector } from "react-redux";
// import { useGetAllParcelListsForBranchByPaginationQuery } from "@/store/api/app/Parcel/allParcelListApiSlice";

const RevenueBarChart = ({ height = 400, branchDashboardChart }) => {
  const [isDark] = useDarkMode();
  const [isRtl] = useRtl();

  const { isAuth, auth } = useSelector((state) => state.auth);

  const [paginationPage, setPaginationPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState('desc');

  console.log("branchDashboardChart", branchDashboardChart);

  const { data: pickupParcelRevenueReportForBranch, } = useGetAllParcelListsForBranchByPaginationQuery(
    {
      page: paginationPage,
      limit: limit,
      order: order,
      pickup_branch_id: auth?.user?.user_info?.branch_id,
    }
  );


  const { data: deliveryParcelRevenueReportForBranch, } = useGetAllParcelListsForBranchByPaginationQuery(
    {
      page: paginationPage,
      limit: limit,
      order: order,
      delivery_branch_id: auth?.user?.user_info?.branch_id,
    }
  );


  const { data: returnParcelRevenueReportForBranch, } = useGetAllParcelListsForBranchByPaginationQuery(
    {
      page: paginationPage,
      limit: limit,
      order: order,
      return_branch_id: auth?.user?.user_info?.branch_id,
    }
  );



  const series = [
    {
      name: "Parcel Pickup",
      data: branchDashboardChart?.data?.graph_data?.map((item) => item.parcel_pickup),
    },
    {
      name: "Parcel Delivery",
      data: branchDashboardChart?.data?.graph_data?.map((item) => item.parcel_delivery),
    },
    {
      name: "Parcel Cancel",
      data: branchDashboardChart?.data?.graph_data?.map((item) => item.parcel_cancel),
    },
  ];

  console.log("series", series);


  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "rounded",
        columnWidth: "45%",
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
      fontSize: "12px",
      fontFamily: "Inter",
      offsetY: -30,
      markers: {
        width: 8,
        height: 8,
        offsetY: -1,
        offsetX: -5,
        radius: 12,
      },
      labels: {
        colors: isDark ? "#CBD5E1" : "#475569",
      },
      itemMargin: {
        horizontal: 18,
        vertical: 0,
      },
    },
    title: {
      // text: "Revenue Report",
      align: "left",

      offsetX: isRtl ? "0%" : 0,
      offsetY: 13,
      floating: false,
      style: {
        fontSize: "20px",
        fontWeight: "500",
        fontFamily: "Inter",
        color: isDark ? "#fff" : "#0f172a",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    yaxis: {
      opposite: isRtl ? true : false,
      labels: {
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
      },
    },
    xaxis: {
      // categories: [
      //   "Feb",
      //   "Mar",
      //   "Apr",
      //   "May",
      //   "Jun",
      //   "Jul",
      //   "Aug",
      //   "Sep",
      //   "Oct",
      // ],
      categories: branchDashboardChart?.data?.graph_data?.map((item) => item.placeholder?.toString() || '') || [],
      labels: {
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },

    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "" + val + "";
        },
      },
    },
    colors: ["#4669FA", "#50C878", "#FF0000"],
    grid: {
      show: true,
      borderColor: isDark ? "#334155" : "#E2E8F0",
      strokeDashArray: 10,
      position: "back",
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          legend: {
            position: "bottom",
            offsetY: 8,
            horizontalAlign: "center",
          },
          plotOptions: {
            bar: {
              columnWidth: "80%",
            },
          },
        },
      },
    ],
  };
  return (
    <div>
      <Chart options={options} series={series} type="bar" height={height} />
    </div>
  );
};

export default RevenueBarChart;
