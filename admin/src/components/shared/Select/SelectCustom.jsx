import Select from 'react-select';

const SelectCustom = ({
	label,
	options,
	values,
	setValues,
	setState,
	setItem,
	name,
	defaultValue,
	selectedValue,
	isMulti,
	onChange,
	isDisabled,
	isMarked,
	highlight,
	isLoading,
	error,
	msgTooltip,
}) => {
	// console.log("Select custom error", error);
	const stylesConfig = {
		control: (styles) => ({
			...styles,
			// backgroundColor: !highlight && '#f4f5f7',
			borderColor: isMarked ? '#f8b4b4' : '#e5e7eb',
			borderWidth: isMarked ? '2px' : '1px',
		}),

		option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
			...styles,
			fontSize: '12px',
		}),
		
	};

	return (

		<div  >
			{label && (
				<label
					// htmlFor={id}
					className={`block capitalize 
						form-label
						
					`}
				>
					{label}
				</label>
			)}
			<Select
				isLoading={isLoading}
				defaultValue={
					isMulti
						? defaultValue
						: selectedValue
							? selectedValue
							: options?.find((val) => val.value === defaultValue)
				}
				// defaultValue={{ value: 1, label: 'test' }}
				isMulti={isMulti}
				name={name}
				options={options}
				// className="basic-multi-select"
				className={`basic-multi-select  ${error ? 'has-error' : ''} `}
				classNamePrefix="select"
				isDisabled={isDisabled}
				// value={values?.find((val) => val.value === value)}
				onChange={(item) => {
					if (isMulti) {
						onChange(item);
						setValues && setValues(item);
						setState && setState(item);
					} else {
						onChange(item.value);
						setItem && setItem(item);
						setValues && setValues(item.value);
						setState && setState(item.value);
					}
				}}
				onKeyDown={(e) => {
					// console.log('e', e);
					if (e.key === 'Delete') {
						onChange(null);
						setItem && setItem(null);
						setValues && setValues(null);
						setState && setState(null);
					}
				}}
				menuPlacement="auto" 
				menuPortalTarget={document.body}
				menuPosition="absolute"
				styles={stylesConfig}
			/>
			{error && (
				<div
					className={` mt-2 ${msgTooltip
							? ' inline-block bg-danger-500 text-white text-[10px] px-2 py-1 rounded'
							: ' text-danger-500 block text-sm'
						}`}
				>
					{error.message}
				</div>
			)}
		</div>
	);
};

export default SelectCustom;
