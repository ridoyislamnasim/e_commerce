
import { apiSlice } from "@/store/api/apiSlice";

export const transferApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTransfer: builder.query({
            query: () => 'transfer',
            providesTags: ['Transfer'],
        }),
        createTransfer: builder.mutation({
            query: (data) => ({
                url: '/warehouse-transfer',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Transfer'],
        }),
        getAllTransferByPagination: builder.query({
            query: ({ page = 1, limit = 10, order = 'desc', search = '' }) =>
                `transfer/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
            providesTags: ['Transfer'],
        }),
        getAllTransferToByPagination: builder.query({
            query: ({ idTo, page = 1, limit = 10, order = 'desc', search = '' }) =>
                `warehouse-transfer/pagination/to/${idTo}?page=${page}&limit=${limit}&order=${order}&search=${search}`,
            providesTags: ['Transfer'],
        }),
        getAllTransferFromByPagination: builder.query({
            query: ({ idFrom, page = 1, limit = 10, order = 'desc', search = '' }) =>
                `warehouse-transfer/pagination/from/${idFrom}?page=${page}&limit=${limit}&order=${order}&search=${search}`,
            providesTags: ['Transfer'],
        }),
        getSingleTransferById: builder.query({
            query: (id) => `transfer/${id}`,
            providesTags: ['Transfer'],
        }),
        updateTransfer: builder.mutation({
            query: ({ id, data }) => ({
                url: `/transfer/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Transfer'],
        }),
        updateTransferStatus: builder.mutation({
            query: ({ id, status, warehouseRef }) => ({
                url: `warehouse-transfer/status/${id}`, //warehouse-transfer/status/:id
                method: 'PUT',
                body: { status, warehouseRef },
            }),
            invalidatesTags: ['Transfer'],
        }),
        deleteTransfer: builder.mutation({
            query: (id) => ({
                url: `transfer/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Transfer'],
        }),




    }),
});
export const {
    useGetTransferQuery,
    useCreateTransferMutation, //
    useGetAllTransferByPaginationQuery,
    useGetAllTransferToByPaginationQuery, //
    useGetAllTransferFromByPaginationQuery, ///
    useGetSingleTransferByIdQuery,
    useUpdateTransferMutation,
    useUpdateTransferStatusMutation, //
    useDeleteTransferMutation,
} = transferApiSlice;