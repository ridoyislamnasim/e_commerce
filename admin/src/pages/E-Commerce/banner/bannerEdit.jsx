import Loading from '@/components/Loading';
import Error from '@/pages/404';
import { useGetBannerByIdQuery } from '@/store/api/app/Banner/bannerApiSlice';
import { useParams } from 'react-router-dom';
import BannerForm from './bannerForm';

const BannerEdit = () => {
	const { id } = useParams();

	const { data, isFetching, isLoading, isError, error } =
		useGetBannerByIdQuery(id);

	if (isLoading || isFetching) return <Loading />;

	if (!id) return <Error />;

	return (
		<>
			<BannerForm id={id} data={data?.data} />
		</>
	);
};

export default BannerEdit;
