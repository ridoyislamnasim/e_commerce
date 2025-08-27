import Loading from '@/components/Loading';
import Error from '@/pages/404';
import { useParams } from 'react-router-dom';
import CategoryForm from './categoryForm';
import { useGetCategoryByIdQuery } from '@/store/api/app/Category/categoryApiSlice';

const CategoryEdit = () => {
	const { id } = useParams();

	const { data, isFetching, isLoading, isError, error } =
	useGetCategoryByIdQuery(id);

	if (isLoading || isFetching) return <Loading />;

	if (!id) return <Error />;

	return (
		<>
			<CategoryForm id={id} data={data?.data} />
		</>
	);
};

export default CategoryEdit;
