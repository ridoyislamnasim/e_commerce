


import React from "react";

import Loading from '@/components/Loading';
import { useParams } from 'react-router-dom';
import PageView from "@/components/shared/PageView/PageView";
import { useGetChildCategoryByIdQuery } from "@/store/api/app/ChildCategory/childCategoryApiSlice";

const ChildCategoryView = () => {
	const { id } = useParams();

	const { data, isFetching, isLoading, isError, error } =
		useGetChildCategoryByIdQuery(id);

	console.log("data", data);
	const items = [
		{
			title: "Child Category Name",
			value: data?.data?.name,
		},
		{
			title: "Sub Category Name",
			value: data?.data?.subCategoryRef?.name,
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

export default ChildCategoryView;
