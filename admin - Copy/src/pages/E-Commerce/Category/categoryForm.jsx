import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ColorPicker from "@/components/ui/ColorPicker";
// import ColorPicker from "@/components/ui/ColorPicker";
import Fileinput from "@/components/ui/Fileinput";
import Textinput from "@/components/ui/Textinput";
import useSubmit from "@/hooks/useSubmit";
import {
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
} from "@/store/api/app/Category/categoryApiSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CategoryForm = ({ id, data }) => {
	const { isAuth, auth } = useSelector((state) => state.auth);
	const [color, setColor] = useState("#000000");
	const navigate = useNavigate();

	const {
		register,
		unregister,
		control,
		errors,
		reset,
		setValue, // To update form values programmatically
		handleSubmit,
		onSubmit,
		watch,
	} = useSubmit(
		id,
		id ? useUpdateCategoryMutation : useCreateCategoryMutation
	);

	const handleFormSubmit = async (data) => {
		const formData = new FormData();
		Object.keys(data).forEach((key) => {
			if (key === "image" && data[key]) {
				formData.append("image", data[key][0]);
			} else {
				formData.append(key, data[key]);
			}
		});

		await onSubmit(formData);
	};

	useEffect(() => {
		if (data) {
			reset({
				name: data.name || "",
				// colorCode: data.colorCode || "#000000",
			});
		}
	}, [data, setValue]);



	return (
		<form onSubmit={handleSubmit(handleFormSubmit)}>
			<Card title={id ? "Edit Category" : "Create New Category"}>
				<div className="grid grid-cols-1 gap-5">
					{/* Category Name Input */}
					<Textinput
						register={register}
						label="Name"
						type="text"
						placeholder="Category Name"
						name="name"
						required={true}
						error={errors?.name}
					/>

					{/* Category Color Picker */}
					{/* <ColorPicker
						label="Pick a Category Color"
						defaultColor={data?.colorCode || "#000000"}
						setValue={setValue}
						suggestedColors={["#797E72", "#FFF3FF", "#FFFCEB", "#FEEFEA", "#E7EAF2", "#282828", "#FFFFFF"]}
						name="colorCode"
					/> */}



					{/* Image Input */}
					<Fileinput
					label="Category Image"
						selectedFile={watch("image")?.[0]}
						name={"image"}
						preview={true}
						control={control}
						defaultUrl={data?.image}
					/>
				</div>

				{/* Action Buttons */}
				<div className="ltr:text-right rtl:text-left space-x-3 rtl:space-x-reverse mt-6">
					<Button
						onClick={() => navigate(-1)}
						text="Cancel"
						className="btn-light"
					/>
					<Button type="submit" text="Save" className="btn-dark" />
				</div>
			</Card>
		</form>
	);
};

export default CategoryForm;
