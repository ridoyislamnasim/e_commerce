import Loading from '@/components/Loading';
import Error from '@/pages/404';
import { useParams } from 'react-router-dom';
import SendTransferForm from './sendSendTransferForm';
import { useGetSingleSendTransferByIdQuery } from '@/store/api/app/SendTransfer/transferApiSlice';


const SendTransferEdit = () => {
	const { id } = useParams();

	const { data, isFetching, isLoading, isError, error } =
		useGetSingleSendTransferByIdQuery(id);

	if (isLoading || isFetching) return <Loading />;

	if (!id) return <Error />;

	return (
		<>
			<SendTransferForm id={id} data={data?.data} />
		</>
	);
};

export default SendTransferEdit;
