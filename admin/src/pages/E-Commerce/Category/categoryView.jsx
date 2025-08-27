import Loading from '@/components/Loading';
import PageView from '@/components/shared/PageView/PageView';
import { useGetCategoryByIdQuery } from '@/store/api/app/Category/categoryApiSlice';
import { useParams } from 'react-router-dom';

const CategoryView = () => {
	const { id } = useParams();

	const { data, isFetching, isLoading, isError, error } =
		useGetCategoryByIdQuery(id);

	const items = [
		
		{
			title: "Name ",
			value: data?.data?.name,

		},
		{
			title: "Color Code ",
			value: data?.data?.colorCode,

		},
		{
			status: "Status",
			value: data?.data?.status,
		},
		{
			image: "Image",
			value: data?.data?.image,

		},
		
	];

	if (isLoading || isFetching) return <Loading />;

	return (
		<>
			<div>
				<PageView items={items} title="View Category" />
			</div>
		</>
	);
};

export default CategoryView;
