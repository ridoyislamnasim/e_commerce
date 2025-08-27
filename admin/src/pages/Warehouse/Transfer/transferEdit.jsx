import Loading from '@/components/Loading';
import Error from '@/pages/404';
import { useParams } from 'react-router-dom';
import TransferForm from './transferForm';
import { useGetSingleTransferByIdQuery } from '@/store/api/app/Transfer/transferApiSlice';


const TransferEdit = () => {
	const { id } = useParams();

	const { data, isFetching, isLoading, isError, error } =
		useGetSingleTransferByIdQuery(id);

	if (isLoading || isFetching) return <Loading />;

	if (!id) return <Error />;

	return (
		<>
			<TransferForm id={id} data={data?.data} />
		</>
	);
};

export default TransferEdit;
