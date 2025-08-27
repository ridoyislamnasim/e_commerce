"use client";
import React, { useState, useEffect } from "react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { CustomTable } from "./table";
import { fileUrlGenerator } from "@/utils/helpers";
import { getProductWithPagination } from "@/services/product";
import { MasterForm } from "./form";
import { TProduct } from "@/types/shared";
import { createProduct, updateProduct, deleteProduct } from "@/services/product";
export default function CouponsPage() {
  const [data, setData] = useState<TProduct[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const fetchData = async () => {
    const { data: fetchedData } = await getProductWithPagination(
      String(pagination.page),
      String(pagination.limit)
    );
    setData(fetchedData.result);
    setPagination((prev) => ({
      ...prev,
      total: fetchedData.pagination.total,
    }));
  };

  useEffect(() => {
    fetchData();
  }, [pagination.page, pagination.limit]);

  const handleSubmit = async (formData: FormData) => {
    const slug = formData.get("slug") as string | null;
    console.log("Form data======================== noe after sumit :", formData);
    console.log("Form data======================== noe after sumit :", slug);
    try {
      if (slug) {
        // Update operation
        console.log("Updating product:", formData);
        await updateProduct(slug, formData);
      } else {
        // Create operation
        console.log("Creating product:", formData);
        await createProduct(formData);
      }
      await fetchData(); // Refetch data after operation
    } catch (error) {
      console.error("Error handling product:", error);
    }
  };

  const handleDelete = async (slug: string) => {
    try {
      await deleteProduct(slug);
      await fetchData(); // Refetch data after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <ContentLayout title="Product">
      {/* <MasterForm mode="create" onSubmit={handleSubmit}>
        <button className="bg-black text-white px-4 py-2 rounded hover:bg-white hover:border hover:text-black">
          Add Product
        </button>
      </MasterForm> */}
      <CustomTable
        data={data.map((item) => ({
          ...item,
          image: fileUrlGenerator(String(item.image)),
          slug: item.slug ?? "", // Ensure slug is always a string
          status: typeof item.status === "boolean" ? item.status : item.status === "active", // Convert status to boolean
        }))}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        fetchData={fetchData}
        pagination={pagination}
        onPageChange={(page: number) => setPagination((prev) => ({ ...prev, page }))}
      />
    </ContentLayout>
  );
}

