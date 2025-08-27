


import React from "react";

import Loading from '@/components/Loading';
import { useParams } from 'react-router-dom';
import PageView from "@/components/shared/PageView/PageView";
import { useGetWishListByIdQuery } from "@/store/api/app/WishList/wishListApiSlice";

const WishListView = () => {
	const { id } = useParams();

	const { data, isFetching, isLoading, isError, error } =
		useGetWishListByIdQuery(id);

	console.log("data", data);
	const items = [
		{
			title: "User Name",
			value: data?.data?.userRef?.name,
		},
		{
			title: "User Email Address",
			value: data?.data?.userRef?.email,
		},
		{
			title: "Product Name",
			value: data?.data?.productRef?.name,
		},
		{
			image: "Product Photo",
			value: data?.data?.productRef?.thumbnailImage,
		},
		{
			title: "Product mrp Price ",
			value: data?.data?.productRef?.mrpPrice,
		},
		{
			title: "Product Discount ",
			value: data?.data?.productRef?.discountAmount,
		},
		{
			title: "Product Price ",
			value: data?.data?.productRef?.price,
		},
	];

	if (isLoading || isFetching) return <Loading />;
	return (
		<div>
			<PageView items={items} title="View Title" />
		</div>
	);
};

export default WishListView;
