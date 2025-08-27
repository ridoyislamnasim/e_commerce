
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Fileinput from '@/components/ui/Fileinput';
import Textarea from '@/components/ui/Textarea';
import Textinput from '@/components/ui/Textinput';
import useSubmit from '@/hooks/useSubmit';
import { useCreateCouponMutation, useUpdateCouponMutation } from '@/store/api/app/Coupon/couponApiSlice';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Flatpickr from "react-flatpickr";
import DatePicker from '@/components/ui/DatePicker';
import SelectDiscountType from '@/components/shared/Select/SelectCouponDiscountType';
import SelectBrand from '@/components/shared/Select/SelectBrand';
import SelectCategory from '@/components/shared/Select/SelectCategory';
import SelectSubCategory from '@/components/shared/Select/SelectSubCategory';
const CouponForm = ({ id, data }) => {
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
	} = useSubmit(id, id ? useUpdateCouponMutation : useCreateCouponMutation);
	const selectedDiscountType = watch("discountType");
	console.log("selectedDiscountType", selectedDiscountType);
	const handleFormSubmit = async (data) => {
		// Manipulate the data as needed
		const formData = new FormData();
		console.log("data=-=================", data);
		// return;
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

		formData.append('created_admin_id', auth?.user?.user_info?.id);

		await onSubmit(formData);
	};

	useEffect(() => {
		reset({
			code: data?.code,
			discount: data?.discount,
			useLimit: data?.useLimit,
			startDate: data?.startDate,
			expireDate: data?.expireDate,
			discountType: data?.discountType,
		});
	}, [data]);
	console.log("dats updated errors", errors);
	return (
		<form onSubmit={handleSubmit(handleFormSubmit)}>
			<Card title={id ? 'Edit Coupon' : 'Create New Coupon'}>
				<div className="grid grid-cols-1 gap-5">

					<Textinput
						register={register}
						label="Code"
						type="text"
						placeholder="Coupon Code"
						name="code"
						required={true}
						error={errors?.code}
					/>
					<Textinput
						register={register}
						label="Discount"
						type="number"
						placeholder="Coupon Discount"
						name="discount"
						required={true}
						error={errors?.discount}
					/>
					<Textinput
						register={register}
						label="Use Limit"
						type="number"
						placeholder="Coupon Use Limit"
						name="useLimit"
						required={true}
						error={errors?.useLimit}
					/>
					<DatePicker
						label="Coupon Start Date"
						id="date-picker"
						name="startDate"
						placeholder="Coupon Start Date"
						register={register}
						// onChange={(selectedDate) => setValue('date', selectedDate)}
						onChange={(selectedDate) => setValue('startDate', selectedDate[0])}
						options={{ dateFormat: 'Y-m-d', enableTime: false }}
						error={errors.startDate}
						defaultValue={data?.startDate}
						// description="Please select a date."
						required={true}
					/>
					<DatePicker
						label="Coupon End Date"
						id="date-picker"
						name="expireDate"
						placeholder="Coupon End Date"
						register={register}
						// onChange={(selectedDate) => setValue('date', selectedDate)}
						onChange={(selectedDate) => setValue('expireDate', selectedDate[0])}
						options={{ dateFormat: 'Y-m-d', enableTime: false }}
						error={errors.expireDate}
						defaultValue={data?.expireDate}
						// description="Please select a date."
						required={true}
					/>
					<SelectDiscountType
						label="Select Discount Type"
						defaultValue={data?.discountType}
						control={control}
						name="discountType"
						required={true}
						error={errors?.discountType}
					/>
					{selectedDiscountType === "brand" && (
						<SelectBrand
							label="Select Brand"
							control={control}
							name="brandRef"
							required={true}
							error={errors?.brandRef}
							defaultValue={data?.brandRef}
						/>
					)}
					{selectedDiscountType === "category" && (
						<SelectCategory
							label="Select Category"
							control={control}
							name="categoryRef"
							required={true}
							error={errors?.categoryRef}
							defaultValue={data?.categoryRef}
						/>
					)}
					{selectedDiscountType === "subCategory" && (
						<SelectSubCategory
							label="Select Sub Category"
							control={control}
							name="subCategoryRef"
							required={true}
							error={errors?.subCategoryRef}
							defaultValue={data?.subCategoryRef}
						/>
					)}



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

export default CouponForm;
