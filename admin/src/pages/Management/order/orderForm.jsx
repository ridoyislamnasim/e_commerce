
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
// import SelectDiscountType from '@/components/shared/Select/SelectOrderDiscountType';
import SelectBrand from '@/components/shared/Select/SelectBrand';
import SelectCategory from '@/components/shared/Select/SelectCategory';
import SelectSubCategory from '@/components/shared/Select/SelectSubCategory';

import OrderFormRepeater from '@/components/ui/orderFormRepeater';
import SelectAllUser from '@/components/shared/Select/SelectUser';
import { useCreateAdminOrderMutation, useUpdateOrderMutation } from '@/store/api/app/Order/orderApiSlice';
const OrderForm = ({ id, data }) => {
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
	} = useSubmit(id, id ? useUpdateOrderMutation : useCreateAdminOrderMutation);
	const selectedDiscountType = watch("discountType");
	console.log("selectedDiscountType", selectedDiscountType);
	const handleFormSubmit = async (data) => {
		console.log("data=-=================", data);

		data.warehouseRef =auth?.user?.warehouseRef;
		await onSubmit(data);
	};

	useEffect(() => {
		reset({

		});
	}, [data]);
	console.log("dats updated errors", errors);
	return (
		<form onSubmit={handleSubmit(handleFormSubmit)}>
			<Card title={id ? 'Edit Order' : 'Create New Order'}>

				<div className="grid grid-cols-1 gap-5">
					{/* {!id && */}
					<>
						<SelectAllUser
							className="w-full"
							label="Select User"
							control={control}
							name="userRef"
							required={true}
							error={errors?.userRef}
							defaultValue={data?.userRef?._id}
						/>
						<OrderFormRepeater
							header='Order product details'
							register={register}
							control={control}
							setValue={setValue}
							error={errors}
							watch={watch}
						// defaultValue={data?.inventoryRef}
						/>
						
						
					</>
					


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

export default OrderForm;
