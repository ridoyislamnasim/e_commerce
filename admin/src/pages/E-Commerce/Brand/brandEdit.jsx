import Loading from '@/components/Loading';
import Error from '@/pages/404';
import { useParams } from 'react-router-dom';
import BrandForm from './brandForm';
import { useGetBrandByIdQuery } from '@/store/api/app/Brand/categoryApiSlice';


const BrandEdit = () => {
	const { id } = useParams();

	const { data, isFetching, isLoading, isError, error } =
		useGetBrandByIdQuery(id);

	if (isLoading || isFetching) return <Loading />;

	if (!id) return <Error />;

	return (
		<>
			<BrandForm id={id} data={data?.data} />
		</>
	);
};

export default BrandEdit;
