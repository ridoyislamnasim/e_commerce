"use client";
import React, { useState, useEffect } from "react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { CustomTable } from "./table";
import { fileUrlGenerator } from "@/utils/helpers";
import { getSubCategoryWithPagination } from "@/services/subCategory";
import { MasterForm } from "./form";
import { TSubCategory } from "@/types/shared";
import { createSubCategory, updateSubCategory, deleteSubCategory } from "@/services/subCategory";
export default function CouponsPage() {
  const [data, setData] = useState<TSubCategory[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const fetchData = async () => {
    const { data: fetchedData } = await getSubCategoryWithPagination(
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
        console.log("Updating subCategory:", formData);
        await updateSubCategory(slug, formData);
      } else {
        // Create operation
        console.log("Creating subCategory:", formData);
        await createSubCategory(formData);
      }
      await fetchData(); // Refetch data after operation
    } catch (error) {
      console.error("Error handling subCategory:", error);
    }
  };

  const handleDelete = async (slug: string) => {
    try {
      await deleteSubCategory(slug);
      await fetchData(); // Refetch data after deletion
    } catch (error) {
      console.error("Error deleting subCategory:", error);
    }
  };

  return (
    <ContentLayout title="SubCategory">
      {/* <MasterForm mode="create" onSubmit={handleSubmit}>
        <button className="bg-black text-white px-4 py-2 rounded hover:bg-white hover:border hover:text-black">
          Add SubCategory
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

