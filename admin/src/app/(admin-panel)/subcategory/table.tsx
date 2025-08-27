"use client";

import React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  Row,
  HeaderContext,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@radix-ui/react-label";
import { Card } from "@/components/ui/card";
import { TSubCategory } from "@/types/shared";

import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { MasterForm } from "./form";
import { createSubCategory } from "@/services/subCategory";
import { toast } from "@/components/ui/use-toast";
import { confirmation } from "@/components/ui/confirmation";
import editIcon from "../../../assets/Table/Edit.svg";
import deleteIcon from "../../../assets/Table/Delete.svg";
import PreviewImage from "@/components/ui/PreviewImage";

// interface Props {
//   data: TSubCategory[];
//   pagination: {
//     page: number;
//     limit: number;
//     total: number;
//   };
//   onPageChange?: (page: number) => void;
// }

interface Props {
  data: TSubCategory[];
   onSubmit: (formData: FormData) => Promise<void>;
  onDelete: (slug: string) => void;
  fetchData: () => void;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  onPageChange: (page: number) => void;
}

export const CustomTable: React.FC<Props> = ({ data, onSubmit, onDelete, fetchData, pagination, onPageChange }) => {
  const [selectedRows, setSelectedRows] = React.useState<Record<string, boolean>>({});

  const handleSelectAll = (isChecked: boolean) => {
    const newSelectedRows: Record<string, boolean> = {}; // Explicitly type the object
    if (isChecked) {
      data.forEach((row) => {
        newSelectedRows[row.slug] = true;
      });
    }
    setSelectedRows(newSelectedRows);
  };

  const handleRowSelect = (slug: string, isChecked: boolean) => {
    setSelectedRows((prev) => ({
      ...prev,
      [slug]: isChecked,
    }));
  };

  const handleFormSubmit = async (formData: FormData) => {
    await onSubmit(formData);
  };

  const columns: ColumnDef<TSubCategory, any>[] = [
    {
      id: "select",
      header: ({ table }: HeaderContext<TSubCategory, any>) => (
        <input
          type="checkbox"
          onChange={(e) => handleSelectAll(e.target.checked)}
          checked={Object.keys(selectedRows).length === data.length}
        />
      ),
      cell: ({ row }: { row: Row<TSubCategory> }) => (
        <input
          type="checkbox"
          onChange={(e) => handleRowSelect(row.original.slug, e.target.checked)}
          checked={!!selectedRows[row.original.slug]}
        />
      ),
    },
    {
      id: "sl",
      header: "SL",
      cell: ({ row }: { row: Row<TSubCategory> }) => row.index + 1,
    },
    {
      id: "name",
      header: "SubCategory Name",
      accessorKey: "name",
    },
    {
      id: "image",
      header: "Image",
      accessorKey: "image",
      cell: ({ row }: { row: Row<TSubCategory> }) => {
        const { image } = row.original;
        return (
          <div className="w-20 h-20 relative">
            <PreviewImage src={image} alt="subCategory" />
          </div>
        );
      },
    },
    {
      id: "category",
      header: "Category",
      accessorKey: "categoryRef.name", // Access nested category name
      cell: ({ row }: { row: Row<TSubCategory> }) => {
        const { categoryRef } = row.original;
        return categoryRef ? categoryRef.name : "N/A"; // Display category name or fallback to "N/A"
      },
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }: { row: Row<TSubCategory> }) => {
        return (
          <div className="flex items-center gap-2">
            <MasterForm
              mode="edit"
              item={row.original}
              onSubmit={handleFormSubmit} // Use the new handler
            >
              <button className="p-2 rounded">
                <img src={editIcon.src || editIcon} alt="Edit" className="w-5 h-5" />
              </button>
            </MasterForm>

            <button
              className="p-2 rounded"
              onClick={async () => {
                if (await confirmation("Are you sure you want to delete this item?")) {
                  try {
                    await onDelete(row.original.slug);
                    toast({ title: "Item deleted successfully" });
                    fetchData();
                  } catch (error) {
                    toast({
                      title: "Failed to delete item",
                      description: error instanceof Error ? error.message : "An unknown error occurred.",
                    });
                  }
                }
              }}
            >
              <img src={deleteIcon.src || deleteIcon} alt="Delete" className="w-5 h-5" />
            </button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(pagination.total / pagination.limit),
    state: {
      pagination: {
        pageIndex: pagination.page - 1,
        pageSize: pagination.limit,
      },
    },
  });

  return (
    <Card className="m-6 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <Label className="text-xl font-semibold mb-4">SubCategory List</Label>
        <MasterForm
          mode="create"
          onSubmit={handleFormSubmit} // Use the new handler
        >
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-white hover:border hover:text-black">
            Add SubCategory
          </button>
        </MasterForm>
      </div>

      <Table className="rounded-lg overflow-hidden">
        <TableHeader className="bg-primary">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={
                    (header.column.columnDef.meta as any)?.align
                      ? "h-8 text-white text-" +
                        (header.column.columnDef.meta as any)?.align
                      : "h-8 text-white"
                  }
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell: any) => (
                  <TableCell
                    key={cell.id}
                    className={
                      (cell.column.columnDef.meta as any)?.align
                        ? "py-1 text-" + (cell.column.columnDef.meta as any)?.align
                        : "py-1"
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DataTablePagination
        table={table}
        onPageChange={(page) => onPageChange(page)} // Fixed syntax
      />
    </Card>
  );
};
