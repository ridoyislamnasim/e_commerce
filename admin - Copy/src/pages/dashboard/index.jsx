import React, { useState } from "react";
import Card from "@/components/ui/Card";
// import ImageBlock1 from "@/components/partials/widget/block/image-block-1";
// import GroupChart1 from "@/components/partials/widget/chart/group-chart-1";
// import RevenueBarChart from "@/components/partials/widget/chart/revenue-bar-chart";
import RadialsChart from "@/components/partials/widget/chart/radials";
import SelectMonth from "@/components/partials/SelectMonth";
// import CompanyTable from "@/components/partials/Table/company-table";
// import RecentActivity from "@/components/partials/widget/recent-activity";
// import MostSales from "../../components/partials/widget/most-sales";
// import RadarChart from "../../components/partials/widget/chart/radar-chart";
import HomeBredCurbs from "./HomeBredCurbs";
// import MerChantListForDashboard from "../Team/Merchant/MerChantListForDashboard";
import { useSelector } from "react-redux";
// import TopMerchantForAdmin from "../Team/Merchant/TopMerchantForAdmin";
// import RecentOrderTable from "@/components/partials/Table/recentOrder-table";
// import RecentParcelsForBranch from "./RecentParcelsForBranch";
// import { useGetAdminDashboardChartQuery, useGetAdminOverviewQuery, useGetAdminUserByIdQuery } from "@/store/api/app/setting/admin/adminApiSlice";
// import HistoryChart from "@/components/partials/widget/chart/history-chart";
// import TransactionsTable from "@/components/partials/Table/transactions";
import GroupChart5 from "@/components/partials/widget/chart/group-chart5";
import useNoImage from "@/hooks/useNoImage";
import AccountReceivable from "@/components/partials/widget/chart/account-receivable";
import AccountPayable from "@/components/partials/widget/chart/account-payable";
// import { useGetAccountPayableAmountQuery, useGetAccountReceivableAmountQuery } from "@/store/api/app/accountsPanel/accountDashboard/accountDashboardApiSlice";
import SelectMonthPayable from "@/components/partials/widget/chart/SelectMonthPayable";
import { useGetOrderReportQuery } from "@/store/api/app/Report/reportApiSlice";
// import GroupChart2 from "@/components/partials/widget/chart/group-chart-2";
// import GroupChart3 from "@/components/partials/widget/chart/group-chart-3";
// import GroupChart4 from "@/components/partials/widget/chart/group-chart-4";

