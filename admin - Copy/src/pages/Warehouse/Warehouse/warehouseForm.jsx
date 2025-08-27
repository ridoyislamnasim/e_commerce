
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Fileinput from '@/components/ui/Fileinput';
import Textarea from '@/components/ui/Textarea';
import Textinput from '@/components/ui/Textinput';
import useSubmit from '@/hooks/useSubmit';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Flatpickr from "react-flatpickr";
import DatePicker from '@/components/ui/DatePicker';
// import SelectDiscountType from '@/components/shared/Select/SelectWarehouseDiscountType';
import SelectBrand from '@/components/shared/Select/SelectBrand';
import SelectCategory from '@/components/shared/Select/SelectCategory';
import SelectSubCategory from '@/components/shared/Select/SelectSubCategory';

import SelectAllUser from '@/components/shared/Select/SelectUser';
import { useCreateAdminWarehouseMutation, useUpdateWarehouseMutation } from '@/store/api/app/Warehouse/warehouseApiSlice';
const WarehouseForm = ({ id, data }) => {
	const [picker, setPicker] = useState(new Date());
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
		setValue,
		isLoading,
	} = useSubmit(id, id ? useUpdateWarehouseMutation : useCreateAdminWarehouseMutation);
	const handleFormSubmit = async (data) => {
		console.log("data=-=================", data);
		await onSubmit(data);
	};

	useEffect(() => {
		reset({
			name: data?.name,
			location: data?.location,
			contact: data?.contact,
			managerRef: data?.managerRef?._id,

		});
	}, [data]);
	console.log("dats updated errors", errors);
	return (
		<form onSubmit={handleSubmit(handleFormSubmit)}>
			<Card title={id ? 'Edit Warehouse' : 'Create New Warehouse'}>

				<div className="grid grid-cols-1 gap-5">
					<Textinput
						register={register}
						label="Name"
						type="text"
						placeholder="Warehouse Name"
						name="name"
						required={true}
						error={errors?.name}
					/>
					<Textinput
						register={register}
						label="Location"
						type="text"
						placeholder="Warehouse Location"
						name="location"
						required={true}
						error={errors?.location}
					/>
					<SelectAllUser
                        className="w-full"
                        label="Select Manager"
                        control={control}
                        name="managerRef"
						required={true}
						error={errors?.managerRef}
						defaultValue={data?.managerRef?._id}
					/>
					<Textinput
						register={register}
						label="Contact"
						type="number"
						placeholder="Warehouse Contact"
						name="contact"
						required={true}
						error={errors?.contact}
						defaultValue={data?.contact}
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
						type="submit"
						text="Save"
						className="btn-dark"
					/>
				</div>
			</Card>
		</form>
	);
};

export default WarehouseForm;
