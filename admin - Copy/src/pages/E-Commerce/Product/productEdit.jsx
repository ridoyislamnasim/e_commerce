import Loading from '@/components/Loading';
import Error from '@/pages/404';
import { useParams } from 'react-router-dom';
import ProductForm from './productForm';
import { useGetProductByIdQuery } from '@/store/api/app/Product/productApiSlice';

const ProductEdit = () => {
	const { id } = useParams();
console.log("ProductEdit called id" , id);
	const { data, isFetching, isLoading, isError, error } =
		useGetProductByIdQuery(id);
console.log("ProductEdit", data)
	if (isLoading || isFetching) return <Loading />;

	if (!id) return <Error />;

	return (
		<>
			<ProductForm id={id} data={data?.data} />
		</>
	);
};

export default ProductEdit;
