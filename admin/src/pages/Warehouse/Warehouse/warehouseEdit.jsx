import Loading from '@/components/Loading';
import Error from '@/pages/404';
import { useParams } from 'react-router-dom';
import WarehouseForm from './warehouseForm';
import { useGetSingleWarehouseByIdQuery } from '@/store/api/app/Warehouse/warehouseApiSlice';


const WarehouseEdit = () => {
	const { id } = useParams();

	const { data, isFetching, isLoading, isError, error } =
		useGetSingleWarehouseByIdQuery(id);

	if (isLoading || isFetching) return <Loading />;

	if (!id) return <Error />;

	return (
		<>
			<WarehouseForm id={id} data={data?.data} />
		</>
	);
};

export default WarehouseEdit;
