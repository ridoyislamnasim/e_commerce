


import React from "react";

import Loading from '@/components/Loading';
import { useParams } from 'react-router-dom';
import PageView from "@/components/shared/PageView/PageView";
import { useGetBannerByIdQuery } from "@/store/api/app/Banner/bannerApiSlice";

const BannerView = () => {
	const { id } = useParams();

	const { data, isFetching, isLoading, isError, error } =
		useGetBannerByIdQuery(id);

	console.log("data", data);
	const items = [
		{
			title: "Bannar Type",
			value: data?.data?.type,
		},
		{
			image: "Image",
			value: data?.data?.image,

		},
		{
			title: "Title ",
			value: data?.data?.title,

		},
		{
			title: "Details",
			value: data?.data?.details,

		},
	];

	if (isLoading || isFetching) return <Loading />;
	return (
		<div>
			<PageView items={items} title="View Title" />
		</div>
	);
};

export default BannerView;
