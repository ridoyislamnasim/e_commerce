import SelectBannerType from '@/components/shared/Select/SelectBannerType';
import SelectBranchType from '@/components/shared/Select/SelectBrand';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Fileinput from '@/components/ui/Fileinput';
import Textarea from '@/components/ui/Textarea';
import Textinput from '@/components/ui/Textinput';
import useSubmit from '@/hooks/useSubmit';
import {
	useCreateBannerMutation,
	useUpdateBannerMutation,
} from '@/store/api/app/Banner/bannerApiSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const BannerForm = ({ id, data }) => {
	const { isAuth, auth } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	const {
		register,
		unregister,
		control,
		errors,
		reset,
		handleSubmit,
		onSubmit,
		watch,
		isLoading,
	} = useSubmit(id, id ? useUpdateBannerMutation : useCreateBannerMutation);

	const handleFormSubmit = async (data) => {
		// Manipulate the data as needed
		const formData = new FormData();

		const keys = Object.keys(data);

		keys.forEach((key) => {
			if (['image'].includes(key)) {
				if (data[key]) {
					formData.append('image', data.image[0]);
				} else {
					formData.append('image', data.image);
				}
			} else {
				formData.append(key, data[key]);
			}
		});

		formData.append('created_admin_id', auth?.user?.user_info?.id);

		await onSubmit(formData);
	};

	useEffect(() => {
		reset({
			title: data?.title,
			details: data?.details,
			type: data?.type,
		});
	}, [data]);
	console.log("dats updated", data);
	console.log("dats updated", errors);
	return (
		<form onSubmit={handleSubmit(handleFormSubmit)}>
			<Card title={id ? 'Edit Banner' : 'Create New Banner'}>
				<div className="grid grid-cols-1 gap-5">

					<div>
						<SelectBannerType
							className="w-full"
							label="Select Banner Type"
							control={control}
							name="type"
							defaultValue={data?.type}
							required={true}
							error={errors?.type}
						/>

					</div>
					<Textinput
						register={register}
						label="Title"
						type="text"
						placeholder="Banner Title"
						name="title"
						required={true}
						error={errors?.title}
					/>

					<Textarea
						name="details"
						register={register}
						label="Details"
						type="textarea"
						placeholder="Banner Details"
						row={6}
					// required={true}
					// error={errors?.details}
					/>

					<Fileinput
						label="Banner Image"
						selectedFile={watch('image')?.[0]}
						name={'image'}
						preview={true}
						control={control}
						defaultUrl={data?.image}
						required={id ? false : true}
						error={errors.image}
					/>

				</div>

				<div className="ltr:text-right rtl:text-left space-x-3 rtl:space-x-reverse mt-6">
					<Button
						onClick={() => navigate(-1)}
						text="Cancel"
						className="btn-light"
					/>
					<Button
						isLoading={isLoading}
						type="submit"
						text="Save"
						className="btn-dark"
					/>
				</div>
			</Card>
		</form>
	);
};

export default BannerForm;