const Dashboard = () => {
  const [filterMap, setFilterMap] = useState("usa");
  const [selectChartFilter, setSelectChartFilter] = useState("this-month");
  const [selectChartFilterLabel, setSelectChartFilterLabel] = useState("This Month");
  const [selectRadialsChart, setSelectRadialsChart] = useState("this-month");
  const [selectRadialsChartLabel, setSelectRadialsChartLabel] = useState("This Month");
  const [accountReceivable, setAccountReceivable] = useState("this-month");
  const [accountReceivableLabel, setAccountReceivableLabel] = useState("This Month");
  const noImage = useNoImage()
  // RadialsChart
  console.log("selectChartFilter", selectChartFilter);

  const { isAuth, auth } = useSelector((state) => state.auth);
  console.log("auth::::: ::", auth?.user);

  // const { data: adminUser } = useGetAdminUserByIdQuery(auth?.user?.user_info?.id)
  // const { data: adminDashboardChart } = useGetAdminDashboardChartQuery({
  //   duration: selectChartFilter
  // })
  // const { data: branchDashboardChart } = useGetBrachDashboardChartByBranchIdQuery({
  //   branch_id: auth?.user?.user_info?.branch_id,
  //   duration: selectChartFilter
  // })


  // const { data: adminOverView } = useGetAdminOverviewQuery()
  // const { data: branchOverView } = useGetBranchOverviewQuery()

  const { data: accountReceivableAmount } = useGetOrderReportQuery({
    duration: selectRadialsChart
  })
  // const { data: accountPayableAmount } = useGetAccountPayableAmountQuery({
  //   duration: accountReceivable
  // })
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good morning,";
    if (hour >= 12 && hour < 18) return "Good afternoon,";
    if (hour >= 18 && hour < 22) return "Good evening,";
    return "Good night,";
  };

  console.log("auth::::: ::", auth?.user?.user_info?.type);
  // console.log("branchUser::::: ::", branchUser);

  return (
    <div>
      <HomeBredCurbs title="Dashboard" />
      {
        (
          <Card className="mb-5">
            <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 place-content-center">
              <div className="flex space-x-4 h-full items-center rtl:space-x-reverse">
                <div className="flex-none">
                  <div className="h-20 w-20 rounded-full">
                    <img src={noImage} alt="" className="w-full h-full" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-medium mb-2">
                    <span className="block font-light">{getGreeting()}</span>
                    <span className="block">{auth?.user?.name}</span>
                  </h4>
                  <p className="text-sm dark:text-slate-300">Welcome to {auth?.user?.warehouse} Warehouse</p>
                </div>
              </div>
              {/* <GroupChart1 />
              <GroupChart2 />
              <GroupChart3 />
              <GroupChart4 /> */}
              {/* <GroupChart5 /> */}
              <GroupChart5 />
            </div>
          </Card>
        )
      }



     




      <div className="grid grid-cols-12 gap-5">
        <div className="lg:col-span-8 col-span-12">
          {
            ((auth?.user?.user_type === 'admin' && (auth?.user?.user_info?.type === 1 || auth?.user?.user_info?.type === 2 || auth?.user?.user_info?.type === 5))) && (
              <Card title={`History (${selectChartFilterLabel ? selectChartFilterLabel : "This Year"})`} headerslot={<SelectMonth setSelectChartFilter={setSelectChartFilter} setSelectChartFilterLabel={setSelectChartFilterLabel} />}>
                <div className="legend-ring4">
                  {(auth?.user?.user_type === 'admin' && (auth?.user?.user_info?.type === 1 || auth?.user?.user_info?.type === 2 || auth?.user?.user_info?.type === 5)) && <HistoryChart adminDashboardChart={adminDashboardChart} />}
                </div>
              </Card>
            )
          }

          {
            (
              <Card title={`Parcel Report (${selectChartFilterLabel ? selectChartFilterLabel : "This Year"})`} headerslot={<SelectMonth setSelectChartFilter={setSelectChartFilter} setSelectChartFilterLabel={setSelectChartFilterLabel} />}>
                <div className="legend-ring4">
                  {auth?.user?.user_type === 'branch' && <RevenueBarChart branchDashboardChart={branchDashboardChart} branch_id={auth?.user?.user_info?.branch_id} />}
                </div>
              </Card>
            )


          }
          {
            (auth?.user?.user_type === 'admin' && auth?.user?.user_info?.type === 3) && (
              <TransactionsTable />
            )


          }

        </div>



        <div className="lg:col-span-4 col-span-12">
        <Card title={`Order Report (${selectRadialsChartLabel ? selectRadialsChartLabel : "This Year"})`} headerslot={<SelectMonth setSelectChartFilter={setSelectRadialsChart} setSelectChartFilterLabel={setSelectRadialsChartLabel} />}>
            <RadialsChart  selectChartDuration = {selectRadialsChart}/>
          </Card>
        </div>
       



       
      </div>

      {/* {
        
         (
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
            <Card title={`Account Receivable (${selectChartFilterLabel ? selectChartFilterLabel : ""})`}
              headerslot={<SelectMonth setSelectChartFilter={setSelectChartFilter} setSelectChartFilterLabel={setSelectChartFilterLabel} />}>
              <AccountReceivable accountReceivableAmount={accountReceivableAmount} />
            </Card>

            <Card title={`Account Payable (${accountReceivableLabel ? accountReceivableLabel : ""})`}
              headerslot={<SelectMonthPayable setAccountReceivable={setAccountReceivable} setAccountReceivableLabel={setAccountReceivableLabel} />}>

              <AccountPayable accountPayableAmount={accountPayableAmount} />
            </Card>
          </div>
        )
      } */}
    </div>
  );
};

export default Dashboard;
