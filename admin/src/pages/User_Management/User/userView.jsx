


import React from "react";

import Loading from '@/components/Loading';
import { useParams } from 'react-router-dom';
import PageView from "@/components/shared/PageView/PageView";
import { useGetUserByIdQuery } from "@/store/api/app/User/userApiSlice";

const UserView = () => {
	const { id } = useParams();

	const { data, isFetching, isLoading, isError, error } =
		useGetUserByIdQuery(id);

	console.log("data", data);
	const items = [
		{
			title: "User Name",
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

export default UserView;
