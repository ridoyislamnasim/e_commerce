
// import { Controller } from 'react-hook-form';
// import SelectCustom from './SelectCustom';
// import ReactSelectError from './ReactSelectError';

// const SelectBannerType = ({ errors, control, setState, defaultValue }) => {
// 	const options = [
// 		{
// 			value: "MAIN BANNER",
// 			label: 'MAIN BANNER',
// 		},
// 		{
// 			value: "CATEGORY BANNER",
// 			label: 'CATEGORY BANNER',
// 		},
// 		{
// 			value: "BEST SALE BANNER",
// 			label: 'BEST SALE BANNER',
// 		},
// 		{
// 			value: "NEWSLETTER BANNER",
// 			label: 'NEWSLETTER BANNER',
// 		},
// 		{
// 			value: "SHOP BANNER",
// 			label: 'SHOP BANNER',
// 		},
// 		{
// 			value: "PROMO BANNER",
// 			label: 'PROMO BANNER',
// 		},
// 	];

// 	return (
// 		<>
// 			<Controller
// 				name="type"
// 				control={control}
// 				defaultValue={defaultValue}
// 				render={({ field: { onChange, onBlur, value, ref } }) => (
// 					<SelectCustom
// 						defaultValue={defaultValue}
// 						options={options}
// 						onChange={onChange}
// 						setState={setState}
// 					/>
// 				)}
// 				rules={{ required: 'Banner type is required' }}
// 			/>
// 			<ReactSelectError errorName={errors?.type} />
// 		</>
// 	);
// };

// export default SelectBannerType;





import { Controller } from 'react-hook-form';
import ReactSelectError from './ReactSelectError';
import SelectCustom from './SelectCustom';

const SelectBannerType = ({
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

	console.log('SelectChildCategory', error)
	console.log('SelectChildCategory', defaultValue)
	const options = [
		{
			value: "",
			label: 'Select a Brand',
		},
		{
			value: "MAIN BANNER",
			label: 'MAIN BANNER',
		},
		// {
		// 	value: "CATEGORY BANNER",
		// 	label: 'CATEGORY BANNER',
		// },
		// {
		// 	value: "BEST SALE BANNER",
		// 	label: 'BEST SALE BANNER',
		// },
		// {
		// 	value: "NEWSLETTER BANNER",
		// 	label: 'NEWSLETTER BANNER',
		// },
		// {
		// 	value: "SHOP BANNER",
		// 	label: 'SHOP BANNER',
		// },
		// {
		// 	value: "PROMO BANNER",
		// 	label: 'PROMO BANNER',
		// },
	];
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
				rules={{ required: required ? 'banner is required!' : false }}
				// rules={{ required: false }}

			/>
			{/* <ReactSelectError errorName={error?.[name ? name : 'type']} /> */}
		</div>
	);
};

export default SelectBannerType;


