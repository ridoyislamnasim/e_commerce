"use client";

import React, { useState } from "react";
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
import { Modal } from "antd";
import TextPreviewWithModal from "@/components/ui/TextPreviewWithModal";
import InventoryModal from "@/components/ui/InventoryModal";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [inventoryModalOpen, setInventoryModalOpen] = useState(false);
  const [selectedInventories, setSelectedInventories] = useState<any[]>([]);

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
      id: "Product ID",
      header: "Product ID",
      accessorKey: "productId",
    },
    {
      id: "name",
      header: "Product Name",
      accessorKey: "name",
    },
    {
      id: "description",
      header: "Description",
      accessorKey: "description",
      cell: ({ row }: { row: Row<TSubCategory> }) => (
        <TextPreviewWithModal text={row.original.description || ""} previewLength={20} readMoreText="Show more" />
      ),
    },
    {
      id: "isDiscounted",
      header: "Discounted",
      accessorKey: "isDiscounted",
      cell: ({ row }: { row: Row<TSubCategory> }) => (row.original.isDiscounted ? "Yes" : "No"),
    },
    {
      id: "weight",
      header: "Weight",
      accessorKey: "weight",
    },
    {
      id: "thumbnailImage",
      header: "Thumbnail",
      accessorKey: "thumbnailImage",
      cell: ({ row }: { row: Row<TSubCategory> }) => (
        <div className="w-20 h-20 relative">
          <PreviewImage src={row.original.thumbnailImage || ""} alt="Thumbnail" />
        </div>
      ),
    },
    {
      id: "gender",
      header: "Gender",
      accessorKey: "gender",
    },
    {
      id: "inventoryType",
      header: "Inventory Type",
      accessorKey: "inventoryType",
    },
    {
      id: "publishStatus",
      header: "Publish Status",
      accessorKey: "publishStatus",
    },
    {
      id: "inventories",
      header: "Inventories",
      accessorKey: "inventories",
      cell: ({ row }: { row: Row<TSubCategory> }) => (
        <button
          className="text-blue-500 underline text-xs"
          onClick={() => {
            setSelectedInventories(row.original.inventories || []);
            setInventoryModalOpen(true);
          }}
        >
          View Inventories
        </button>
      ),
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
              <button className=" rounded">
                <img src={editIcon.src || editIcon} alt="Edit" className="w-5 h-5" />
              </button>
            </MasterForm>

            <button
              className=" rounded"
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
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        centered
      >
        <div style={{ whiteSpace: "pre-line" }}>{modalText}</div>
      </Modal>
      <InventoryModal
        open={inventoryModalOpen}
        onClose={() => setInventoryModalOpen(false)}
        inventories={selectedInventories}
      />
    </Card>
  );
};
