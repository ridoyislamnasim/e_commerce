import { AiFillFileExcel } from 'react-icons/ai';

import Card from '@/components/ui/Card';
import Pagination from '@/components/ui/Pagination';
import { Icon } from '@iconify/react';
// import { Tooltip } from 'chart.js';
import Button from '@/components/ui/Button';
import Tooltip from '@/components/ui/Tooltip';
import useDelete from '@/hooks/useDelete';
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	useGlobalFilter,
	usePagination,
	useRowSelect,
	useSortBy,
	useTable,
} from 'react-table';
import FlatpickerPage from '../DateTimePicker/DateTimePicker';
import PrintAllParcel from '../PrintAllParcel/PrintAllParcel';
import PrintAllParcelBranch from '../PrintAllParcel/PrintAllParcelBranch';
import SelectBranch from '../Select/SelectCouponDiscountType';
// import SelectDeliveryPaymentType from '../Select/SelectDeliveryPaymentType';
// import SelectStatus from '../Select/SelectFilterStatus';
// import SelectMerchant from '../Select/SelectMerchant';
// import SelectMerchantByBranchId from '../Select/SelectMerchantByBranchId';
// import SelectParcelStatus from '../Select/SelectOrderStaus';
// import SelectPickupRiderByBranchId from '../Select/SelectPickupRiderByBranchId';
// import SelectPickupRunStatus from '../Select/SelectPickupRunStatus';
// import SelectRider from '../Select/SelectRider';
import Status from '../status/Status';
import GlobalFilter from './GlobalFilter';
// import SelectDeliveryRiderByBranchId from '../Select/SelectDeliveryRiderByBranchId';
import PrintCompleteDeliveryProcessingList from '../PrintAllParcel/PrintCompleteDeliveryProcessingList';
import PrintReturnRiderRunList from '../PrintAllParcel/PrintReturnRiderRunList';
import SkeletionTable from '@/components/skeleton/Table';
import PrintDeliveryRiderRun from '../PrintAllParcel/PrintDeliveryRiderRun';
import PrintiPickupParcel from '../PrintAllParcel/PrintiPickupParcel';
// import SelectMerchantDeliveryPaymentType from '../Select/SelectMerchantDeliveryPaymentType';
import SelectAllStaff from '../Select/SelectUser';
// import SelectRiderAll from '../Select/SelectRiderAll';
// import PrintAllRiderParcel from '../PrintAllParcel/PrintAllRiderParcel';
import Loading from '@/components/Loading';
import PrintCompleteDeliveryPayment from '../PrintAllParcel/PrintCompleteDeliveryPayment';
import PrintApplicationSetting from '../printApplicationSetting/printApplicationSetting';
import PrintReturnParcel from '../PrintBranchParcel/PrintReturnParcel/PrintReturnParcel';
import PrintDeliveryParcel from '../PrintBranchParcel/printDeliveryParcel/PrintDeliveryParcel';
import PrintIdByBranch from '../PrintIdByBranch/PrintIdByBranch';
import PrintPendingRescheduleParcel from '../PrintAllParcel/PrintPendingRescheduleParcel';
import PrintpickupParcel from '../PrintBranchParcel/PrintPickupParcel/PrintpickupParcel';
import { useGetSingleRoleByIdQuery } from '@/store/api/app/Role/roleApiSlice';
import MultiStatus from '../status/MultiStatus';
import PrintAll from '../Print/PrintAll';
import BarcodePrint from '../Print/PrintBarcode';

const IndeterminateCheckbox = React.forwardRef(
	({ indeterminate, ...rest }, ref) => {
		const defaultRef = React.useRef();
		const resolvedRef = ref || defaultRef;

		React.useEffect(() => {
			resolvedRef.current.indeterminate = indeterminate;
		}, [resolvedRef, indeterminate]);

		return (
			<>
				<input
					type="checkbox"
					ref={resolvedRef}
					{...rest}
					className="table-checkbox"
				/>
			</>
		);
	}
);


