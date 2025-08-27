import Loading from '@/components/Loading';
import PageView from '@/components/shared/PageView/PageView';
import { useGetProductByIdQuery } from '@/store/api/app/Product/productApiSlice';
import { extractYouTubeId } from '@/utils/extractYouTubeId';
import { useParams } from 'react-router-dom';
import useNoImage from '@/hooks/useNoImage';
import envConfig from '@/configs/envConfig';
const ProductView = () => {
	const { id } = useParams();
	const noImage = useNoImage();

	const { data, isFetching, isLoading, isError, error } =
		useGetProductByIdQuery(id);

	const items = [
		{
			title: "Name",
			value: data?.data?.name,
		},
		{
			title: "Description",
			value: data?.data?.description,
		},
		{
			title: "Discount Type",
			value: data?.data?.discountType,
		},
		{
			title: "Discount",
			value: data?.data?.discount,
		},
		{
			title: "Discount Amount",
			value: data?.data?.discountAmount,
		},
		{
			title: "MRP Price",
			value: data?.data?.mrpPrice,
		},
		{
			title: "Price",
			value: data?.data?.price,
		},
		{
			title: "Free Shipping",
			value: data?.data?.freeShipping ? "YES" : "NO",
		},
		{
			image: "Thumbnail Image",
			value: data?.data?.thumbnailImage
				// ? `${envConfig.apiUrl}${data?.data?.thumbnailImage}`
				// : noImage,
		},
		{
			image: "Back View Image",
			value: data?.data?.backViewImage
				// ? `${envConfig.apiUrl}${data?.data?.backViewImage}`
				// : noImage,
		},
		{
			image: "Images",
			value: data?.data?.images
				// ? data?.data?.images.map((image) => `${envConfig.apiUrl}${image}`)
				// : [noImage],
		},
		{
			title: "Video",
			value: data?.data?.videoUrl
				? `https://www.youtube.com/embed/${extractYouTubeId(data?.data?.videoUrl)}`
				: null,
		},
		{
			title: "Brand",
			value: data?.data?.brandRef?.name || "N/A",
		},
		{
			title: "Category",
			value: data?.data?.categoryRef?.name || "N/A",
		},
		{
			title: "Sub Category",
			value: data?.data?.subCategoryRef?.name || "N/A",
		},
	];

	if (isLoading || isFetching) return <Loading />;

	return (
		<>
			<div>
				<PageView items={items} title="View Product" />
			</div>
		</>
	);
};

export default ProductView;
