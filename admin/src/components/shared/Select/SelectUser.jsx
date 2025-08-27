
import { Controller } from 'react-hook-form';
import ReactSelectError from './ReactSelectError';
import SelectCustom from './SelectCustom';
import { useGetUsersQuery } from '@/store/api/app/User/userApiSlice';

const SelectAllUser = ({
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
	const { data, isLoading } = useGetUsersQuery()

	const options = [
		{ value: '', label: 'Select an User' }, // Default empty option
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
				rules={{ required: required ? 'Sub category is required!' : false }}
			/>
			<ReactSelectError errorName={error?.[name ? name : '_id']} />
		</div>
	);
};

export default SelectAllUser;
