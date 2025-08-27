


import React from "react";

import Loading from '@/components/Loading';
import { useParams } from 'react-router-dom';
import PageView from "@/components/shared/PageView/PageView";
import { useGetSingleRoleByIdQuery } from "@/store/api/app/Role/roleApiSlice";
// import { useGetRoleByIdQuery } from "@/store/api/app/Role/roleApiSlice";

const RoleView = () => {
	const { id } = useParams();

	const { data, isFetching, isLoading, isError, error } =
		useGetSingleRoleByIdQuery(id);

	console.log("data", data);
	const items = [
		{
			title: "Role Name",
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

export default RoleView;
