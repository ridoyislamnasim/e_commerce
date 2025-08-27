"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MoreHorizontal,
  Upload as LucideUpload,
  Paperclip,
  FileUp,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { confirmation } from "@/components/modals/confirm-modal";
import { BASE_URL } from "@/config/config";
import { Upload, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { fileUrlGenerator, humanFileSize, makeFormData } from "@/utils/helpers";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { getFormSchema } from "./form-schema";
import { createSubCategory, updateSubCategory } from "@/services/subCategory";
import { Modal } from "antd";
import { FormDropdown } from "@/components/ui/FormDropdown";
import { getAllCategory } from "@/services/category";
import { getAllSubCategory } from "@/services/subCategory";
import { Tooltip } from "antd";
import dynamic from "next/dynamic";
import { Trash2 } from "lucide-react";
import { SketchPicker } from "react-color";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

// Extend TCategory and TSubCategory types to include 'id'
interface TCategory {
  id: string;
  name: string;
  // ...other properties
}

// Resolve type conflicts and add missing properties to TSubCategory
interface TSubCategory {
  id: string;
  name: string;
  slug?: string;
  categoryRefId?: string;
  subCategoryRefId?: string;
  // ...other properties
}

interface Props {
  item?: TProduct;
  mode: "create" | "edit";
  onSubmit: (data: FormData) => Promise<void>;
  children?: React.ReactNode; // Add this line
}

export const MasterForm: React.FC<Props> = ({ item, mode, onSubmit, children }) => {
  console.debug("MasterForm item:", item); // Log the item for debugging
  console.log("master form item:", item);

  const { toast } = useToast();
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [viewImageModalOpen, setViewImageModalOpen] = useState(false);
  const [updating, setUpdating] = React.useState(false);
  const [categoryRef, setCategoryRef] = React.useState<string | null>(null); // Add state for categoryRef

  // Removed the imageFileList state and related logic

  // Add individual states for each image field
  const [thumbnailImageFileList, setThumbnailImageFileList] = useState<UploadFile<any>[]>([]);
  const [backViewImageFileList, setBackViewImageFileList] = useState<UploadFile<any>[]>([]);
  const [imagesFileList, setImagesFileList] = useState<UploadFile<any>[]>([]);

  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [subCategories, setSubCategories] = useState<{ id: string; name: string }[]>([]);

  // Add inventoryType dropdown and dynamic input fields
  const [inventoryType, setInventoryType] = useState<string>("inventory");
  const [inventoryData, setInventoryData] = useState<any[]>([]);



  const isUpdate = !!item?.slug; // Determine if it's an update based on the presence of slug
  const formSchema = z.object({
    name: z.string().nonempty("Name is required."),
    categoryRefId: z.string().nonempty("Category is required."),
    subCategoryRefId: z.string().nonempty("SubCategory is required."),
    publishStatus: z.enum(["Publish", "Preview", "ComingSoon"]),
    status: z.boolean(),
    isDiscounted: z.boolean(),
    thumbnailImage: z.string().nonempty("Thumbnail image is required."),
    images: z.array(z.string()).optional(),
    freeShipping: z.boolean(),
    description: z.string().nonempty("Description is required."),
    discountType: z.enum(["percent", "fixed"]),
    discount: z.number().min(0, "Discount must be at least 0."),
    inventoryType: z.string().nonempty("Inventory type is required."),
    inventoryArray: z.array(z.any()).optional(),
    gender: z.string().optional(), // Added gender
    weight: z.string().optional(), // Added weight
    backViewImage: z.string().optional(), // Added backViewImage
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item?.name || "",
      categoryRefId: item?.categoryRefId ? String(item.categoryRefId) : "", // Ensure type matches schema
      subCategoryRefId: item?.subCategoryRefId ? String(item.subCategoryRefId) : "", // Ensure type matches schema
      publishStatus: item?.publishStatus || "Publish",
      status: item?.status ?? true, // Provide a default status (true/false as per your logic)
      isDiscounted: item?.isDiscounted || false,
      thumbnailImage: item?.thumbnailImage || "",
      images: item?.images || [], // Provide an empty array if no images
      freeShipping: item?.freeShipping || false,
      description: item?.description || "",
      discountType: item?.discountType || "percent",
      discount: item?.discount || 0,
      inventoryType: item?.inventoryType || inventoryType, // Add this line to provide the required field
      inventoryArray: item?.inventories || [],
      gender: item?.gender || "", // Added gender
      weight: item?.weight || "", // Added weight
      backViewImage: item?.backViewImage || "", // Added backViewImage
    } as z.infer<typeof formSchema>,
  });

  console.log("Form default values:", form.getValues()); // Log the default values for debugging
  console.log("Form schema:", item?.inventoryType); // Log the form schema for debugging

    // When form opens or resets, sync inventoryData from form's inventoryArray
  React.useEffect(() => {
    if (form.formState.isSubmitted || sheetOpen) {
      const formArray = form.getValues("inventoryArray");
      if (Array.isArray(formArray)) {
        setInventoryData(formArray);
      }
    }
  }, [sheetOpen, form.formState.isSubmitted]);

  // Always keep form's inventoryArray in sync with inventoryData
  React.useEffect(() => {
    form.setValue("inventoryArray", inventoryData, { shouldValidate: true });
  }, [inventoryData]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategory();
        const formattedCategories = response.data.map((category: { id: string; name: string }) => ({
          id: category.id.toString(),
          name: category.name,
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchSubCategories = async () => {
      try {
        const response = await getAllSubCategory();
        const formattedSubCategories = response.data.map((subCategory: { id: string; name: string }) => ({
          id: subCategory.id.toString(),
          name: subCategory.name,
        }));
        setSubCategories(formattedSubCategories);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchCategories();
    fetchSubCategories();
  }, []);

  const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!categoryRef) {
      toast({
        title: "Error",
        description: "Category is required. rrrr",
      });
      return;
    }
    try {
      setUpdating(true);
      const formData = new FormData();

      // Append all form fields to FormData
      formData.append("name", data.name);
      formData.append("categoryRef", categoryRef);
      // Append inventoryArray as JSON string
      formData.append("inventoryArray", JSON.stringify(data.inventoryArray || []));

      // Always require and append thumbnailImage
      if (!data.thumbnailImage) {
        throw new Error("Thumbnail image is required.");
      }
      formData.append(
        "thumbnailImage",
        Array.isArray(data.thumbnailImage) ? data.thumbnailImage[0] : data.thumbnailImage
      );

      // Optionally append backViewImage if present
      if (data.backViewImage && ((data.backViewImage as any) instanceof File)) {
        formData.append("backViewImage", data.backViewImage);
      }

      // Optionally append images if present and is array
      if (Array.isArray(data.images) && data.images.length > 0) {
        (Array.isArray(data.images) ? data.images : []).forEach((img) => {
          if (img && (img as any) instanceof File) {
            formData.append("images", img);
          }
        });
      }

      if (item?.slug) {
        formData.append("slug", item.slug);
      }
      await onSubmit(formData);
      toast({ title: item?.slug ? "SubCategory updated" : "SubCategory created" });
      setSheetOpen(false);
      form.reset({ name: "", images: [] });
      setCategoryRef(null);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      });
    } finally {
      setUpdating(false);
    }
  };

  // Update inventory fields to remove 'barcode', add 'has', and allow row removal
  const handleAddInventory = () => {
    const newEntry =
      inventoryType === "inventory"
        ? { quantity: "", mrpPrice: "", costPrice: "" }
        : inventoryType === "colorInventory"
        ? { color: "", quantity: "", colorCode: "", mrpPrice: "", costPrice: "" }
        : inventoryType === "levelInventory"
        ? { level: "", quantity: "", costPrice: "" }
        : { level: "", color: "", colorCode: "", quantity: "", mrpPrice: "", costPrice: "" }; // Added `mrpPrice` field for colorlevelInventory

    setInventoryData([...inventoryData, newEntry]);
  };

  const handleRemoveInventory = (index: number) => {
    const updatedData = inventoryData.filter((_, i) => i !== index);
    setInventoryData(updatedData);
  };

  const handleInventoryChange = (index: number, field: string, value: string) => {
    const updatedData = [...inventoryData];
    // List of fields that should be numbers
    const numberFields = ["quantity", "mrpPrice", "costPrice", "mrpPrice", "level"];
    if (numberFields.includes(field)) {
      updatedData[index][field] = value === "" ? "" : Number(value);
    } else {
      updatedData[index][field] = value;
    }
    setInventoryData(updatedData);
  };

  const renderInventoryFields = () => {
    return inventoryData.map((entry: any, index: number) => (
      <div key={index} className="grid grid-cols-12 gap-2 items-center mb-4 ">
        {Object.keys(entry).filter((key) => key !== "showPicker").map((key: string) => (
          key === "colorCode" ? (
            <div key={key} className="relative center ">
              <div
                className="w-8 h-8 border rounded cursor-pointer"
                style={{ backgroundColor: entry[key] || "#ffffff" }}
                onClick={() => {
                  const updatedData = [...inventoryData];
                  updatedData[index].showPicker = true;
                  setInventoryData(updatedData);
                }}
              ></div>
              {entry.showPicker && (
                <div className="absolute z-10 col-span-6">
                  <SketchPicker
                    color={entry[key] || "#ffffff"}
                    onChangeComplete={(color: { hex: string }) => {
                      const updatedData = [...inventoryData];
                      updatedData[index][key] = color.hex;
                      updatedData[index].showPicker = false;
                      setInventoryData(updatedData);
                    }}
                    disableAlpha // Disable alpha slider
                    presetColors={[]} // Remove preset colors to avoid extra UI
                    styles={{
                      default: {
                        picker: {
                          boxShadow: "none",
                        },
                      },
                    }}
                  />
                </div>
              )}
            </div>
          ) : (
            <Input
              key={key}
              placeholder={key}
              value={entry[key]}
              onChange={(e) => handleInventoryChange(index, key, e.target.value)}
              className="border rounded px-2 py-1 col-span-2"
            />
          )
        ))}
        <Button
          type="button"
          onClick={() => handleRemoveInventory(index)}
          className="bg-red-500 text-white px-2 py-1 rounded flex items-center justify-center"
        >
          <Trash2 size={18} />
        </Button>
      </div>
    ));
  };
  // Remove extra console logs

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        {children || (
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-white hover:border hover:text-black">
            {item?.slug ? "Edit SubCategory" : "Add SubCategory"}
          </button>
        )}
      </SheetTrigger>
      <SheetContent className="sm:max-w-[750px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle> {item?.slug  ? "Edit SubCategory" : "Create SubCategory"}</SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="grid grid-cols-2 gap-4 items-end py-4"
          >
{/* name  */}
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Product Name <b className="text-red-500">*</b>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the product name (e.g., Stylish T-Shirt)" {...field} />
                    </FormControl>
                    <FormDescription className="text-red-400 text-xs min-h-4">
                      {form.formState.touchedFields.name ? undefined : (form.formState.errors.name?.message || "This field is required.")}
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
            {/* description */}
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Description <b className="text-red-500">*</b>
                    </FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        placeholder="Enter product description"
                        className="border rounded px-2 py-1 w-full"
                        rows={4}
                      />
                    </FormControl>
                    <FormDescription className="text-red-400 text-xs min-h-4">
                      {form.formState.touchedFields.description ? undefined : form.formState.errors.description?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>

            {/* Replace with FormDropdown */}
            <div className="col-span-1">
              <FormLabel>
                Category <b className="text-red-500">*</b>
              </FormLabel>
              <FormDropdown
                name="categoryRefId"
                control={form.control}
                data={categories}
                placeholder="Select a category"
                rules={{ required: "Category is required." }}
                onChange={(value: string) => setCategoryRef(value)}
                defaultSelectedValue={item?.categoryRefId || undefined}
              />
              {form.formState.errors.categoryRefId && !form.formState.touchedFields.categoryRefId && (
                <div className="text-red-400 text-xs min-h-4">
                  {form.formState.errors.categoryRefId.message}
                </div>
              )}
            </div>

            <div className="col-span-1">
              <FormLabel>
                SubCategory <b className="text-red-500">*</b>
              </FormLabel>
              <FormDropdown<z.infer<typeof formSchema>>
                name="subCategoryRefId"
                control={form.control}
                data={subCategories}
                placeholder="Select a subcategory"
                rules={{ required: "SubCategory is required." }} 
                onChange={(value: string) => form.setValue("subCategoryRefId", value)}
                defaultSelectedValue={item?.subCategoryRefId || undefined}
              />
            </div>

            <div className="col-span-1">
              <FormField
                control={form.control}
                name="publishStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Publish Status <b className="text-red-500">*</b>
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="border rounded px-2 py-1 w-full"
                      >
                        <option value="Publish">Publish</option>
                        <option value="Preview">Preview</option>
                        <option value="ComingSoon">Comming Soon</option>
                      </select>
                    </FormControl>
                    <FormDescription className="text-red-400 text-xs min-h-4">
                      {form.formState.touchedFields.publishStatus ? undefined : form.formState.errors.publishStatus?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1">
              <FormField
                control={form.control}
                name="freeShipping"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Free Shipping <b className="text-red-500">*</b>
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="border rounded px-2 py-1 w-full"
                        value={field.value ? "true" : "false"} // Convert boolean to string
                        onChange={(e) => field.onChange(e.target.value === "true")} // Convert string back to boolean
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </FormControl>
                    <FormDescription className="text-red-400 text-xs min-h-4">
                      {form.formState.touchedFields.freeShipping ? undefined : form.formState.errors.freeShipping?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>


{/* discount type*/}
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="discountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Discount Type <b className="text-red-500">*</b>
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="border rounded px-2 py-1 w-full"
                      >
                        <option value="percent">Percent</option>
                        <option value="fixed">Fixed</option>
                      </select>
                    </FormControl>
                    <FormDescription className="text-red-400 text-xs min-h-4">
                      {form.formState.touchedFields.discountType ? undefined : form.formState.errors.discountType?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
{/* discount amount */}
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Discount <b className="text-red-500">*</b>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        placeholder="Enter discount value"
                      />
                    </FormControl>
                    <FormDescription className="text-red-400 text-xs min-h-4">
                      {form.formState.touchedFields.discount ? undefined : form.formState.errors.discount?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>


                        <div className="col-span-1">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Gender
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="border rounded px-2 py-1 w-full"
                      >
                        <option value="">Select Gender</option>
                        <option value="Man">Man</option>
                        <option value="Woman">Woman</option>
                      </select>
                    </FormControl>
                    <FormDescription className="text-red-400 text-xs min-h-4">
                      {form.formState.touchedFields.gender ? undefined : form.formState.errors.gender?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Weight (kg)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        placeholder="Enter weight"
                        className="border rounded px-2 py-1 w-full"
                      />
                    </FormControl>
                    <FormDescription className="text-red-400 text-xs min-h-4">
                      {form.formState.touchedFields.weight ? undefined : form.formState.errors.weight?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>


{/* inventory type   */}
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="inventoryType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Inventory Type <b className="text-red-500">*</b>
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="border rounded px-2 py-1 w-full"
                        onChange={e => {
                          field.onChange(e.target.value);
                          setInventoryType(e.target.value);
                          setInventoryData([]);
                        }}
                      >
                        <option value="inventory">Inventory</option>
                        <option value="colorInventory">Color Inventory</option>
                        <option value="levelInventory">Level Inventory</option>
                        <option value="colorlevelInventory">Color Level Inventory</option>
                      </select>
                    </FormControl>
                    {form.formState.errors.inventoryType && !form.formState.touchedFields.inventoryType && (
                      <div className="text-red-400 text-xs min-h-4">
                        {form.formState.errors.inventoryType.message}
                      </div>
                    )}
                  </FormItem>
                )}
              />
            </div>
{/* inventory details */}
            <div className="col-span-2">
              <FormLabel>
                Inventory Details <b className="text-red-500">*</b>
              </FormLabel>
              <div>
                {renderInventoryFields()}
              </div>
              {form.formState.errors.inventoryArray && !form.formState.touchedFields.inventoryArray && (
                <div className="text-red-400 text-xs min-h-4">
                  {form.formState.errors.inventoryArray.message}
                </div>
              )}
              <Button
                type="button"
                onClick={handleAddInventory}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add More
              </Button>
            </div>



            <div className="col-span-1">
              <FormField
                control={form.control}
                name="thumbnailImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Thumbnail Image <b className="text-red-500">*</b>
                    </FormLabel>
                    <FormControl>
                      <Upload
                        listType="picture-card"
                        beforeUpload={() => false}
                        fileList={thumbnailImageFileList}
                        onChange={({ fileList }) => {
                          const latestFile = fileList.slice(-1);
                          setThumbnailImageFileList(latestFile);
                          const rawFile = latestFile[0]?.originFileObj;
                          field.onChange(rawFile || null);
                        }}
                      >
                        <div>
                          <UploadOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      </Upload>
                    </FormControl>
                    <FormDescription className="text-red-400 text-xs min-h-4">
                      {form.formState.touchedFields.thumbnailImage ? undefined : form.formState.errors.thumbnailImage?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>

            {/* Update the back view image field */}
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="backViewImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Back View Image <b className="text-red-500">*</b>
                    </FormLabel>
                    <FormControl>
                      <Tooltip title="Upload a back view image for the product">
                        <div>
                          <Upload
                            listType="picture-card"
                            beforeUpload={() => false}
                            fileList={backViewImageFileList}
                            onChange={({ fileList }) => {
                              const latestFile = fileList.slice(-1);
                              setBackViewImageFileList(latestFile);
                              const rawFile = latestFile[0]?.originFileObj;
                              field.onChange(rawFile || null);
                            }}
                          >
                            <div>
                              <UploadOutlined />
                              <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                          </Upload>
                        </div>
                      </Tooltip>
                    </FormControl>
                    <FormDescription className="text-red-400 text-xs min-h-4">
                      {form.formState.touchedFields.backViewImage ? undefined : form.formState.errors.backViewImage?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>

            {/* Update the multiple images field */}
            <div className="col-span-2">
              <Label>
                Images <b className="text-red-500">*</b>
              </Label>
              <Tooltip title="Upload multiple images for the product">
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <div>
                      <Upload
                        listType="picture-card"
                        beforeUpload={() => false}
                        multiple
                        fileList={imagesFileList}
                        onChange={({ fileList }) => {
                          setImagesFileList(fileList);
                          const rawFiles = fileList.map((file) => file.originFileObj).filter(Boolean);
                          field.onChange(rawFiles);
                        }}
                      >
                        <div>
                          <UploadOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      </Upload>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {imagesFileList.map((file, index) => (
                          <Image
                            key={index}
                            src={file.url || ""}
                            alt={`Image Preview ${index + 1}`}
                            width={100}
                            height={100}
                            className="border rounded"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                />
              </Tooltip>
            </div>


            <div className="col-span-2 flex gap-3 mt-4">
              <Button
                type="submit"
                variant="default"
                style={{ backgroundColor: "#19B6C9", color: "white" }}
                loading={updating}
              >
                {item?.slug ? "Update Product" : "Create Product"}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>

      <Modal
        open={viewImageModalOpen} // Replace `visible` with `open`
        footer={null}
        onCancel={() => setViewImageModalOpen(false)}
        centered
      >
        <img
          src={thumbnailImageFileList[0]?.url || ""}
          alt="Selected"
          className="object-contain w-full h-full"
        />
      </Modal>
    </Sheet>
  );
};

// Extend TProduct to include missing fields
interface TProduct {
  name?: string;
  categoryRefId?: string;
  subCategoryRefId?: string;
  publishStatus?: "Publish" | "Preview" | "ComingSoon";
  status?: boolean;
  isDiscounted?: boolean;
  thumbnailImage?: string;
  images?: string[];
  freeShipping?: boolean;
  description?: string;
  discountType?: "percent" | "fixed";
  discount?: number;
  inventoryType?: string;
  inventories?: any[];
  gender?: string;
  weight?: string;
  backViewImage?: string;
  slug?: string;
}
