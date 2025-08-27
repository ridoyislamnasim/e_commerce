// import SelectUserType from '@/components/shared/Select/SelectUserType';
// import SelectBranchType from '@/components/shared/Select/SelectBranchType';
import SelectRole from '@/components/shared/Select/SelectRole';
import SelectUser from '@/components/shared/Select/SelectUser';
import SelectWarehouse from '@/components/shared/Select/SelectWarehouse';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Fileinput from '@/components/ui/Fileinput';
import Textarea from '@/components/ui/Textarea';
import Textinput from '@/components/ui/Textinput';
import useSubmit from '@/hooks/useSubmit';
import { useCreateUserMutation, useUpdateUserMutation } from '@/store/api/app/User/userApiSlice';
import { useEffect, useState } from 'react';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserForm = ({ id, data }) => {
	const { isAuth, auth } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);

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
	} = useSubmit(id, id ? useUpdateUserMutation : useCreateUserMutation);

	const handleFormSubmit = async (data) => {
		console.log("dats updated", data);
		// Manipulate the data as needed
		const formData = new FormData();

		const keys = Object.keys(data);

		keys.forEach((key) => {
			if (['image'].includes(key)) {
				if (data[key]) {
					formData.append('image', data.image[0]);
				} else {
					formData.append('image', data.image);
				}
			} else {
				formData.append(key, data[key]);
			}
		});
		await onSubmit(formData);
	};

	useEffect(() => {
		reset({
			name: data?.name || '',
			email: data?.email,
			phone: data?.phone,
			name: data?.name,
			// password: ,
			roleRef: data?.roleRef?._id,
		});
	}, [data]);

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)}>
			<Card title={id ? 'Edit User' : 'Create New User'}>
				<div className="grid grid-cols-1 gap-5">
					<Textinput
						register={register}
						label="User Name"
						type="text"
						placeholder="User Name"
						name="name"
						required={true}
						error={errors?.name}
					/>
					<Textinput
						register={register}
						label="User Email"
						type="email"
						placeholder="User Email Address"
						name="email"
						required={true}
						error={errors?.email}
					/>
					<Textinput
						register={register}
						label="User Phone Number"
						type="number"
						placeholder="User Phone Number"
						name="phone"
						required={true}
						error={errors?.phone}
					/>

					<SelectRole
						register={register}
						label="User Role"
						name="roleRef"
						control={control}
						required={true}
						error={errors?.roleRef}
						defaultValue={data?.roleRef}
					/>
					<SelectWarehouse
						register={register}
						label="User Warehouse"
						name="warehouseRef"
						control={control}
						required={id ? false : true}
						error={errors?.warehouseRef}
						defaultValue={data?.warehouseRef}
					/>


					<div className='relative'>
						{
							!id && <Textinput
								name="password"
								label="Passwrod"
								type={showPassword ? 'text' : 'password'}
								register={register}
								error={errors.password}
								className="h-[48px]"
								placeholder='Enter your password'
							/>
						}

						<div
							className=" absolute right-3 top-12 cursor-pointer"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? <GoEyeClosed /> : <GoEye />}
						</div>
					</div>

					<Fileinput
						selectedFile={watch('image')?.[0]}
						name={'image'}
						defaultUrl={data?.image}
						preview={true}
						control={control}
					// required={true}
					/>
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

export default UserForm;
