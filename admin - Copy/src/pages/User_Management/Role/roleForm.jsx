
import RtlSwicth from '@/components/partials/settings/Tools/Rtl';
import SelectRolePermission from '@/components/shared/Select/SelectRolePermission';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Fileinput from '@/components/ui/Fileinput';
// import Swicth from '@/components/ui/Switch';
import Switch from "@/components/ui/switchCheck";
import Textarea from '@/components/ui/Textarea';
import Textinput from '@/components/ui/Textinput';
import useSubmit from '@/hooks/useSubmit';
import { useCreateRoleMutation, useUpdateRoleMutation } from '@/store/api/app/Role/roleApiSlice';
// import { useCreateRoleMutation, useUpdateRoleMutation } from '@/store/api/app/Role/roleApiSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RoleForm = ({ id, data }) => {
	const { isAuth, auth } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	const {
		register,
		unregister,
		control,
		errors,
		reset,
		handleSubmit,
		onSubmit,
		watch,
		isLoading,
	} = useSubmit(id, id ? useUpdateRoleMutation : useCreateRoleMutation);

	const handleFormSubmit = async (data) => {
		console.log("dats updated", data);
		// Manipulate the data as needed
		// const formData = new FormData();

		// const keys = Object.keys(data);

		// keys.forEach((key) => {
		// 	if (['image'].includes(key)) {
		// 		if (data[key]) {
		// 			formData.append('image', data.image[0]);
		// 		} else {
		// 			formData.append('image', data.image);
		// 		}
		// 	} else {
		// 		formData.append(key, data[key]);
		// 	}
		// });

		// formData.append('created_admin_id', auth?.role?.role_info?.id);

		await onSubmit(data);
	};
console.log('Submit =================================', data)
	useEffect(() => {
		reset({
			role: data?.role,
			subCategoryRef: data?.subCategoryRef?._id,
		});
	}, [data]);

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)}>
			<Card title={id ? 'Edit Role' : 'Create New Role'}>
				<div className="grid grid-cols-1 gap-5">
					<Textinput
						register={register}
						label="Role Name"
						type="text"
						placeholder="Role Name"
						name="role"
						required={true}
						error={errors?.role}
					/>
					<SelectRolePermission
						control={control}
						// label="Role Permission"
						// name="permissions"
						// error={errors?.permissions}
						// required={true}
						defaultValue={data?.permissions}
					/>
					{/* <div className="flex  gap-5">
						<Switch
							control={control}
							name="banner.access"
							label="Access Control"
							defaultChecked={data?.status}
							badge
							prevIcon="heroicons-outline:lock-closed"
							nextIcon="heroicons-outline:lock-open"
							activeClass="bg-green-500"
						/>
						<Switch
							control={control}
							name="banner.create"
							label="Create Control"
							defaultChecked={data?.status}
							badge
							prevIcon="heroicons-outline:lock-closed"
							nextIcon="heroicons-outline:lock-open"
							activeClass="bg-green-500"
						/>
						<Switch
							control={control}
							name="edit"
							label="Edit Control"
							defaultChecked={data?.status}
							badge
							prevIcon="heroicons-outline:lock-closed"
							nextIcon="heroicons-outline:lock-open"
							activeClass="bg-green-500"
						/>
						<Switch
							control={control}
							name="delete"
							label="Delete Control"
							defaultChecked={data?.status}
							badge
							prevIcon="heroicons-outline:lock-closed"
							nextIcon="heroicons-outline:lock-open"
							activeClass="bg-green-500"
						/>
					</div> */}

				</div>

				<div className="ltr:text-right rtl:text-left space-x-3 rtl:space-x-reverse mt-6">
					<Button
						onClick={() => navigate(-1)}
						text="Cancel"
						className="btn-light"
					/>
					<Button
						isLoading={isLoading}
						type="childmit"
						text="Save"
						className="btn-dark"
					/>
				</div>
			</Card>
		</form>
	);
};

export default RoleForm;
