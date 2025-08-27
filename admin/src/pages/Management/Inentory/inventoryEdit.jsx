import Loading from '@/components/Loading';
import Error from '@/pages/404';
import { useParams } from 'react-router-dom';
import InventoryForm from './inventoryForm';
import { useGetInventoryByIdQuery } from '@/store/api/app/Inventory/inventoryApiSlice';


const InventoryEdit = () => {
	const { id } = useParams();

	const { data, isFetching, isLoading, isError, error } =
		useGetInventoryByIdQuery(id);

	if (isLoading || isFetching) return <Loading />;

	if (!id) return <Error />;

	return (
		<>
			<InventoryForm id={id} data={data?.data} />
		</>
	);
};

export default InventoryEdit;
