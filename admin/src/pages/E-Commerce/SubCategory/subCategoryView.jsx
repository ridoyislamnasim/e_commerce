


import React from "react";

import Loading from '@/components/Loading';
import { useParams } from 'react-router-dom';
import PageView from "@/components/shared/PageView/PageView";
import { useGetSubCategoryByIdQuery } from "@/store/api/app/SubCategory/subCategoryApiSlice";

const SubCategoryView = () => {
	const { id } = useParams();

	const { data, isFetching, isLoading, isError, error } =
		useGetSubCategoryByIdQuery(id);

	console.log("data", data);
	const items = [
		{
			title: "Sub Category Name",
			value: data?.data?.name,
		},
		{
			title: "Category Name",
			value: data?.data?.categoryRef?.name,
		},
		{
			image: "Category Image",
			value: data?.data?.image,
		},
	];

	if (isLoading || isFetching) return <Loading />;
	return (
		<div>
			<PageView items={items} title="View Sub Category" />
		</div>
	);
};

export default SubCategoryView;
