import Loading from '@/components/Loading';
import Error from '@/pages/404';
import { useParams } from 'react-router-dom';
import CouponForm from './couponForm';
import { useGetCouponByIdQuery } from '@/store/api/app/Coupon/couponApiSlice';

const CouponEdit = () => {
	const { id } = useParams();

	const { data, isFetching, isLoading, isError, error } =
		useGetCouponByIdQuery(id);

	if (isLoading || isFetching) return <Loading />;

	if (!id) return <Error />;

	return (
		<>
			<CouponForm id={id} data={data?.data} />
		</>
	);
};

export default CouponEdit;
