
import { Controller } from 'react-hook-form';
import ReactSelectError from './ReactSelectError';
import SelectCustom from './SelectCustom';

const SelectCouponDiscountType = ({
	label,
	control,
	setState,
	setItem,
	state,
	defaultValue,
	isMarked,
	isDisabled,
	name,
	className = "",
	error,
}) => {

	const options = [
		{
			value: "",
			label: "All Discount Type"
		},
		{
			value: "brand",
			label: "Brand"
		},
		{
			value: "category",
			label: "Category"
		},
		{
			value: "subCategory",
			label: "SubCategory"
		},
	];


	return (
		<div>
			<Controller
				name={name || 'branch_id'}
				control={control}
				defaultValue={defaultValue}
				render={({ field: { onChange, onBlur, value, ref } }) => (
					<SelectCustom
						label={label}
						isMarked={isMarked}
						defaultValue={defaultValue}
						options={options}
						onChange={onChange}
						setState={setState}
						setItem={setItem}
						isDisabled={isDisabled}
						error={error}
					// isLoading={isLoading}
					/>
				)}
				rules={{ required: 'DiscountType is required!' }}
			/>
			{/* <ReactSelectError errorName={error?.[name ? name : 'branch_id']} /> */}
		</div>
	);
};

export default SelectCouponDiscountType;
