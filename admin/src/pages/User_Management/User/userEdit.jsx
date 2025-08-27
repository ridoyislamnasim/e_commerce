import Loading from '@/components/Loading';
import Error from '@/pages/404';
import { useParams } from 'react-router-dom';
import UserForm from './userForm';
import { useGetUserByIdQuery } from '@/store/api/app/User/userApiSlice';


const UserEdit = () => {
	const { id } = useParams();

	const { data, isFetching, isLoading, isError, error } =
		useGetUserByIdQuery(id);

	if (isLoading || isFetching) return <Loading />;

	if (!id) return <Error />;

	return (
		<>
			<UserForm id={id} data={data?.data} />
		</>
	);
};

export default UserEdit;
