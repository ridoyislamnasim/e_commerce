import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useSubmit = (id, hook, redirect) => {
	const navigate = useNavigate();

	const {
		register,
		unregister,
		control,
		formState: { errors },
		reset,
		handleSubmit,
		setValue,
		watch,
	} = useForm();

	const [submit, { isLoading, isSuccess, isError, error }] = hook();

	const onSubmit = async (preparedData) => {
		try {
			const  data  = await (id
				? submit({ id, data: preparedData })
				: submit(preparedData));
			console.log("data ===================", data)
			if (data?.data?.status !== 'success') {
				// console.log("data =================== ----", data)
				throw new Error(data?.error?.data?.message || 'Error occurred from server! -0000');
			}
			reset();
			if (redirect !== false) {
				navigate(redirect ? redirect : -1);
			}
			toast.success(data?.message);
		} catch (error) {
			// console.log("error--------", error);
			// console.log("error--------", error?.message);
			toast.error(error?.message || 'Something went wrong!');
		}
	};

	return {
		register,
		unregister,
		control,
		errors,
		reset,
		handleSubmit,
		watch,
		setValue,
		onSubmit,
		isLoading,
	};
};

export default useSubmit;
