
import { apiSlice } from "@/store/api/apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrder: builder.query({
            query: () => 'order',
            providesTags: ['Order'],
        }),
        createAdminOrder: builder.mutation({
            query: (data) => ({
                url: '/order/admin',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Order'],
        }),


        getAllOrderByPagination: builder.query({
            query: ({ page = 1, limit = 10, order = 'desc',warehouseRef = '',  search = '' }) =>
                `order/pagination?page=${page}&limit=${limit}&order=${order}&warehouseRef=${warehouseRef}&search=${search}`,
            providesTags: ['Order'],
        }),


        getSingleOrderById: builder.query({
            query: (id) => `order/${id}`,
            providesTags: ['Order'],
        }),


        updateOrder: builder.mutation({
            query: ({ id, data }) => ({
                url: `/order/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Order'],
        }),


        updateOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `order/status/${id}?status=${status}`,
                method: 'PUT',
                body: { status },
            }),
            invalidatesTags: ['Order'],
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/order/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Order'],
        }),




    }),
});
export const {
    useGetOrderQuery,
    useCreateAdminOrderMutation,
    useGetAllOrderByPaginationQuery,
    useGetSingleOrderByIdQuery,
    useUpdateOrderMutation,
    useUpdateOrderStatusMutation,
    useDeleteOrderMutation,
} = orderApiSlice;