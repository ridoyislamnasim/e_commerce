"use client";
import React, { useState, useEffect } from "react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { CustomTable } from "./table";
import { fileUrlGenerator } from "@/utils/helpers";
import { getCategoryWithPagination } from "@/services/category";
import { MasterForm } from "./form";
import { TCategory } from "@/types/shared";
import { createCategory, updateCategory, deleteCategory } from "@/services/category";
export default function CouponsPage() {
  const [data, setData] = useState<TCategory[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const fetchData = async () => {
    const { data: fetchedData } = await getCategoryWithPagination(
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
    try {
      if (slug) {
        // Update operation
        console.log("Updating category:", formData);
        await updateCategory(slug, formData);
      } else {
        // Create operation
        console.log("Creating category:", formData);
        await createCategory(formData);
      }
      await fetchData(); // Refetch data after operation
    } catch (error) {
      console.error("Error handling category:", error);
    }
  };

  const handleDelete = async (slug: string) => {
    try {
      await deleteCategory(slug);
      await fetchData(); // Refetch data after deletion
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <ContentLayout title="Category">
      {/* <MasterForm mode="create" onSubmit={handleSubmit}>
        <button className="bg-black text-white px-4 py-2 rounded hover:bg-white hover:border hover:text-black">
          Add Category
        </button>
      </MasterForm> */}
      <CustomTable
        data={data.map((item) => ({
          ...item,
          image: fileUrlGenerator(String(item.image)),
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

