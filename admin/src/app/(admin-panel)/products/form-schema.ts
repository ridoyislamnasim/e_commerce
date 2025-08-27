import { z } from "zod";

export const getFormSchema = (isUpdate = false) =>
  z.object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .max(100, { message: "Name is too long" }),

    publishStatus: z
      .string()
      .default("Publish")
      .refine((status) => ["Publish", "Preview", "ComingSoon"].includes(status), {
        message: "Publish status must be either 'Publish', 'Preview' or 'ComingSoon'",
      }),

    description: z.string().optional().or(z.literal("")),
    isDiscounted: z.boolean().default(false),
    discountType: z.string().optional().or(z.literal("")),
    discount: z.number().optional().or(z.literal(0)),
    costPrice: z.number().optional().or(z.literal(0)),
    price: z.number().optional().or(z.literal(0)),
    mrpPrice: z.number().optional().or(z.literal(0)),
    discountAmount: z.number().optional().or(z.literal(0)),
    thumbnailImage: z.union([
      z.string().min(1, { message: "Thumbnail image is required" }),
      z.instanceof(File)
    ]),
    backViewImage: z.string().optional().or(z.literal("")),
    images: z.array(z.string()).default([]),
    sizeChartImage: z.string().optional().or(z.literal("")),
    videoUrl: z.string().optional().or(z.literal("")),
    status: z.boolean().default(true),
    slug: z.string().optional().or(z.literal("")),
    freeShipping: z.boolean().default(false),
    brandRefId: z.number().optional().or(z.literal(0)),
    mainInventory: z.number().optional().or(z.literal(0)),
    gender: z.string().optional().or(z.literal("")),
    weight: z.preprocess(
      (val) => (val === '' || val === undefined ? undefined : Number(val)),
      z.number({ invalid_type_error: "Weight must be a number" }).optional().or(z.literal(0))
    ),
    categoryRefId: z.preprocess(
      (val) => (val === '' || val === undefined ? undefined : Number(val)),
      z.number({ required_error: "Category is required", invalid_type_error: "Category is required" }).min(1, { message: "Category is required" })
    ),
    subCategoryRefId: z.number().optional().or(z.literal(0)),
    childCategoryRefId: z.number().optional().or(z.literal(0)),
    subChildCategoryRefId: z.number().optional().or(z.literal(0)),
    inventoryType: z.string().min(1, { message: "Inventory type is required" }),
    inventoryArray: z
      .array(
        z.object({
          quantity: z.number().min(0, { message: "Quantity must be at least 0" }),
          mrpPrice: z.number().min(0, { message: "MRP Price must be at least 0" }),
          barcode: z.string().optional().or(z.literal("")),
        })
      )
      .min(1, { message: "At least one inventory is required" }),
  });
