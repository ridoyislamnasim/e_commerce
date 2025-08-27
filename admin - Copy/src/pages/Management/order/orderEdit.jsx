import Loading from '@/components/Loading';
import Error from '@/pages/404';
import { useParams } from 'react-router-dom';
import OrderForm from './orderForm';
import { useGetSingleOrderByIdQuery } from '@/store/api/app/Order/orderApiSlice';


const OrderEdit = () => {
	const { id } = useParams();

	const { data, isFetching, isLoading, isError, error } =
		useGetSingleOrderByIdQuery(id);

	if (isLoading || isFetching) return <Loading />;

	if (!id) return <Error />;

	return (
		<>
			<OrderForm id={id} data={data?.data} />
		</>
	);
};

export default OrderEdit;
