import { Controller } from 'react-hook-form';
import ReactSelectError from './ReactSelectError';
import SelectCustom from './SelectCustom';
import useSubmit from '@/hooks/useSubmit';
import {  useUpdateOrderStatusMutation } from '@/store/api/app/Order/orderApiSlice';


const SelectOrderStatus = ({
    // errors,
    // control,
    setState,
    setItem,
    // state,
    defaultValue,
    isMarked,
    isDisabled,
    // name,
}) => {

    const options = [
        {
            value: "",
            label: "Select Order Status"
        },
        {
            value: 1,
            label: "Delivery Complete"
        },
        {
            value: 2,
            label: "Delivery Pending"
        },
        {
            value: 3,
            label: "Delivery Cancel"
        },
        {
            value: 4,
            label: "Payment Done"
        },
        {
            value: 5,
            label: "Payment Pending"
        },
        {
            value: 6,
            label: "Return Complete"
        },
        {
            value: 7,
            label: "Pickup Request"
        },
        {
            value: 8,
            label: "Branch Transfer"
        },
        {
            value: 9,
            label: "Branch Transfer Complete"
        },
        {
            value: 10,
            label: "Pickup Complete"
        },
        {
            value: 11,
            label: "Delivery Rider Complete Delivery"
        },
    ]

	const {
		register,
		unregister,
		control,
		errors,
		reset,
		handleSubmit,
		onSubmit,
		watch,
		setValue,
		isLoading,
	} = useSubmit( '', useUpdateOrderStatusMutation);

console.log("register", register);
console.log("setValue", setValue);

    return (
        <>
            <Controller
                name={name || 'parcel_status_id'}
                control={control}
                defaultValue={defaultValue}
                className="bg-amber-300"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <SelectCustom
                        isMarked={isMarked}
                        defaultValue={defaultValue}
                        options={options}
                        onChange={onChange}
                        setState={setState}
                        setItem={setItem}
                        isDisabled={isDisabled}
                    />
                )}
                rules={{ required: 'Status is required!' }}
            />
            <ReactSelectError errorName={errors?.[name ? name : 'parcel_status_id']} />
        </>
    );
};

export default SelectOrderStatus;
