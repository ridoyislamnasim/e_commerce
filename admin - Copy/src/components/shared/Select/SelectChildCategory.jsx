
import { Controller } from 'react-hook-form';
import ReactSelectError from './ReactSelectError';
import SelectCustom from './SelectCustom';
import { useGetChildCategorysQuery } from '@/store/api/app/ChildCategory/childCategoryApiSlice';

const SelectChildCategory = ({
	label,
	error,
	required= false,
	control,
	setState,
	setItem,
	state,
	defaultValue,
	isMarked,
	isDisabled,
	className = '',
	name,
}) => {
	const { data, isLoading } = useGetChildCategorysQuery()
console.log('SelectChildCategory', defaultValue)
	const options = [
		{ value: '', label: 'Select a Child Category' }, // Default empty option
		...(data?.data?.map((item) => ({
		  value: item._id,
		  label: item.name,
		})) || []),
	  ];
console.log('options -------', options)
	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className={className}>
			<Controller
				name={name || '_id'}
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
					// label={label}
					// 	isMarked={isMarked}
					// 	defaultValue={defaultValue}
					// 	options={options}
					// 	onChange={onChange}
					// 	setState={setState}
					// 	setItem={setItem}
					// 	isDisabled={isDisabled}
				)}
				// rules={{ required: required ? 'Sub category is required!' : false }}
				rules={{ required: required ? 'Brand is required!' : false }}
			/>
			{/* <ReactSelectError errorName={error?.[name ? name : '_id']} /> */}
		</div>
	);
};

export default SelectChildCategory;
