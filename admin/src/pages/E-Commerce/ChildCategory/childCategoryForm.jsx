// import SelectChildCategoryType from '@/components/shared/Select/SelectChildCategoryType';
// import SelectBranchType from '@/components/shared/Select/SelectBranchType';
import SelectChildCategory from '@/components/shared/Select/SelectChildCategory';
import SelectSubCategory from '@/components/shared/Select/SelectSubCategory';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Fileinput from '@/components/ui/Fileinput';
import Textarea from '@/components/ui/Textarea';
import Textinput from '@/components/ui/Textinput';
import useSubmit from '@/hooks/useSubmit';
import {
	useCreateChildCategoryMutation,
	useUpdateChildCategoryMutation,
} from '@/store/api/app/ChildCategory/childCategoryApiSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ChildCategoryForm = ({ id, data }) => {
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
	} = useSubmit(id, id ? useUpdateChildCategoryMutation : useCreateChildCategoryMutation);

	const handleFormSubmit = async (data) => {
		console.log("dats updated", data);
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
			subCategoryRef: data?.subCategoryRef?._id,
		});
	}, [data]);

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)}>
			<Card title={id ? 'Edit ChildCategory' : 'Create New Child Category'}>
				<div className="grid grid-cols-1 gap-5">

					<div>
						<SelectSubCategory
							className="w-full"
							label="Select Sub Category"
							control={control}
							name="subCategoryRef"
							required={true}
							error={errors?.subCategoryRef}
							defaultValue={data?.subCategoryRef?._id}
						/>
					</div>
					<Textinput
						register={register}
						label="Name"
						type="text"
						placeholder="Child Category Name"
						name="name"
						required={true}
						error={errors?.name}
					/>

					<Fileinput
					label="Child Category Image"
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
						type="childmit"
						text="Save"
						className="btn-dark"
					/>
				</div>
			</Card>
		</form>
	);
};

export default ChildCategoryForm;
