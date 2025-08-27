import React, { Fragment } from "react";
import Icon from "@/components/ui/Icon";
import SelectBrand from "@/components/shared/Select/SelectBrand";
import SelectCategory from "@/components/shared/Select/SelectCategory";
import SelectDiscountType from "@/components/shared/Select/SelectDiscountType";
import SelectSubCategory from "@/components/shared/Select/SelectSubCategory";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ColorPicker from "@/components/ui/ColorPicker";
import DropZone from "@/components/ui/DropZone";
import FileinputMultiple from "@/components/ui/FileinputMultiple";
import { Tab, Disclosure, Transition } from "@headlessui/react";
// import ColorPicker from "@/components/ui/ColorPicker";
import Fileinput from "@/components/ui/Fileinput";
import Textarea from "@/components/ui/Textarea";
import Textinput from "@/components/ui/Textinput";
import useSubmit from "@/hooks/useSubmit";
import {
	useCreateProductMutation,
	useUpdateProductMutation,
} from "@/store/api/app/Product/productApiSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdOutlineInventory2 } from "react-icons/md";
import { PiBoundingBoxLight } from "react-icons/pi";
import { CgBox } from "react-icons/cg";
import FormRepeater from "@/components/ui/form-repeater";
import { toast } from "react-toastify";
import SelectChildCategory from "@/components/shared/Select/SelectChildCategory";
import SelectSubChildCategory from "@/components/shared/Select/SelectSubChildCategory";

const buttons = [
	{
		title: "Inventory",
		icon: MdOutlineInventory2,
		name: "inventory",
	},
	{
		title: "Color Inventory",
		icon: IoColorPaletteOutline,
		name: "colorInventory",
	},
	{
		title: "Level Inventory",
		icon: PiBoundingBoxLight,
		name: "levelInventory",
	},
	{
		title: "Color Level Inventory",
		icon: CgBox,
		name: "colorLevelInventory",
	},
];

