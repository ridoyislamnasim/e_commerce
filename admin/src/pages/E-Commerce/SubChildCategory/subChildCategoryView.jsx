


import React from "react";

import Loading from '@/components/Loading';
import { useParams } from 'react-router-dom';
import PageView from "@/components/shared/PageView/PageView";
import { useGetSubChildCategoryByIdQuery } from "@/store/api/app/SubChildCategory/subChildCategoryApiSlice";

const SubChildCategoryView = () => {
	const { id } = useParams();

	const { data, isFetching, isLoading, isError, error } =
		useGetSubChildCategoryByIdQuery(id);

	console.log("data", data);
	const items = [
		{
			title: "Sub Child Category Name",
			value: data?.data?.name,
		},
		{
			title: "Child Category Name",
			value: data?.data?.childCategoryRef?.name,
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

export default SubChildCategoryView;
