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
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TCategory, TCoupon } from "@/types/shared";
import { confirmation } from "@/components/modals/confirm-modal";
import { BASE_URL } from "@/config/config";
import { Upload, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { fileUrlGenerator, humanFileSize, makeFormData } from "@/utils/helpers";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { getFormSchema } from "./form-schema";
import { createCategory, updateCategory } from "@/services/category";
import { Modal } from "antd";

interface Props {
  item?: TCategory;
  mode: "create" | "edit";
  onSubmit: (data: FormData) => Promise<void>;
  children?: React.ReactNode; // Add this line
}

export const MasterForm: React.FC<Props> = ({ item, mode, onSubmit, children }) => {
  console.log("Form item", item);
  console.log("Form mode", mode);
  const { toast } = useToast();
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [viewImageModalOpen, setViewImageModalOpen] = React.useState(false);
  const [updating, setUpdating] = React.useState(false); // Add updating state

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

  const isUpdate = !!item?.slug; // Determine if it's an update based on the presence of slug
  const formSchema = getFormSchema(isUpdate);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item?.name || "",
      image: [],
    },
  });

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
    console.log("Form data before submission:", data);
    try {
      setUpdating(true); // Enable loading state
      const formData = new FormData();

      // Append all form fields to FormData
      formData.append("name", data.name);

      if (item?.slug) {
        // Update operation: Image is optional
        if (data.image && data.image.length > 0) {
          formData.append("image", data.image[0]);
        }
        formData.append("slug", item.slug); // Include slug for update
      } else {
        console.log("Creating new category", data);
        // Create operation: Image is mandatory
        if (!data.image || data.image.length === 0) {
          throw new Error("Image is required for creating a category.");
        }
        formData.append("image", data.image[0]);
      }

      await onSubmit(formData); // Send FormData to the server

      toast({ title: item?.slug ? "Category updated" : "Category created" });
      setSheetOpen(false);

      // Reset form fields to empty after submission
      form.reset({
        name: "",
        image: [],
      });
      // Clear the image file list
      setImageFileList([]);

    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      });
    } finally {
      setUpdating(false); // Disable loading state
    }
  };

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        {children || (
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-white hover:border hover:text-black">
            {item?.slug ? "Edit Category" : "Add Category"}
          </button>
        )}
      </SheetTrigger>
      <SheetContent className="sm:max-w-[750px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle> {item?.slug  ? "Edit Category" : "Create Category"}</SheetTitle>
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
                      Category Name <b className="text-red-500">*</b>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter category name" {...field} />
                    </FormControl>
                    <FormDescription className="text-red-400 text-xs min-h-4">
                      {form.formState.errors.name?.message}
                    </FormDescription>
                  </FormItem>
                )}
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
                loading={updating} // Add loading prop
              >
                {item?.slug ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>

      <Modal
        visible={viewImageModalOpen}
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
