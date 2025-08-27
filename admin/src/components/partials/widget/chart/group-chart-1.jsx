import useDarkmode from "@/hooks/useDarkMode";
// import { useGetAllParcelListsByPaginationQuery } from "@/store/api/app/Parcel/allParcelListApiSlice";



import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const shapeLine1 = {
  series: [
    {
      data: [800, 600, 1000, 800, 600, 1000, 800, 900],
    },
  ],
  options: {
    chart: {
      toolbar: {
        autoSelected: "pan",
        show: false,
      },
      offsetX: 0,
      offsetY: 0,
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#00EBFF"],
    tooltip: {
      theme: "light",
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      type: "solid",
      opacity: [0.1],
    },
    legend: {
      show: false,
    },
    xaxis: {
      low: 0,
      offsetX: 0,
      offsetY: 0,
      show: false,
      labels: {
        low: 0,
        offsetX: 0,
        show: false,
      },
      axisBorder: {
        low: 0,
        offsetX: 0,
        show: false,
      },
    },
  },
};
const shapeLine2 = {
  series: [
    {
      data: [800, 600, 1000, 800, 600, 1000, 800, 900],
    },
  ],
  options: {
    chart: {
      toolbar: {
        autoSelected: "pan",
        show: false,
      },
      offsetX: 0,
      offsetY: 0,
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#FB8F65"],
    tooltip: {
      theme: "light",
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      type: "solid",
      opacity: [0.1],
    },
    legend: {
      show: false,
    },
    xaxis: {
      low: 0,
      offsetX: 0,
      offsetY: 0,
      show: false,
      labels: {
        low: 0,
        offsetX: 0,
        show: false,
      },
      axisBorder: {
        low: 0,
        offsetX: 0,
        show: false,
      },
    },
  },
};
const shapeLine3 = {
  series: [
    {
      data: [800, 600, 1000, 800, 600, 1000, 800, 900],
    },
  ],
  options: {
    chart: {
      toolbar: {
        autoSelected: "pan",
        show: false,
      },
      offsetX: 0,
      offsetY: 0,
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#5743BE"],
    tooltip: {
      theme: "light",
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      type: "solid",
      opacity: [0.1],
    },
    legend: {
      show: false,
    },
    xaxis: {
      low: 0,
      offsetX: 0,
      offsetY: 0,
      show: false,
      labels: {
        low: 0,
        offsetX: 0,
        show: false,
      },
      axisBorder: {
        low: 0,
        offsetX: 0,
        show: false,
      },
    },
  },
};

const statistics = [
  {
    name: shapeLine1,
    title: "Totel revenue",
    count: "3,564",
    bg: "bg-[#E5F9FF] dark:bg-slate-900	",
  },
  {
    name: shapeLine2,
    title: "Products sold",
    count: "564",
    bg: "bg-[#FFEDE5] dark:bg-slate-900	",
  },
  {
    name: shapeLine3,
    title: "Growth",
    count: "+5.0%",
    bg: "bg-[#EAE5FF] dark:bg-slate-900	",
  },
];





const GroupChart1 = ({ row1, row2 }) => {
  const { isAuth, auth } = useSelector((state) => state.auth);
  const [isDark] = useDarkmode();
  console.log("isDark", isDark);

  // const { data: adminBranch, } = useGetBranchesByPaginationQuery({});
  const adminBranch = {}
  // const { data: adminMerchant, } = useGetMerchantsByPaginationAndSearchesQuery({});
  const adminMerchant = {}
  // const { data: adminRider } = useGetRidersByPaginationQuery({});
  const adminRider = {}

  // const { data: branchTotalMerchant } = useGetMerchantsByPaginationAndSearchesQuery({
  //   // status: 1, 
  //   branch_id: auth?.user?.user_info?.branch_id
  // })
  const branchTotalMerchant = {}

  // const { data: branchActiveMerchant } = useGetMerchantsByPaginationAndSearchesQuery({
  //   status: 1,
  //   branch_id: auth?.user?.user_info?.branch_id
  // })
  const branchActiveMerchant = {}
  // const { data: branchRider } = useGetRiderByBranchIdQuery(auth.user.user_info.branch_id);
  const branchRider = {}
  // const { data: branchDashboardCount } = useGetBranchDashboardCountQuery();
  const branchDashboardCount = {}
  // console.log("branchDashboardCount", branchDashboardCount);



  // const { data: pickUpParcel, } =
  //   useGetAllParcelListsByPaginationQuery({

  //     pickup_branch_id: auth?.user?.user_info?.branch_id,
  //     status: [1, 4, 5, 6, 7, 8, 9, 10, 11]
  //   });
    const pickUpParcel = {}

  // const { data: deliveryParcel } = useGetAllParcelListsByPaginationQuery(
  //   {
  //     delivery_branch_id: auth?.user?.user_info?.branch_id,
  //     status: [14, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
  //     delivery_type: []
  //   }
  // );
  const deliveryParcel = {}

  // const { data: returnParcel } =
  //   useGetAllParcelListsByPaginationQuery({
  //     status_start: 25,
  //     status_end: 36,
  //     delivery_type: [4],
  //     return_branch_id: auth?.user?.user_info?.branch_id

  //   });
    const returnParcel = {}


  return (
    <>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-4" >

        {/* FOR ADMIN START _________________________________ */}
        {auth?.user?.user_type === 'admin' && <div className="flex items-center space-x-6 rtl:space-x-reverse bg-[#E5F9FF] p-4 rounded-md">
          <div className="flex-1">
            <div className={` text-sm mb-1 font-medium ${isDark ? "text-black-500" : "text-black-500"}`}>
              Total Hub
            </div>
            <div className="text-slate-900 dark:text-black-500 text-lg font-medium">
              {adminBranch?.data?.pagination?.total}
            </div>
          </div>
        </div>}

        {auth?.user?.user_type === 'admin' && <div className="flex items-center space-x-6 rtl:space-x-reverse bg-[#E5F9FF] p-4 rounded-md">
          <div className="flex-1">
            <div className={` text-sm mb-1 font-medium ${isDark ? "text-black-500" : "text-black-500"}`}>
              Total Merchant
            </div>
            <div className="text-slate-900 dark:text-black-500 text-lg font-medium">
              {adminMerchant?.data?.pagination?.total}
            </div>
          </div>
        </div>}

        {auth?.user?.user_type === 'admin' && <div className="flex items-center space-x-6 rtl:space-x-reverse bg-[#E5F9FF] p-4 rounded-md">
          <div className="flex-1">
            <div className={` text-sm mb-1 font-medium ${isDark ? "text-black-500" : "text-black-500"}`}>
              Total Rider
            </div>
            <div className={`  text-lg font-medium ${isDark ? "text-black-500" : "text-slate-900"}`}>
              {adminRider?.data?.pagination?.total}
            </div>
          </div>
        </div>}
        {/* FOR ADMIN END____________________________________________________ */}


        {auth?.user?.user_type === 'branch' && row1 && <div className="flex items-center space-x-6 rtl:space-x-reverse bg-[#E5F9FF] p-4 rounded-md">
          <div className="flex-1">
            <div className={` text-sm mb-1 font-medium ${isDark ? "text-black-500" : "text-black-500"}`}>
              Total Merchant
            </div>
            <div className="text-slate-900 dark:text-black-500 text-lg font-medium">
              {branchDashboardCount?.data?.merchants}
            </div>
          </div>
        </div>}

        {auth?.user?.user_type === 'branch' && row1 && <div className="flex items-center space-x-6 rtl:space-x-reverse bg-[#FFEDE5] p-4 rounded-md">
          <div className="flex-1">
            <div className={` text-sm mb-1 font-medium ${isDark ? "text-black-500" : "text-black-500"}`}>
              Active Merchant
            </div>
            <div className="text-slate-900 dark:text-black-500 text-lg font-medium">
              {branchDashboardCount?.data?.active_merchants}
            </div>
          </div>
        </div>}


        {auth?.user?.user_type === 'branch' && row1 && <div className="flex items-center space-x-6 rtl:space-x-reverse bg-[#EAE5FF] p-4 rounded-md">
          <div className="flex-1">
            <div className={` text-sm mb-1 font-medium ${isDark ? "text-black-500" : "text-black-500"}`}>
              Total Rider
            </div>
            <div className={`  text-lg font-medium ${isDark ? "text-black-500" : "text-slate-900"}`}>
              {branchDashboardCount?.data?.riders}
            </div>
          </div>
        </div>}

        {auth?.user?.user_type === 'branch' && row2 && <div className="flex items-center space-x-6 rtl:space-x-reverse bg-[#EAE5FF] p-4 rounded-md">
          <div className="flex-1">
            <div className={` text-sm mb-1 font-medium ${isDark ? "text-black-500" : "text-black-500"}`}>
              Today Pickup Request
            </div>
            <div className={`  text-lg font-medium ${isDark ? "text-black-500" : "text-slate-900"}`}>
              {branchDashboardCount?.data?.todayPickupRequest}
            </div>
          </div>
        </div>}

        {auth?.user?.user_type === 'branch' && row2 && <div className="flex items-center space-x-6 rtl:space-x-reverse bg-[#EAE5FF] p-4 rounded-md">
          <div className="flex-1">
            <div className={` text-sm mb-1 font-medium ${isDark ? "text-black-500" : "text-black-500"}`}>
              Today Pickup Done
            </div>
            <div className={`  text-lg font-medium ${isDark ? "text-black-500" : "text-slate-900"}`}>
              {branchDashboardCount?.data?.todayPickupComplete}
            </div>
          </div>
        </div>}

        {auth?.user?.user_type === 'branch' && row2 && <div className="flex items-center space-x-6 rtl:space-x-reverse bg-[#EAE5FF] p-4 rounded-md">
          <div className="flex-1">
            <div className={` text-sm mb-1 font-medium ${isDark ? "text-black-500" : "text-black-500"}`}>
              Total Pickup Done
            </div>
            <div className={`  text-lg font-medium ${isDark ? "text-black-500" : "text-slate-900"}`}>
              {branchDashboardCount?.data?.totalPickupComplete}
            </div>
          </div>
        </div>}

        {auth?.user?.user_type === 'branch' && row2 && <div className="flex items-center space-x-6 rtl:space-x-reverse bg-[#EAE5FF] p-4 rounded-md">
          <div className="flex-1">
            <div className={` text-sm mb-1 font-medium ${isDark ? "text-black-500" : "text-black-500"}`}>
              Total Hub Transfer Complete
            </div>
            <div className={`  text-lg font-medium ${isDark ? "text-black-500" : "text-slate-900"}`}>
              {branchDashboardCount?.data?.totalBranchTransferComplete}
            </div>
          </div>
        </div>}

        {auth?.user?.user_type === 'branch' && row2 && <div className="flex items-center space-x-6 rtl:space-x-reverse bg-[#EAE5FF] p-4 rounded-md">
          <div className="flex-1">
            <div className={` text-sm mb-1 font-medium ${isDark ? "text-black-500" : "text-black-500"}`}>
              Today New Parcel
            </div>
            <div className={`  text-lg font-medium ${isDark ? "text-black-500" : "text-slate-900"}`}>
              {branchDashboardCount?.data?.todayNewParcels}
            </div>
          </div>
        </div>}

        {auth?.user?.user_type === 'branch' && row2 && <div className="flex items-center space-x-6 rtl:space-x-reverse bg-[#EAE5FF] p-4 rounded-md">
          <div className="flex-1">
            <div className={` text-sm mb-1 font-medium ${isDark ? "text-black-500" : "text-black-500"}`}>
              Previous Pending Parcel
            </div>
            <div className={`  text-lg font-medium ${isDark ? "text-black-500" : "text-slate-900"}`}>
              {branchDashboardCount?.data?.previousPendingParcels}
            </div>
          </div>
        </div>}

        {auth?.user?.user_type === 'branch' && row2 && <div className="flex items-center space-x-6 rtl:space-x-reverse bg-[#EAE5FF] p-4 rounded-md">
          <div className="flex-1">
            <div className={` text-sm mb-1 font-medium ${isDark ? "text-black-500" : "text-black-500"}`}>
              Today Parcel for Delivery
            </div>
            <div className={`  text-lg font-medium ${isDark ? "text-black-500" : "text-slate-900"}`}>
              {branchDashboardCount?.data?.todayParcelForDelivery}
            </div>
          </div>
        </div>}

        {auth?.user?.user_type === 'branch' && row2 && <div className="flex items-center space-x-6 rtl:space-x-reverse bg-[#EAE5FF] p-4 rounded-md">
          <div className="flex-1">
            <div className={` text-sm mb-1 font-medium ${isDark ? "text-black-500" : "text-black-500"}`}>
              Total Parcel for Delivery
            </div>
            <div className={`  text-lg font-medium ${isDark ? "text-black-500" : "text-slate-900"}`}>
              {branchDashboardCount?.data?.totalParcelForDelivery}
            </div>
          </div>
        </div>}
        {auth?.user?.user_type === 'branch' && row2 && <div className="flex items-center space-x-6 rtl:space-x-reverse bg-[#EAE5FF] p-4 rounded-md">
          <div className="flex-1">
            <div className={` text-sm mb-1 font-medium ${isDark ? "text-black-500" : "text-black-500"}`}>
              Today Delivery Complete
            </div>
            <div className={`  text-lg font-medium ${isDark ? "text-black-500" : "text-slate-900"}`}>
              {branchDashboardCount?.data?.todayDeliveryComplete}
            </div>
          </div>
        </div>}
        {auth?.user?.user_type === 'branch' && row2 && <div className="flex items-center space-x-6 rtl:space-x-reverse bg-[#EAE5FF] p-4 rounded-md">
          <div className="flex-1">
            <div className={` text-sm mb-1 font-medium ${isDark ? "text-black-500" : "text-black-500"}`}>
              Today Delivery Pending
            </div>
            <div className={`  text-lg font-medium ${isDark ? "text-black-500" : "text-slate-900"}`}>
              0
            </div>
          </div>
        </div>}
        {auth?.user?.user_type === 'branch' && row2 && <div className="flex items-center space-x-6 rtl:space-x-reverse bg-[#EAE5FF] p-4 rounded-md">
          <div className="flex-1">
            <div className={` text-sm mb-1 font-medium ${isDark ? "text-black-500" : "text-black-500"}`}>
              Today Hub Transfer
            </div>
            <div className={`  text-lg font-medium ${isDark ? "text-black-500" : "text-slate-900"}`}>
              {branchDashboardCount?.data?.totalBranchTransferComplete}
            </div>
          </div>
        </div>}
        {auth?.user?.user_type === 'branch' && row2 && <div className="flex items-center space-x-6 rtl:space-x-reverse bg-[#EAE5FF] p-4 rounded-md">
          <div className="flex-1">
            <div className={` text-sm mb-1 font-medium ${isDark ? "text-black-500" : "text-black-500"}`}>
              Today's Cancel Parcel
            </div>
            <div className={`  text-lg font-medium ${isDark ? "text-black-500" : "text-slate-900"}`}>
              {branchDashboardCount?.data?.todayDeliveryCancel}
            </div>
          </div>
        </div>}
        {auth?.user?.user_type === 'branch' && row2 && <div className="flex items-center space-x-6 rtl:space-x-reverse bg-[#EAE5FF] p-4 rounded-md">
          <div className="flex-1">
            <div className={` text-sm mb-1 font-medium ${isDark ? "text-black-500" : "text-black-500"}`}>
              Total Delivery Complete
            </div>
            <div className={`  text-lg font-medium ${isDark ? "text-black-500" : "text-slate-900"}`}>
              {branchDashboardCount?.data?.totalDeliveryComplete}
            </div>
          </div>
        </div>}
        {auth?.user?.user_type === 'branch' && row2 && <div className="flex items-center space-x-6 rtl:space-x-reverse bg-[#EAE5FF] p-4 rounded-md">
          <div className="flex-1">
            <div className={` text-sm mb-1 font-medium ${isDark ? "text-black-500" : "text-black-500"}`}>
              Total Return Parcel
            </div>
            <div className={`  text-lg font-medium ${isDark ? "text-black-500" : "text-slate-900"}`}>
              {branchDashboardCount?.data?.totalReturnParcel}
            </div>
          </div>
        </div>}
        {auth?.user?.user_type === 'branch' && row2 && <div className="flex items-center space-x-6 rtl:space-x-reverse bg-[#EAE5FF] p-4 rounded-md">
          <div className="flex-1">
            <div className={` text-sm mb-1 font-medium ${isDark ? "text-black-500" : "text-black-500"}`}>
              Today's Collection Amount
            </div>
            <div className={`  text-lg font-medium ${isDark ? "text-black-500" : "text-slate-900"}`}>
              {branchDashboardCount?.data?.todayPromiseDeliveryCollection}
            </div>
          </div>
        </div>}
        {auth?.user?.user_type === 'branch' && row2 && <div className="flex items-center space-x-6 rtl:space-x-reverse bg-[#EAE5FF] p-4 rounded-md">
          <div className="flex-1">
            <div className={` text-sm mb-1 font-medium ${isDark ? "text-black-500" : "text-black-500"}`}>
              Total Collection Amount
            </div>
            <div className={`  text-lg font-medium ${isDark ? "text-black-500" : "text-slate-900"}`}>
              {branchDashboardCount?.data?.PromiseDeliveryTotalCollectAmount}
            </div>
          </div>
        </div>}



      </div>

    </>
  );
};

export default GroupChart1;
