import Loading from '@/components/Loading';
import Error from '@/pages/404';
import { useParams } from 'react-router-dom';
import ProfitReportForm from './profitReportForm';
import { useGetSingleProfitReportByIdQuery } from '@/store/api/app/ProfitReport/profitReportApiSlice';


const ProfitReportEdit = () => {
	const { id } = useParams();

	const { data, isFetching, isLoading, isError, error } =
		useGetSingleProfitReportByIdQuery(id);

	if (isLoading || isFetching) return <Loading />;

	if (!id) return <Error />;

	return (
		<>
			<ProfitReportForm id={id} data={data?.data} />
		</>
	);
};

export default ProfitReportEdit;
