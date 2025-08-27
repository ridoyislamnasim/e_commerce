import { useState, useEffect } from 'react';
import SelectCustom from './SelectCustom';
import { useGetWarehouseQuery } from '@/store/api/app/Warehouse/warehouseApiSlice';
import ReactSelectError from './ReactSelectError';

const SelectWarehouseWithoutForm = ({
	label,
	error,
	required = false,
	setState,
	setItem,
	state,
	defaultValue,
	isMarked,
	isDisabled,
	className = '',
	name = '_id',
}) => {
	const { data, isLoading } = useGetWarehouseQuery();
	const [selectedValue, setSelectedValue] = useState(defaultValue || '');

	// Update state if defaultValue changes
	useEffect(() => {
		setSelectedValue(defaultValue || '');
	}, [defaultValue]);

	const options = [
		{ value: '', label: 'Select a Warehouse' }, // Default empty option
		...(data?.data?.map((item) => ({
			value: item._id,
			label: item.name,
		})) || []),
	];

	if (isLoading) {
		return <div>Loading...</div>;
	}

	const handleChange = (selectedOption) => {
		setSelectedValue(selectedOption?.value || '');
		setState && setState(selectedOption?.value || '');
		setItem && setItem(selectedOption);
	};

	return (
		<div className={className}>
			<SelectCustom
				label={label}
				isMarked={isMarked}
				defaultValue={options.find((opt) => opt.value === selectedValue)}
				options={options}
				onChange={handleChange}
				isDisabled={isDisabled}
				error={error}
			/>
			{required && !selectedValue && (
				<ReactSelectError errorName="Sub warehouse is required!" />
			)}
		</div>
	);
};

export default SelectWarehouseWithoutForm;
