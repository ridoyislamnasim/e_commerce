import Loading from '@/components/Loading';
import Error from '@/pages/404';
import { useParams } from 'react-router-dom';
import RoleForm from './roleForm';
import { useGetSingleRoleByIdQuery } from '@/store/api/app/Role/roleApiSlice';
// import { useGetRoleByIdQuery } from '@/store/api/app/Role/roleApiSlice';


const RoleEdit = () => {
	const { id } = useParams();
// console.log('RoleEdit', id)
	const { data, isFetching, isLoading, isError, error } =
		useGetSingleRoleByIdQuery({id});

// console.log('data', data)
	if (isLoading || isFetching) return <Loading />;

	if (!id) return <Error />;

	return (
		<>
			<RoleForm id={id} data={data?.data} />
		</>
	);
};

export default RoleEdit;
