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
import { TSubCategory } from "@/types/shared";
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

interface Props {
  item?: TSubCategory;
  mode: "create" | "edit";
  onSubmit: (data: FormData) => Promise<void>;
  children?: React.ReactNode; // Add this line
}

export const MasterForm: React.FC<Props> = ({ item, mode, onSubmit, children }) => {
  console.log("Form item", item);
  const { toast } = useToast();
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [viewImageModalOpen, setViewImageModalOpen] = React.useState(false);
  const [updating, setUpdating] = React.useState(false);
  const [categoryRef, setCategoryRef] = React.useState<string | null>(null); // Add state for categoryRef

  const [imageFileList, setImageFileList] = React.useState<UploadFile<any>[]>
  (
    item?.image
      ? [
          {
            uid: "-1",
            name: String(item.image).split("/").pop() || "",
            status: "done",
            url: fileUrlGenerator(item.image),
          },
        ]
      : []
  );

  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  const isUpdate = !!item?.slug; // Determine if it's an update based on the presence of slug
  const formSchema = getFormSchema(isUpdate);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item?.name || "",
      categoryRef: item?.categoryRef || "", // Set default categoryRef if available
      image: [],
    } as z.infer<typeof formSchema>,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategory();
        const formattedCategories = response.data.map((category) => ({
          id: category.id.toString(),
          name: category.name,
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleImageFileChange = ({ fileList }: any) => {
    const latestFile = fileList.slice(-1);
    setImageFileList(latestFile);

    const rawFiles = latestFile
      .map((file: any) => file.originFileObj)
      .filter(Boolean);

    form.setValue("image", rawFiles);

    // Display image name and size information
    if (latestFile.length > 0) {
      const file = latestFile[0];
      toast({
        title: "Image Selected",
        description: `Name: ${file.name}, Size: ${humanFileSize(file.size)}`,
      });
    }
  };

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
      formData.append("categoryRef", categoryRef); // Add categoryRef to FormData

      if (item?.slug) {
        if (data.image && data.image.length > 0) {
          formData.append("image", data.image[0]);
        }
        formData.append("slug", item.slug);
      } else {
        if (!data.image || data.image.length === 0) {
          throw new Error("Image is required for creating a subCategory.");
        }
        formData.append("image", data.image[0]);
      }

      await onSubmit(formData);
      toast({ title: item?.slug ? "SubCategory updated" : "SubCategory created" });
      setSheetOpen(false);
      form.reset({ name: "", image: [] });
      setCategoryRef(null); // Reset categoryRef
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      });
    } finally {
      setUpdating(false);
    }
  };

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
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      SubCategory Name <b className="text-red-500">*</b>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter subCategory name" {...field} />
                    </FormControl>
                    <FormDescription className="text-red-400 text-xs min-h-4">
                      {form.formState.errors.name?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>

            {/* Replace with FormDropdown */}
            <div className="col-span-2">
              <FormLabel>
                Category <b className="text-red-500">*</b>
              </FormLabel>
              <FormDropdown
                name="categoryRef"
                control={form.control}
                data={categories}
                placeholder="Select a category"
                rules={{ required: "Category is required." }}
                onChange={(value) => setCategoryRef(value)} // Update categoryRef when a category is selected
                defaultSelectedValue={item?.categoryRefId || undefined} // Set default selected value if item data is available
              />
            </div>

            <div className="col-span-1">
              <Label>
                Image <b className="text-red-500">*</b>
              </Label>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <div>
                    <Upload
                      listType="picture-card"
                      beforeUpload={() => false}
                      fileList={imageFileList}
                      onChange={handleImageFileChange}
                    >
                      <div>
                        <UploadOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    </Upload>
                  </div>
                )}
              />
            </div>

            <div className="col-span-2 flex gap-3 mt-4">
              <Button
                type="submit"
                variant="default"
                style={{ backgroundColor: "#19B6C9", color: "white" }}
                loading={updating}
              >
                {item?.slug ? "Update" : "Create"}
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
          src={imageFileList[0]?.url || ""}
          alt="Selected"
          className="object-contain w-full h-full"
        />
      </Modal>
    </Sheet>
  );
};
