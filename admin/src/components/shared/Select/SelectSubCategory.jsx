import { Controller } from 'react-hook-form';
import ReactSelectError from './ReactSelectError';
import SelectCustom from './SelectCustom';

import { useSelector } from 'react-redux';
import { useGetSubCategorysQuery } from '@/store/api/app/SubCategory/subCategoryApiSlice';

const SelectSubCategory = ({
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
// console.log("SelectSubCategory error", error);
	const { data, isLoading } = useGetSubCategorysQuery()

	const options = [
		{ value: '', label: 'Select Sub Category' }, // Default empty option
		...(data?.data?.map((item) => ({
		  value: item._id,
		  label: item.name,
		})) || []),
	  ];

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className ={className}>
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
						error={error}
					/>
				)}
				rules={{ required: required ? 'Sub Category is required!' : false }}
				
			/>
			{/* <ReactSelectError errorName={error?.[name ? name : 'category ']} /> */}
		</div>
	);
};

export default SelectSubCategory;
