import SelectCategory from '@/components/shared/Select/SelectCategory';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Fileinput from '@/components/ui/Fileinput';
import Textarea from '@/components/ui/Textarea';
import Textinput from '@/components/ui/Textinput';
import useSubmit from '@/hooks/useSubmit';
import {
	useCreateSubCategoryMutation,
	useUpdateSubCategoryMutation,
} from '@/store/api/app/SubCategory/subCategoryApiSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SubCategoryForm = ({ id, data }) => {
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
	} = useSubmit(id, id ? useUpdateSubCategoryMutation : useCreateSubCategoryMutation);

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
			name: data?.name,
			categoryRef: data?.categoryRef?._id,
		});
	}, [data]);
	console.log("dats updated", data);
	return (
		<form onSubmit={handleSubmit(handleFormSubmit)}>
			<Card title={id ? 'Edit SubCategory' : 'Create New SubCategory'}>
				<div className="grid grid-cols-1 gap-5">

					<div>
						<SelectCategory
							className="w-full"
							label="Select Category"
							control={control}
							name="categoryRef"
							required={true}
							error={errors?.categoryRef}
							defaultValue={data?.categoryRef?._id}
						/>
					</div>
					<Textinput
						register={register}
						label="Name"
						type="text"
						placeholder="SubCategory Name"
						name="name"
						required={true}
						error={errors?.name}
					/>
					<Fileinput
					label="SubCategory Image"
						selectedFile={watch('image')?.[0]}
						name={'image'}
						defaultUrl={data?.image}
						preview={true}
						control={control}
					// required={true}
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

export default SubCategoryForm;
