import React from "react";
import Loading from '@/components/Loading';
import { useParams } from 'react-router-dom';
import PageView from "@/components/shared/PageView/PageView";
import { useGetSingleSendTransferByIdQuery } from "@/store/api/app/SendTransfer/transferApiSlice";

const SendTransferView = () => {
	const { id } = useParams();

	const { data, isFetching, isLoading, isError, error } =
		useGetSingleSendTransferByIdQuery(id);

	console.log("data", data);
	const items = [
		{
			title: "SendTransfer Code",
			value: data?.data?.code,
		},
		{
			title: "Discount",
			value: data?.data?.discount,
		},
		{
			title: "Use Limit",
			value: data?.data?.useLimit,
		},
		{
			title: "SendTransfer Used",
			value: data?.data?.used,
		},
		{
			title: "Start Date",
			value: new Date(data?.data?.startDate).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
			}),
		},
		{
			title: "Expire Date",
			value: new Date(data?.data?.expireDate).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
			}),
		},
		{
			title: "Discount Type",
			value: data?.data?.discountType,
		},
	];


	if (isLoading || isFetching) return <Loading />;
	return (
		<div>
			<PageView items={items} title="View Title" />
		</div>
	);
};

export default SendTransferView;
