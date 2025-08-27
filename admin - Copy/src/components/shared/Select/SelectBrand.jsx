

import { Controller } from 'react-hook-form';
import ReactSelectError from './ReactSelectError';
import SelectCustom from './SelectCustom';

import { useSelector } from 'react-redux';
import { useGetBrandsQuery } from '@/store/api/app/Brand/categoryApiSlice';

const SelectBrand = ({
	label,
	error,
	required = false,
	control,
	setState,
	setItem,
	state,
	className = '',
	defaultValue,
	isMarked,
	isDisabled,
	name,
}) => {

	// const { isAuth, auth } = useSelector((state) => state.auth);
	// console.log("SelectBrand error", error);
	const { data, isLoading } = useGetBrandsQuery()

	const options = [
		{ value: '', label: 'Select a Brand' }, // Default empty option
		...(data?.data?.map((item) => ({
			value: item._id,
			label: item.name,
		})) || []),
	];

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className={className}>
			<Controller
				name={name || 'category_id'}
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
						required={required}
						error={error}
					/>
				)}
				rules={{ required: required ? 'Brand is required!' : false }}
			// rules={{ required: false }}

			/>
			<ReactSelectError errorName={error?.[name ? name : 'category ']} />
		</div>
	);
};

export default SelectBrand;

