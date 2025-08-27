"use server";

import { BASE_URL } from "@/config/config";
import {
  AllSubCategoryResponse,
  AllSubCategoryWithPaginationResponse,
  SingleSubCategoryResponse,
  TSubCategory,
} from "@/types/shared";

export async function createSubCategory(data: any) {
  const response = await fetch(`${BASE_URL}/subcategory`, {
    // headers: {
    //   "Content-Type": "application/json",
    // },
    method: "POST",
    body: data,
    // body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}

export async function getAllSubCategory(): Promise<AllSubCategoryResponse> {
  const response = await fetch(`${BASE_URL}/subcategory`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}

export async function getSubCategoryWithPagination(
  page?: string,
  limit?: string
): Promise<AllSubCategoryWithPaginationResponse> {
  const queryParams = new URLSearchParams();
  if (page) queryParams.set("page", page);
  if (limit) queryParams.set("limit", limit);

  const response = await fetch(
    `${BASE_URL}/subcategory/pagination?${queryParams.toString()}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  return response.json();
}

export async function getSubCategoryById(slug: string): Promise<SingleSubCategoryResponse> {
  const response = await fetch(`${BASE_URL}/subcategory/${slug}`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}

export async function updateSubCategory(slug: string, data: any) {
  const response = await fetch(`${BASE_URL}/subcategory/${slug}`, {
    method: "PUT",
    body: data,
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}

export async function deleteSubCategory(slug: string) {
  const response = await fetch(`${BASE_URL}/subcategory/${slug}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}
