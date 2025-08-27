
import { Controller } from 'react-hook-form';
import ReactSelectError from './ReactSelectError';
import SelectCustom from './SelectCustom';

const SelectDiscountType = ({
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
	required = false,
}) => {

	const options = [
		{
			value: "",
			label: "All Discount Type"
		},
		{
			value: "percent",
			label: "Percent"
		},
		{
			value: "flat",
			label: "Flat"
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
				// rules={{ required: 'DiscountType is required!' }}
				rules={{ required: required ? 'Brand is required!' : false }}
			/>
			{/* <ReactSelectError errorName={error?.[name ? name : 'branch_id']} /> */}
		</div>
	);
};

export default SelectDiscountType;
