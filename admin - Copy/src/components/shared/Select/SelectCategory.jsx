import { Controller } from 'react-hook-form';
import ReactSelectError from './ReactSelectError';
import SelectCustom from './SelectCustom';

import { useSelector } from 'react-redux';
import { useGetCategorysQuery } from '@/store/api/app/Category/categoryApiSlice';

const SelectCategory = ({
	label,
	error,
	control,
	required = false,
	setState,
	setItem,
	state,
	defaultValue,
	isMarked,
	isDisabled,
	className = '',
	name,
}) => {
	// const { isAuth, auth } = useSelector((state) => state.auth);
console.log("SelectCategory error", defaultValue);
console.log("SelectCategory error", defaultValue);
	const { data, isLoading } = useGetCategorysQuery()

	const options = [
		{ value: '', label: 'Select a category' }, // Default empty option
		...(data?.data?.map((item) => ({
		  value: item.id,
		  label: item.name,
		})) || []),
	  ];

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className ={className}>
			<Controller
				name={name || 'categoryRef'}
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
					/>
				)}
				rules={{ required: required ? 'Category is required!' : false }}
				
			/>
			{/* <ReactSelectError errorName={error?.[name ? name : 'category ']} /> */}
		</div>
	);
};

export default SelectCategory;
