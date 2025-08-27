
import { Controller } from 'react-hook-form';
import ReactSelectError from './ReactSelectError';
import SelectCustom from './SelectCustom';
import { useGetRolesQuery } from '@/store/api/app/Role/roleApiSlice';

const SelectRole = ({
	label,
	error,
	required = false,
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
	console.log("default value", defaultValue)
	const { data, isLoading } = useGetRolesQuery()

	const options = [
		{ value: '', label: 'Select an Role' }, // Default empty option
		...(data?.data?.map((item) => ({
			value: item._id,
			label: item.role,
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
				)}
				rules={{ required: required ? 'Sub role is required!' : false }}
			/>
			<ReactSelectError errorName={error?.[name ? name : '_id']} />
		</div>
	);
};

export default SelectRole;