const ProductForm = ({ id, data }) => {
	const { isAuth, auth } = useSelector((state) => state.auth);
	const [color, setColor] = useState("#000000");
	// const [selectedFiles, setSelectedFiles] = useState([]);
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [activeTabName, setActiveTabName] = useState(buttons[0].name); // Track active tab title

	const navigate = useNavigate();
	useEffect(() => {

	}, [data]);
	console.log("---------------------------", activeTabName)

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
		id ? useUpdateProductMutation : useCreateProductMutation
	);
	//  ----------------------------------------------------------------
	const warehousePrice = watch("warehousePrice");
	const warehouseProfit = watch("warehouseProfit");
	const wholesalePrice = watch("wholesalePrice");
	const wholesaleProfit = watch("wholesaleProfit");
	const mrpPrice = watch("mrpPrice");
	const discountType = watch("discountType");
	const discount = watch("discount");
	const sellPrice = watch("sellPrice");

	useEffect(() => {
		if (warehousePrice && !isNaN(warehousePrice)) {
			setValue("wholesalePrice", warehousePrice);
			setValue("mrpPrice", warehousePrice);
		}
	}, [warehousePrice, setValue]);

	useEffect(() => {
		if (warehousePrice && warehouseProfit) {
			const profitedPrice = Number(warehousePrice) + Number((warehousePrice * warehouseProfit) / 100);
			setValue("wholesalePrice", Math.round(profitedPrice));
			setValue("mrpPrice", Math.round(profitedPrice));
		}
	}, [warehouseProfit, warehousePrice, setValue]);

	useEffect(() => {
		if (wholesaleProfit && wholesalePrice) {
			const profitedPrice = wholesalePrice * (1 + wholesaleProfit / 100);
			setValue("mrpPrice", Math.round(profitedPrice));
		} else if (wholesalePrice) {
			setValue("mrpPrice", wholesalePrice);
		}
	}, [wholesaleProfit, wholesalePrice, setValue]);
	useEffect(() => {
		console.log("discountType", discountType);
		if (discountType == '') {
			console.log("mrpPrice", mrpPrice);
			setValue("sellPrice", mrpPrice);
		} else if (mrpPrice && discount) {
			const sellPrice = discountType == 'percent' ? mrpPrice * (1 - discount / 100) : mrpPrice - discount;
			setValue("sellPrice", Math.round(sellPrice));
		}
		// else if(wholesalePrice){
		//     setValue("sellPrice", wholesalePrice);
		// }
	}, [mrpPrice, discountType, discount, setValue]);
	//  ----------------------------------------------------------------
	const handleFormSubmit = async (data) => {
		// formData.activeTabName = activeTabName;

		console.log("data ========== jjjj", data);
		console.log("data ========== jjjj", selectedFiles);
		if (['colorInventory', 'levelInventory', 'colorLevelInventory'].includes(activeTabName) && !data?.inventoryArray?.length) {
			toast.error("Please Add Your Inventory");
			return;
		}

		if (activeTabName === "colorLevelInventory" && data.inventoryArray.some(item => !item?.colorLevel?.length)) {
			toast.error("Please Add All Levels and Quantities");
			return;
		}
		const formData = new FormData();
		formData.append("inventoryType", activeTabName);
		formData.append("warehouseRef", auth?.user?.warehouseRef);
		console.log("data =", data?.inventoryArray)
		console.log("data =", data?.inventoryArray?.length)

		Object.keys(data).forEach((key) => {
			if (["images", "thumbnailImage", "backViewImage"].includes(key) && data[key]) {
				// formData.append(key, data[key][0]); // Append the first file if it exists
				if (Array.isArray(data[key])) {
					data[key].forEach((file, index) => {
						formData.append(`${key}[${index}]`, file); // Append each file with a unique key
					});
				} else {
					// Handle single file (e.g., "thumbnailImage", "backViewImage")
					formData.append(key, data[key][0]);
				}
			} else {
				if (key == "inventoryArray") {
					formData.append("inventoryArray", JSON.stringify(data.inventoryArray));
				} else {
					formData.append(key, data[key]);
				}
			}
		});
		console.log("data 676576", data?.inventoryArray?.length)
		await onSubmit(formData);
	};

	useEffect(() => {
		if (data?.inventoryRef?.inventoryType) {
			const matchedTab = buttons.find(
				(button) => button.name === data.inventoryRef.inventoryType
			);
			if (matchedTab) {
				setActiveTabName(matchedTab.name);
			}
		}
		if (data) {
			reset({
				name: data.name || "",
				description: data.description || "",
				discountType: data.discountType || "",
				mrpPrice: data.mrpPrice || "",
				videoUrl: data.videoUrl || "",
				freeShipping: data.freeShipping || "",
				brandRef: data.brandRef?._id || "",
				categoryRef: data.categoryRef?._id || "",
				subCategoryRef: data.subCategoryRef?._id || "",
				childCategoryRef: data.childCategoryRef?._id || "",
				subChildCategoryRef: data.subChildCategoryRef?._id || "",
				inventory: data.inventoryRef?.quantity || "",
				warehousePrice: data.warehousePrice || "",
				warehouseProfit: data.warehouseProfit || "",
				wholesalePrice: data.wholesalePrice || "",
				wholesaleProfit: data.wholesaleProfit || "",
			});
		}
	}, [data, setValue]);
	const handleFileChangeMultiple = (e) => {
		// console.log("=============e", e.target.files);
		const files = e.target.files;
		const filesArray = Array.from(files).map((file) => file);
		setSelectedFiles(filesArray);
	};
	const handleFileChange = (files) => {
		setSelectedFiles(files);
	};
	// console.log("selectedFiles ====================", selectedFiles);
	console.log("error ====================", errors);
	// console.log("Product setValue", setValue);

	const thumbnailImage = watch("thumbnailImage")?.[0];
	const backViewImage = watch("backViewImage")?.[0];

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)}>
			<Card title={id ? "Edit Product" : "Create New Product"}>
				<div className="grid grid-cols-1 gap-5">
					{/* Product Name Input */}
					<Textinput
						register={register}
						label="Name"
						type="text"
						placeholder="Product Name"
						name="name"
						required={true}
						error={errors?.name}
					/>
					<Textarea
						register={register}
						label="Description"
						type="description"
						placeholder="Product Name"
						name="description"
						required={true}
						error={errors?.description}
					/>
					<SelectDiscountType
						label="Select Discount Type"
						control={control}
						name="discountType"
						// required={true}
						// error={errors?.discountType}
						defaultValue={data?.discountType}
					/>
					{discountType && (
						<>
							<Textinput
								register={register}
								label="Discount Amount"
								type="number"
								placeholder="Discount Amount"
								name="discount"
								required={true}
								error={errors?.discount}
								defaultValue={data?.discount}
							/>
						</>
					)}
					<div className="flex   flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
						<Textinput
							register={register}
							label="Warehouse Price"
							type="number"
							placeholder="Product Price"
							required={true}
							name="warehousePrice"
							error={errors?.warehousePrice}
						/>
						<Textinput
							register={register}
							label="Warehouse  Profit (%)"
							type="number"
							placeholder="Product Profit"
							required={true}
							name="warehouseProfit"
							error={errors?.warehouseProfit}
						/>
					</div>
					<div className="flex   flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
						<Textinput
							register={register}
							label="wholesale  Price"
							type="number"
							placeholder="Product Price"
							required={true}
							name="wholesalePrice"
							error={errors?.wholesalePrice}
						/>
						<Textinput
							register={register}
							label="wholesale  Profit (%)"
							type="number"
							placeholder="Product Profit"
							required={true}
							name="wholesaleProfit"
							error={errors?.wholesaleProfit}
						/>
					</div>

					<Textinput
						register={register}
						label="MRP Price"
						type="number"
						placeholder="Product MRP Price"
						required={true}
						name="mrpPrice"
						error={errors?.mrpPrice}
					/>
					<Textinput
						register={register}
						label="Sell Price"
						type="number"
						placeholder="Product Sell Price"
						disabled={true}
						name="sellPrice"
						error={errors?.sellPrice}
					/>
					<div className="flex   flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
						<SelectCategory
							className="w-full"
							label="Select Category"
							control={control}
							name="categoryRef"
							required={true}
							error={errors?.categoryRef}
							defaultValue={data?.categoryRef?._id}
						/>
						<SelectSubCategory
							className="w-full"
							label="Select Sub Category"
							control={control}
							name="subCategoryRef"
							// required={true}
							// error={errors?.subCategoryRef}
							defaultValue={data?.subCategoryRef?._id}
						/>
						<SelectChildCategory
							className="w-full"
							label="Select Child Category"
							control={control}
							name="childCategoryRef"
							// required={true}
							// error={errors?.subCategoryRef}
							defaultValue={data?.childCategoryRef?._id}
						/>

					</div>
					<div className="flex   flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
						<SelectSubChildCategory
							className="w-full"
							label="Select Sub Child Category"
							control={control}
							name="subChildCategoryRef"
							// required={true}
							// error={errors?.subCategoryRef}
							defaultValue={data?.subChildCategoryRef?._id}
						/>
						<SelectBrand
							className="w-full"
							label="Select Brand"
							control={control}
							name="brandRef"
							// required={true}
							// error={errors?.brandRef}
							defaultValue={data?.brandRef?._id}
						/>
					</div>
					{/* Free Shipping
					<div>
						<label className="block text-sm font-medium">Free Shipping</label>
						<input
							{...register('freeShipping')}
							type="checkbox"
							className="mt-1"
						/>
					</div> */}

					<div className="flex   flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
						<Fileinput
							label="Thumbnail Image"
							selectedFile={thumbnailImage}
							name={"thumbnailImage"}
							preview={true}
							control={control}
							defaultUrl={data?.thumbnailImage}
							required={id ? false : true}
							error={errors.thumbnailImage}
						/>
						<Fileinput
							label="Back View Image"
							selectedFile={backViewImage}
							name={"backViewImage"}
							preview={true}
							control={control}
							defaultUrl={data?.backViewImage}
						/>

					</div>
					{/* onChange={handleFileChangeMultiple} */}
					<FileinputMultiple
						label="Selete More Image"
						selectedFiles={selectedFiles}
						name={"images"}

						control={control}
						defaultFiles={data?.images}
						multiple
						preview
					/>

					{/* <Card title="Product Inventory" className="mt-6" bgColor="bg-cardBg" > */}
					{!id && <Tab.Group
						selectedIndex={buttons.findIndex((button) => button.name === activeTabName)}
						onChange={(index) => setActiveTabName(buttons[index].name)}
					>
						<Tab.List className="lg:space-x-8 md:space-x-4 space-x-0 rtl:space-x-reverse ">
							{buttons.map((item, i) => (
								<Tab as={Fragment} key={i}>
									{({ selected }) => (
										<button
											className={`inline-flex items-start text-sm font-medium mb-7 capitalize bg-white dark:bg-slate-800 ring-0 focus:ring-0 focus:outline-none px-2 transition duration-150 relative before:transition-all before:duration-150 before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-primary-500 before:-translate-x-1/2 ${selected
												? "text-primary-500 before:w-full"
												: "text-slate-500 before:w-0 dark:text-slate-300"
												}`}
										>
											<span className="text-base relative top-[1px] ltr:mr-1 rtl:ml-1">
												<item.icon />
											</span>
											{item.title}
										</button>
									)}
								</Tab>
							))}
						</Tab.List>
						<Tab.Panels>
							<Tab.Panel>
								<div className="text-slate-600 flex gap-5 dark:text-slate-400 text-sm font-normal">
									<Textinput
										register={register}
										label="Inventory"
										type="number"
										placeholder="Inventory"
										name="inventory"
										required={true}
										error={errors?.inventory}
									/>
									<Textinput
										register={register}
										label="Barcode"
										type="text"
										placeholder="Barcode"
										name="barcode"
									//  required={true}
									//  error={errors?.barcode}
									/>
								</div>
							</Tab.Panel>
							<Tab.Panel>
								<div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
									<FormRepeater
										register={register}
										control={control}
										setValue={setValue}
										// level={true}
										color={true}
										error={errors}
										defaultValue={data?.inventoryRef?.variants}
									/>
								</div>
							</Tab.Panel>
							<Tab.Panel>
								<div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
									<FormRepeater
										register={register}
										control={control}
										setValue={setValue}
										level={true}
										error={errors}
										// color={true}
										defaultValue={data?.inventoryRef?.variants}
									/>
								</div>
							</Tab.Panel>
							<Tab.Panel>
								<div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
									<FormRepeater
										register={register}
										control={control}
										setValue={setValue}
										level={true}
										color={true}
										error={errors}
										defaultValue={data?.inventoryRef?.variants}
									/>
								</div>
							</Tab.Panel>
						</Tab.Panels>
					</Tab.Group>

					}
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

export default ProductForm;