const CustomPaginationTable = ({
	title,
	COLUMNS,
	data,
	paginationPage = 1,
	setPaginationPage = () => { },
	limit = 10,
	setLimit = () => { },
	order = 'desc',
	setOrder = () => { },
	search = '',
	setSearch = () => { },
	merchant_id,
	setMerchant_id = () => { },
	rowSelect = false,
	selectedIds,
	setSelectedIds = () => { },
	defaultSL = true,
	defaultAction = true,
	permission,
	deleteParcelByAdmin = false,
	isLogin = false,
	isToggleDropdownShow = false,

	// Default
	defaultStatus = true,
	// action
	addNew = true,
	isSearch = true,
	isView = true,
	isEdit = true,
	isDelete = true,

	create,
	isToggleBranchShow = false,
	branch_id,
	setBranch_id,
	control,
	isToggleStatusShow = false,
	fromDate,
	setFromDate,
	toDate,
	setToDate,
	isPaginationShow = true,
	isDateShow = false,
	isPrint = false,
	isExcelExport = false,
	handleExport,

	barcodeScanner = false,
	barcodeInput,
	setBarcodeInput,
	handleBarcodeChange,
	handleBarcodeKeyPress,

	statusId,
	dataPending,
	dataForExport,
	dataForExportBranch,
	isPrintBranche,

	branch_name,

	is_rider_show = false,
	order_status_show = false,//
	transfer_status_show = false,
	is_delivery_payment_type_show = false,

	conditionwiseEdit = false,


	isParcelStatusShow,
	isReturnRiderShow,
	isDeliveryRiderShow,
	isPickupRiderShow,
	isRiderParcelStatusShow = false,
	isPrintcompleteDeliveryProcessinglist = false,
	completeDeliveryProcessinglistData,
	isPrintreturnRiderRunList = false,
	returnRiderRunListPrintData,
	deliveryRiderRunData,
	isPrintDeliveryRiderRun = false,
	pickupParcelData,
	isPrintPickupParcel = false,
	isMerchantDeliveryPaymentTypeShow = false,
	isAllStaffShow = false,
	is_all_rider_show = false,
	isPrintAllRiderParcelShow = false,
	allRiderParcelListData,
	isPrintcompleteDeliveryPayment = false,
	completeDeliveryPaymentPrintData,

	isFetching,
	togglePrintClick,
	isPrintBarcode = false, //
	isPrintInventory = false, //
	isPrintBranchUser = false,
	isPrintBranch = false,
	isPrintItemType = false,
	isPrintCompleteReturnParcel = false,
	isPrintReceivedReturnBranchTransfer = false,
	isPrintReturnParcel = false,
	isPrintReturnBranchTransfer = false,
	isPrintReceivedBranchTransfer = false,
	isPrintAllRiderListByBranch = false,
	isPrintAllMerchantsByBranch = false,
	isPrintpendingRescheduleParcel = false,
	isPrintPickupDeliveryBranchTransfer = false,
	isPrintPickupParcelPickupParcel = false,
	pendingRescheduleParcelData



}) => {
	const navigate = useNavigate();
	const { handleDelete } = useDelete();
	console.log("permission ==============", permission);
	const columns = useMemo(
		() => [
			...(defaultSL
				? [
					{
						Header: 'SL',
						accessor: '#',
						Cell: ({ row }) => {
							return <span>{row.index + 1}</span>;
						},
					},
				]
				: []),

			...COLUMNS,
			...(order_status_show ?
				[{
					Header: 'Order Status',
					accessor: 'status',
					Cell: (row) => (
						<MultiStatus
							id={row?.row?.original?.id}
							status={row?.cell?.value}
						// status={'OrderPlaced'} 
						/>
					),
				},
				] : []),
			...(transfer_status_show ?
				[{
					Header: 'Transfer Status',
					accessor: 'status',
					Cell: (row) => (
						// <Status
						// 	id={row?.cell?.row?.original?.id}
						// 	status={row?.cell?.value}
						// />
						<MultiStatus
							id={row?.row?.original?._id}
							status={row?.cell?.value}
						// status={'OrderPlaced'} 
						/>
					),
				},
				] : []),
			...(defaultStatus
				? [
					{
						Header: 'Status',
						accessor: 'status',
						Cell: (row) => (
							<Status
								id={row?.cell?.row?.original?.id}
								status={row?.cell?.value}
							/>
						),
					},
				]
				: []),

			...(defaultAction
				? [
					{
						Header: 'Actions',
						accessor: 'id',
						Cell: (row) => {
							// console.log('row', row);

							return (
								<div className="flex space-x-3 rtl:space-x-reverse">
									{isView && (
										<Tooltip
											content="View"
											placement="top"
											arrow
											animation="shift-away"
										>
											<button
												onClick={() => navigate(`${row?.row?.original?.slug ?? row?.row?.original?.id}`)}
												className="action-btn"
												type="button"
											>
												<Icon icon="heroicons:eye" />
											</button>
										</Tooltip>
									)}
									{isLogin && (
										<Tooltip
											content="Login"
											placement="top"
											arrow
											animation="shift-away"
										>
											<button
												onClick={() => navigate(`${row?.row?.original?.slug ?? row?.row?.original?.id}`)}
												className="action-btn"
												type="button"
											>
												<Icon icon="ic:round-login" />
											</button>
										</Tooltip>
									)}
									{/* {
										isEdit && permission?.edit
										&& (
											<Tooltip
												content="Edit"
												placement="top"
												arrow
												animation="shift-away"
											>

												<button
													onClick={() => navigate(`${row?.row?.original?._id}/edit`)}
													className="action-btn"
													type="button"
												>
													<Icon icon="heroicons:pencil-square" />
												</button>
											</Tooltip>
										)} */}
									{isEdit && (permission?.edit ?? true) && (
										<Tooltip content="Edit" placement="top" arrow animation="shift-away">
											<button
												onClick={() => navigate(`${row?.row?.original?.slug ??row?.row?.original?.id}/edit`)}
												className="action-btn"
												type="button"
											>
												<Icon icon="heroicons:pencil-square" />
											</button>
										</Tooltip>
									)}


									{/* {console.log("isEditisEdit", row?.row?.original?._id)}
									{console.log("conditionwiseEdit", conditionwiseEdit)} */}


									{isDelete 
									// && permission?.delete 
									? (
										<Tooltip
											content="Delete"
											placement="top"
											arrow
											animation="shift-away"
											theme="danger"
										>
											<button
												onClick={() => handleDelete(row?.row?.original?.slug ?? row?.row?.original?.id)}
												className="action-btn"
												type="button"
											>
												<Icon icon="heroicons:trash" />
											</button>
										</Tooltip>
									) : null}
								</div>
							);
						},
					},
				]
				: []),
		],
		[]
	);

	const tableInstance = useTable(
		{
			columns,
			data: data?.result || [],
		},

		useGlobalFilter,
		useSortBy,
		usePagination,
		useRowSelect,

		(hooks) => {
			if (rowSelect) {
				hooks.visibleColumns.push((columns) => [
					{
						id: 'selection',
						Header: ({ getToggleAllRowsSelectedProps }) => (
							<div>
								<IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
							</div>
						),
						Cell: ({ row }) => (
							<div>
								<IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
							</div>
						),
					},
					...columns,
				]);
			}
		}
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		footerGroups,
		page,
		// nextPage,
		// previousPage,
		// canNextPage,
		// canPreviousPage,
		// pageOptions,
		state,
		// gotoPage,
		// pageCount,
		setPageSize,
		setGlobalFilter,
		prepareRow,
		selectedFlatRows, // Get selectedFlatRows from state
	} = tableInstance;

	// useEffect to update selectedIds when selectedFlatRows changes
	useEffect(() => {
		setSelectedIds(selectedFlatRows?.map((row) => row?.original));
	}, [selectedFlatRows, setSelectedIds]);

	const { globalFilter, pageIndex, pageSize } = state;
	const {
		currentPage,
		currentPageLimit,
		total,
		totalPage,
		prevPage,
		nextPage,
		prevPageLimit,
		nextPageLimit,
	} = data?.pagination || {
		currentPage: 1,
		currentPageLimit: 10,
		total: 0,
		totalPage: 1,
		prevPage: 1,
		nextPage: 1,
		prevPageLimit: 10,
		nextPageLimit: 10,
	};

	useEffect(() => {
		setPageSize(limit);
	}, []);

	// if () return <SkeletionTable />;

	return (
		<>
			<Card>
				<div className="md:flex justify-between items-center mb-6">
					<div className="md:flex md:w-[60%] gap-10 items-center">
						<h4 className="card-title">{title}</h4>
					</div>

					<div className="flex items-center justify-between gap-4">
						{/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}

						{isPrintBarcode && ( //
							<div className="md:w-[150px] mt-1">
								<BarcodePrint
									selectedIds={selectedIds}
								/>
							</div>
						)}
						{(isPrintInventory || isPrintBranchUser || isPrintBranch) && ( //
							<div className="md:w-[70px] mt-1">
								<PrintAll
									selectedIds={selectedIds}
									isPrintBranch={isPrintBranch}
									isPrintBranchUser={isPrintBranchUser}
									isPrintInventory={isPrintInventory}
								/>
							</div>
						)}
						{/* {(isPrintServiceType || isPrintItemType) && (
							<div className="md:w-[50px] mt-1">
								<PrintApplicationSetting
									isPrintItemType={isPrintItemType}
									isPrintServiceType={isPrintServiceType}
								/>
							</div>
						)} */}
						{(isPrintCompleteReturnParcel || isPrintReceivedReturnBranchTransfer || isPrintReturnParcel || isPrintReturnBranchTransfer) && (
							<div className="md:w-[50px] mt-1">
								<PrintReturnParcel
									isPrintCompleteReturnParcel={isPrintCompleteReturnParcel}
									isPrintReceivedReturnBranchTransfer={isPrintReceivedReturnBranchTransfer}
									isPrintReturnParcel={isPrintReturnParcel}
									isPrintReturnBranchTransfer={isPrintReturnBranchTransfer}
								/>
							</div>
						)}
						{(isPrintReceivedBranchTransfer) && (
							<div className="md:w-[50px] mt-1">
								<PrintDeliveryParcel
									isPrintReceivedBranchTransfer={isPrintReceivedBranchTransfer}
								/>
							</div>
						)}
						{(isPrintAllRiderListByBranch || isPrintAllMerchantsByBranch) && (
							<div className="md:w-[50px] mt-1">
								<PrintIdByBranch
									isPrintAllRiderListByBranch={isPrintAllRiderListByBranch}
									isPrintAllMerchantsByBranch={isPrintAllMerchantsByBranch}
								/>
							</div>
						)}

						{(isPrintPickupDeliveryBranchTransfer || isPrintPickupParcelPickupParcel) && (
							<div className="md:w-[50px] mt-1">
								<PrintpickupParcel
									isPrintPickupDeliveryBranchTransfer={isPrintPickupDeliveryBranchTransfer}
									isPrintPickupParcelPickupParcel={isPrintPickupParcelPickupParcel}
								/>
							</div>
						)}

						{isSearch && (
							<GlobalFilter
								setPaginationPage={setPaginationPage}
								search={search}
								setSearch={setSearch}
							/>
						)}

						{addNew 
						// && permission?.create 
						&& (
							<div>
								<Button
									icon="heroicons-outline:plus"
									text={create ? create : 'Add New Entry'}
									className="btn-dark bg-slate-800 dark:[#0F172A]  h-min text-sm font-normal"
									iconClass=" text-lg"
									onClick={() => navigate('new')}
								/>
							</div>
						)}
					</div>
				</div>
				<div className="md:flex flex-wrap md:items-center mb-6 gap-4">
					{barcodeScanner && (
						<div>
							<label htmlFor="" className="form-label">
								Write or paste parcel invoice barcode
							</label>
							<input
								className="border border-gray-200 p-3 outline-none w-[600px] text-sm "
								placeholder="Write or paste parcel invoice barcode "
								type="text"
								value={barcodeInput}
								onChange={handleBarcodeChange}
								onKeyDown={handleBarcodeKeyPress}
							/>
						</div>
					)}

					{isPickupRiderShow && (
						<div className="md:w-[255px] w-full mb-2">
							<label htmlFor="" className="form-label">
								Pickup Rider
							</label>
							<SelectPickupRiderByBranchId
								control={control}
								branchId={auth?.user?.user_info?.branch_id}
							/>
						</div>
					)}
					{isDeliveryRiderShow && (
						<div className="md:w-[255px] w-full mb-2">
							<label htmlFor="" className="form-label">
								Delivery Rider
							</label>
							<SelectDeliveryRiderByBranchId
								control={control}
								branchId={auth?.user?.user_info?.branch_id}
							/>
						</div>
					)}
					{isReturnRiderShow && (
						<div className="md:w-[255px] w-full mb-2">
							<label htmlFor="" className="form-label">
								Return Rider
							</label>
							<SelectRider
								control={control}
								branchId={auth?.user?.user_info?.branch_id}
							/>
						</div>
					)}
					{isRiderParcelStatusShow && (
						<div className="md:w-[255px] w-full mb-2">
							<label htmlFor="" className="form-label">
								Status
							</label>
							<SelectParcelStatus control={control} />
						</div>
					)}
					{isToggleStatusShow && (
						<div className="md:w-[255px] w-full mb-2">
							<label htmlFor="" className="form-label">
								Status
							</label>
							<SelectStatus control={control} all_parcel={true} />
						</div>
					)}

					{isToggleDropdownShow && (
						<div className="md:w-[255px] w-full mb-2">
							<label htmlFor="" className="form-label">
								Merchant
							</label>
							{branch_name ? (
								<SelectMerchantByBranchId
									control={control}
									all_parcel={true}
									required={false}
								/>
							) : (
								<SelectMerchant control={control} all_parcel={true} />
							)}
							{/* <SelectMerchant  /> */}
						</div>
					)}

					{isMerchantDeliveryPaymentTypeShow && (
						<div className="md:w-[255px] w-full mb-2">
							<label htmlFor="" className="form-label">
								Delivery Payment Type
							</label>
							<SelectMerchantDeliveryPaymentType control={control} all_parcel={true} />
						</div>
					)}
					{isParcelStatusShow && (
						<div className="md:w-[255px] w-full mb-2">
							<label htmlFor="" className="form-label">
								Parcel Status
							</label>
							<SelectParcelStatus control={control} all_parcel={true} />
						</div>
					)}
					{isToggleBranchShow && (
						<div className="md:w-[255px] w-full mb-2">
							<label htmlFor="" className="form-label">
								Branch
							</label>
							<SelectBranch control={control} all_parcel={true} />
						</div>
					)}
					{isAllStaffShow && (
						<div className="md:w-[255px] w-full mb-2">
							<label htmlFor="" className="form-label">
								Staff
							</label>
							<SelectAllStaff control={control} all_parcel={true} />
						</div>
					)}
					{is_rider_show && (
						<div className="md:w-[255px] w-full mb-2">
							<label htmlFor="" className="form-label">
								Rider
							</label>
							<SelectRider
								control={control}
								branchId={auth?.user?.user_info?.branch_id}
								pick_up_rider={true}
							/>
						</div>
					)}
					{is_all_rider_show && (
						<div className="md:w-[255px] w-full mb-2">
							<label htmlFor="" className="form-label">
								Rider
							</label>
							<SelectRiderAll
								control={control}
							/>
						</div>
					)}
					{/* {is_pickup_run_status_show && (
						<div className="md:w-[255px] w-full mb-2">
							<label htmlFor="" className="form-label">
								Run Status
							</label>
							<SelectPickupRunStatus control={control} />
						</div>
					)} */}
					{is_delivery_payment_type_show && (
						<div className="md:w-[255px] w-full mb-2">
							<label htmlFor="" className="form-label">
								Delivery Payment Type
							</label>
							<SelectDeliveryPaymentType control={control} />
						</div>
					)}
					{isDateShow && (
						<div className="md:w-[255px] mb-2">
							<label htmlFor="" className="form-label">
								From Date
							</label>
							<FlatpickerPage
								fromDate={fromDate}
								setFromDate={setFromDate}
								fromDateShow={true}
							/>
						</div>
					)}
					{isDateShow && (
						<div className="md:w-[255px] mb-2">
							<label htmlFor="" className="form-label">
								To Date
							</label>
							<FlatpickerPage
								toDate={toDate}
								setToDate={setToDate}
								toDateShow={true}
							/>
						</div>
					)}
					{isPrint && (
						<div className="md:w-[50px] mb-2">
							<label htmlFor="" className="form-label">
								Print
							</label>
							<PrintAllParcel
								handleExport={handleExport}
								dataForExport={dataForExport}
								dataPending={dataPending}
								statusId={statusId}
							/>
						</div>
					)}
					{isExcelExport && (
						<div className="md:w-[50px] mb-2">
							<label htmlFor="" className="form-label">
								Excel
							</label>
							<AiFillFileExcel
								onClick={handleExport}
								className=" border border-gray-300 text-2xl p-2 h-[35px] w-[35px] cursor-pointer"
							/>
						</div>
					)}

					{isPrintBranche && (
						<div className="md:w-[50px] mb-2">
							<label htmlFor="" className="form-label">
								Print
							</label>
							<PrintAllParcelBranch
								handleExport={handleExport}
								dataForExportBranch={dataForExportBranch}
							/>
						</div>
					)}

					{isPrintcompleteDeliveryProcessinglist && (
						<div className="md:w-[50px] mb-2">
							<label htmlFor="" className="form-label">
								Print
							</label>
							<PrintCompleteDeliveryProcessingList
								completeDeliveryProcessinglistData={completeDeliveryProcessinglistData}
							/>
						</div>
					)}

					{isPrintreturnRiderRunList && (
						<div className="md:w-[50px] mb-2">
							<label htmlFor="" className="form-label">
								Print
							</label>
							<PrintReturnRiderRunList
								returnRiderRunListPrintData={returnRiderRunListPrintData}
							/>
						</div>
					)}

					{isPrintDeliveryRiderRun && (
						<div className="md:w-[50px] mb-2">
							<label htmlFor="" className="form-label">
								Print
							</label>
							<PrintDeliveryRiderRun
								deliveryRiderRunData={deliveryRiderRunData}
							/>
						</div>
					)}

					{isPrintPickupParcel && (
						<div className="md:w-[50px] mb-2">
							<label htmlFor="" className="form-label">
								Print
							</label>
							<PrintiPickupParcel
								pickupParcelData={pickupParcelData} togglePrintClick={togglePrintClick}
							/>
						</div>
					)}

					{isPrintAllRiderParcelShow && (
						<div className="md:w-[50px] mb-2">
							<label htmlFor="" className="form-label">
								Print
							</label>
							<PrintAllRiderParcel
								allRiderParcelListData={allRiderParcelListData}
								togglePrintClick={togglePrintClick}
							/>
						</div>
					)}

					{isPrintcompleteDeliveryPayment && (
						<div className="md:w-[50px] mb-2">
							<label htmlFor="" className="form-label">
								Print
							</label>
							<PrintCompleteDeliveryPayment
								completeDeliveryPaymentPrintData={completeDeliveryPaymentPrintData}
								togglePrintClick={togglePrintClick}
							/>
						</div>
					)}
					{isPrintpendingRescheduleParcel && (
						<div className="md:w-[50px] mb-2">
							<label htmlFor="" className="form-label">
								Print
							</label>
							<PrintPendingRescheduleParcel
								pendingRescheduleParcelData={pendingRescheduleParcelData}
							/>
						</div>
					)}




				</div>
				<div className="overflow-x-auto -mx-6">
					<div className="inline-block min-w-full align-middle">
						<div className="overflow-hidden ">
							<table
								className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
								{...getTableProps}
							>
								{isFetching && (
									<div className='w-screen flex justify-center mt-5'>
										<Loading />
									</div>
								)}
								<thead className="bg-slate-200 dark:bg-slate-700">
									{headerGroups.map((headerGroup) => (
										<tr {...headerGroup.getHeaderGroupProps()}>
											{headerGroup.headers.map((column) => (
												<th
													{...column.getHeaderProps(
														column.getSortByToggleProps()
													)}
													scope="col"
													className=" table-th "
												>
													{column.render('Header')}
													<span>
														{column.isSorted
															? column.isSortedDesc
																? ' 🔽'
																: ' 🔼'
															: ''}
													</span>
												</th>
											))}
										</tr>
									))}
								</thead>
								{/* <tbody
									className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
									{...getTableBodyProps}
								>
									{data?.result?.length ? (
										page.map((row) => {
											prepareRow(row);
											return (
												<tr {...row.getRowProps()} key={row.id}>
													{row.cells.map((cell) => {
														return (
															<td
																{...cell.getCellProps()}
																className="table-td"
																key={cell.id}
															>
																{cell.render('Cell')}
															</td>
														);
													})}
												</tr>
											);
										})
									) : (
										<tr>
											<td colSpan={columns.length} className="text-center py-4">
												No data available
											</td>
										</tr>
									)}
								</tbody> */}

								<tbody
									className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
									{...getTableBodyProps}
								>

									{page.map((row, rowIndex) => {
										prepareRow(row);
										return (
											<>

												<tr {...row.getRowProps()}   className="even:bg-gray-100 odd:bg-white dark:even:bg-slate-700 dark:odd:bg-slate-800">

													{row.cells.map((cell, cellIndex) => {
														return (
															<>
																{
																	isFetching ? (
																		<span></span>
																	) : (
																		<td
																			{...cell.getCellProps()}
																			className="table-td normal-case"
																		>
																			{(rowSelect && defaultSL ? cellIndex === 1 :
																				!rowSelect && defaultSL ? cellIndex === 0 : false
																			)
																				? // count
																				rowIndex + 1 + limit * (paginationPage - 1)
																				: cell.render('Cell')}
																		</td>
																	)
																}
															</>
														);
													})}
												</tr>
											</>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				{isPaginationShow && (
					<div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
						<div className=" flex items-center space-x-3 rtl:space-x-reverse">
							<select
								className="form-control py-2 w-max"
								value={limit}
								onChange={(e) => {
									setLimit(Number(e.target.value));
									setPageSize(Number(e.target.value));
								}}
							>
								{[1, 10, 25, 50, 100].map((pageSize) => (
									<option key={pageSize} value={pageSize}>
										Show {pageSize}
									</option>
								))}
							</select>
							<span className="text-sm font-medium text-slate-600 dark:text-slate-300">
								Page{' '}
								<span>
									{currentPage} of {totalPage}
								</span>
							</span>
						</div>

						<Pagination
							currentPage={currentPage}
							handlePageChange={setPaginationPage}
							totalPages={totalPage}
							text={false}
						/>
					</div>
				)}

				{/*end*/}
			</Card>
		</>
	);
};

export default CustomPaginationTable;
