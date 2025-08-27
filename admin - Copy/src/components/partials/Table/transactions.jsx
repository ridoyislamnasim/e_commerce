import React, { useState, useMemo } from "react";
import { advancedTable } from "@/constant/table-data";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import { Menu } from "@headlessui/react";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "@/components/shared/CustomTable/GlobalFilter";
import { useGetMerchantsDeliveryPaymentByPaginationAndSearchesQuery } from "@/store/api/app/accountsPanel/merchantPayment/merchantPaymentApiSlice";
import CustomPaginationTable from "@/components/shared/CustomTable/CustomPaginationTable";
import SkeletionTable from "@/components/skeleton/Table";
import { useSelector } from "react-redux";

// const { data, isLoading, isError, error, isFetching } = useGetMerchantsDeliveryPaymentByPaginationAndSearchesQuery({
//   page: 1,
//   limit: 10,
//   order: 10,
//   search: "",
// });


const TransactionsTable = () => {
  const { isAuth, auth } = useSelector((state) => state.auth);


  const [paginationPage, setPaginationPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const [order, setOrder] = useState('desc');
  const [search, setSearch] = useState('');


  const { data, isLoading, isFetching } = useGetMerchantsDeliveryPaymentByPaginationAndSearchesQuery(
    {
      page: paginationPage,
      limit: limit,
      order: order,
      search: search,
    }
  );
  console.log("data::::", data);


  if (isLoading) return <SkeletionTable />;


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const COLUMNS = [




    {
      Header: "Date",
      Cell: (row) => {
        return (
          <div>
            <p>
              {(row?.cell?.row?.original?.date_time) ? formatDate(row?.cell?.row?.original?.date_time) : null}
            </p>
          </div>
        );
      },
    },



    {
      Header: 'Payment ID',
      accessor: 'merchant_payment_invoice',
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: "Merchant",
      Cell: (row) => {
        return (
          <div>
            <p>
              {row?.cell?.row?.original?.parcel_merchant_delivery_payment_details?.[0]?.parcel?.merchant?.company_name}
            </p>
          </div>
        );
      },
    },
    {
      Header: 'Total Parcel',
      accessor: 'total_payment_parcel',
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: 'Paid Amount',
      // accessor: 'total_charge',
      // Cell: (row) => <span>{row?.cell?.row?.original?.merchant_paid_amount}</span>,
      Cell: (row) => {
        return (
          <div>
            <p>{row?.cell?.row?.original?.parcel_merchant_delivery_payment_details?.[0]?.parcel?.merchant_paid_amount}</p>
          </div>
        );
      },
    },




    // {
    //   Header: "Status",
    //   Cell: (row) => {
    //     return (
    //       <div className="flex flex-col justify-center">
    //         <div>
    //           <IntegerWisedStatusFullMeaningForAdmin
    //             status={row?.cell?.row?.original?.status}
    //             delivery_type={row?.cell?.row?.original?.delivery_type}
    //             payment_type={row?.cell?.row?.original?.payment_type}
    //           />
    //         </div>
    //       </div>
    //     );
    //   },
    // },





  ];

  return (
    <div className="lg:pb-4 pb-0">
      <CustomPaginationTable
        title="Recent Transactions"
        COLUMNS={COLUMNS}
        data={data?.data}
        paginationPage={paginationPage}
        setPaginationPage={setPaginationPage}
        limit={limit}
        setLimit={setLimit}
        order={order}
        setOrder={setOrder}
        search={search}
        setSearch={setSearch}
        defaultStatus={false}
        addNew={false}
        defaultAction={false}
        defaultSL={false}
        isSearch={false}
        isPaginationShow={false}
      />
    </div>
  );
};

export default TransactionsTable;
