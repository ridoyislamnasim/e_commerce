
import { Controller } from 'react-hook-form';
import ReactSelectError from './ReactSelectError';
import SelectCustom from './SelectCustom';
// import { useGetAreaByDistrictIdQuery } from '@/store/api/app/ApplicationSetting/Area/areaApiSlice';


const SelectPickupRunStatus = ({
    errors,
    control,
    setState,
    setItem,
    state,
    defaultValue,
    isMarked,
    isDisabled,
    name,
    branchId,
}) => {

    // const { data, isLoading } = useGetRiderByBranchIdQuery(branchId)

    const options = [
        {
            value: "",
            label: "Select Status",
        },
        {
            value: 1,
            label: "Run Create",
        },
        {
            value: 2,
            label: "Run Start",
        },
        {
            value: 3,
            label: "Run Cancel",
        },
        {
            value: 4,
            label: "Run Complete",
        },
    ]

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    return (
        <>
            <Controller
                name={name || 'run_status'}
                control={control}
                defaultValue={defaultValue}
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
                rules={{ required: 'Branch is required!' }}
            />
            <ReactSelectError errorName={errors?.[name ? name : 'run_status']} />
        </>
    );
};

export default SelectPickupRunStatus;
