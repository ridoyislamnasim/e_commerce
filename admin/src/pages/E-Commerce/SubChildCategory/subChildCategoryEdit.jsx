import Loading from '@/components/Loading';
import Error from '@/pages/404';
import { useParams } from 'react-router-dom';
import { useGetSubChildCategoryByIdQuery } from '@/store/api/app/SubChildCategory/subChildCategoryApiSlice';
import SubChildCategoryForm from './subChildCategoryForm';

const SubChildCategoryEdit = () => {
	const { id } = useParams();

	const { data, isFetching, isLoading, isError, error } =
		useGetSubChildCategoryByIdQuery(id);

	if (isLoading || isFetching) return <Loading />;

	if (!id) return <Error />;

	return (
		<>
			<SubChildCategoryForm id={id} data={data?.data} />
		</>
	);
};

export default SubChildCategoryEdit;
