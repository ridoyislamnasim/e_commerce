import { apiSlice } from '@/store/api/apiSlice';

export const bannerApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getInventorys: builder.query({
			query: ({warehouseRef = ''}) => `inventory?warehouseRef=${warehouseRef}`,
			providesTags: ['Inventory'],
		}),

		getInventorysByPagination: builder.query({
			query: ({ page = 1, limit = 10, order = 'desc', warehouseRef = '', search = '' }) =>
				`inventory/pagination?page=${page}&limit=${limit}&order=${order}&warehouseRef=${warehouseRef}&search=${search}`,
			providesTags: ['Inventory', 'Product'],
		}),

		getInventoryById: builder.query({
			query: (id) => `inventory/${id}`,
			providesTags: ['Inventory'],
		}),

		createInventory: builder.mutation({
			query: (data) => ({
				url: 'inventory',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Inventory'],
		}),

		updateInventory: builder.mutation({
			query: ({ id, data }) => ({
				url: `inventory/${id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Inventory'],
		}),

		updateInventoryStatus: builder.mutation({
			query: ({ id, status }) => ({
				url: `banner/${id}/status?status=${status}`,
				method: 'PUT',
				body: { status },
			}),
			invalidatesTags: ['Inventory'],
		}),

		deleteInventory: builder.mutation({
			query: (id) => ({
				url: `inventory/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Inventory'],
		}),
	}),
});

export const {
	useGetInventorysQuery, //
	useGetInventorysByPaginationQuery,
	useGetInventoryByIdQuery,
	useCreateInventoryMutation,
	useUpdateInventoryMutation,
	useUpdateInventoryStatusMutation,
	useDeleteInventoryMutation,//
} = bannerApi;
