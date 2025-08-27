
import { apiSlice } from "@/store/api/apiSlice";

export const warehouseApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getWarehouse: builder.query({
            query: () => 'warehouse',
            providesTags: ['Warehouse'],
        }),
        createAdminWarehouse: builder.mutation({
            query: (data) => ({
                url: '/warehouse',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Warehouse'],
        }),
        getAllWarehouseByPagination: builder.query({
            query: ({ page = 1, limit = 10, order = 'desc', search = '' }) =>
                `warehouse/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
            providesTags: ['Warehouse'],
        }),
        getSingleWarehouseById: builder.query({
            query: (id) => `warehouse/${id}`,
            providesTags: ['Warehouse'],
        }),
        updateWarehouse: builder.mutation({
            query: ({ id, data }) => ({
                url: `/warehouse/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Warehouse'],
        }),
        updateWarehouseStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `warehouse/status/${id}?status=${status}`,
                method: 'PUT',
                body: { status },
            }),
            invalidatesTags: ['Warehouse'],
        }),
        deleteWarehouse: builder.mutation({
            query: (id) => ({
                url: `warehouse/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Warehouse'],
        }),




    }),
});
export const {
    useGetWarehouseQuery,
    useCreateAdminWarehouseMutation,
    useGetAllWarehouseByPaginationQuery,
    useGetSingleWarehouseByIdQuery,
    useUpdateWarehouseMutation,
    useUpdateWarehouseStatusMutation,
    useDeleteWarehouseMutation,
} = warehouseApiSlice;