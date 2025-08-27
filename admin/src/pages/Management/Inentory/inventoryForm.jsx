
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
// import SelectDiscountType from '@/components/shared/Select/SelectInventoryDiscountType';
import SelectBrand from '@/components/shared/Select/SelectBrand';
import SelectCategory from '@/components/shared/Select/SelectCategory';
import SelectSubCategory from '@/components/shared/Select/SelectSubCategory';
import { useCreateInventoryMutation, useUpdateInventoryMutation } from '@/store/api/app/Inventory/inventoryApiSlice';
import SelectWarehouseProduct from '@/components/shared/Select/SelectWarehouseProduct';
import ColorPicker from '@/components/ui/ColorPicker';
const InventoryForm = ({ id, data }) => {
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
	} = useSubmit(id, id ? useUpdateInventoryMutation : useCreateInventoryMutation);
	const selectedDiscountType = watch("discountType");
	console.log("selectedDiscountType", selectedDiscountType);
	const handleFormSubmit = async (data) => {
		;
		data.warehouseRef = auth?.user?.warehouseRef
		await onSubmit(data);
	};

	useEffect(() => {
		reset({
			code: data?.code,
			quantity: data?.quantity,
			level: data?.level,
			name: data?.name,
			color: data?.color || "#000000",
			barcode: data?.barcode,
		});
	}, [data]);
	console.log("dats updated errors", errors);
	return (
		<form onSubmit={handleSubmit(handleFormSubmit)}>
			<Card title={id ? 'Edit Inventory' : 'Create New Inventory'}>
				<div className="grid grid-cols-1 gap-5">
					<SelectWarehouseProduct
						label="Select Product"
						control={control}
						name="productRef"
						required={true}
						error={errors?.productRef}
						defaultValue={data?.productRef}
						isDisabled={id ? true : false}
					/>

					<Textinput
						register={register}
						label="Quantity"
						type="number"
						placeholder="Inventory Quantity"
						name="quantity"
						required={true}
						error={errors?.quantity}
					/>
					<Textinput
						register={register}
						label="Level"
						type="text"
						placeholder="Inventory Level"
						name="level"
					// required={true}
					// error={errors?.level}
					/>
					<Textinput
						register={register}
						label="Color Name"
						type="text"
						placeholder="Inventory Color Name"
						name="name"
					// required={true}
					// error={errors?.name}
					/>
					<ColorPicker
						label="Pick a Category Color"
						// defaultColor={color || "#000000"}
						defaultColor={"#000000"}
						setValue={setValue}
						suggestedColors={[
							"#797E72",
							"#FFF3FF",
							"#FFFCEB",
							"#FEEFEA",
							"#E7EAF2",
							"#282828",
							"#FFFFFF",
						]}
						name={`color`}
					/>
					<Textinput
						label="Barcode"
						type="text"
						id={`barcode`}
						placeholder="Barcode"
						register={register}
						name={`barcode`}
						disabled={id ? true : false}
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

export default InventoryForm;
