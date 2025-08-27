


import React from "react";

import Loading from '@/components/Loading';
import { useParams } from 'react-router-dom';
import PageView from "@/components/shared/PageView/PageView";
import { useGetBrandByIdQuery } from "@/store/api/app/Brand/categoryApiSlice";

const BrandView = () => {
	const { id } = useParams();

	const { data, isFetching, isLoading, isError, error } =
		useGetBrandByIdQuery(id);

	console.log("data", data);
	const items = [
		{
			title: "Brand Name",
			value: data?.data?.name,
		},
		{
			image: "Image",
			value: data?.data?.image,

		},
	];

	if (isLoading || isFetching) return <Loading />;
	return (
		<div>
			<PageView items={items} title="View Title" />
		</div>
	);
};

export default BrandView;
