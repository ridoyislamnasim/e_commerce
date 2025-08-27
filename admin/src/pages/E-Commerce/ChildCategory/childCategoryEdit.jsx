import Loading from '@/components/Loading';
import Error from '@/pages/404';
import { useParams } from 'react-router-dom';
import ChildCategoryForm from './childCategoryForm';
import { useGetChildCategoryByIdQuery } from '@/store/api/app/ChildCategory/childCategoryApiSlice';

const ChildCategoryEdit = () => {
	const { id } = useParams();

	const { data, isFetching, isLoading, isError, error } =
		useGetChildCategoryByIdQuery(id);

	if (isLoading || isFetching) return <Loading />;

	if (!id) return <Error />;

	return (
		<>
			<ChildCategoryForm id={id} data={data?.data} />
		</>
	);
};

export default ChildCategoryEdit;
