import Loading from '@/components/Loading';
import Error from '@/pages/404';
import { useParams } from 'react-router-dom';
import SubCategoryForm from './subCategoryForm';
import { useGetSubCategoryByIdQuery } from '@/store/api/app/SubCategory/subCategoryApiSlice';

const SubCategoryEdit = () => {
	const { id } = useParams();

	const { data, isFetching, isLoading, isError, error } =
		useGetSubCategoryByIdQuery(id);

	if (isLoading || isFetching) return <Loading />;

	if (!id) return <Error />;

	return (
		<>
			<SubCategoryForm id={id} data={data?.data} />
		</>
	);
};

export default SubCategoryEdit;
