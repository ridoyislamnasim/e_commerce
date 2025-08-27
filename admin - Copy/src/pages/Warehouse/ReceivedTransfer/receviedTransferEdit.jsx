import Loading from '@/components/Loading';
import Error from '@/pages/404';
import { useParams } from 'react-router-dom';
import ReceviedTransferForm from './receviedReceviedTransferForm';
import { useGetSingleReceviedTransferByIdQuery } from '@/store/api/app/ReceviedTransfer/transferApiSlice';


const ReceviedTransferEdit = () => {
	const { id } = useParams();

	const { data, isFetching, isLoading, isError, error } =
		useGetSingleReceviedTransferByIdQuery(id);

	if (isLoading || isFetching) return <Loading />;

	if (!id) return <Error />;

	return (
		<>
			<ReceviedTransferForm id={id} data={data?.data} />
		</>
	);
};

export default ReceviedTransferEdit;
