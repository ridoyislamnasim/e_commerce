import { apiSlice } from '@/store/api/apiSlice';

export const categoryApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCategorys: builder.query({
			query: () => 'category',
			providesTags: ['Category'],
		}),

		getCategorysByPagination: builder.query({
			query: ({ page = 1, limit = 10, order = 'desc', search = '' }) =>
				`category/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
			providesTags: ['Category'],
		}),

		getCategoryById: builder.query({
			query: (id) => `category/${id}`,
			providesTags: ['Category'],
		}),

		createCategory: builder.mutation({
			query: (data) => ({
				url: 'category',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Category'],
		}),

		updateCategory: builder.mutation({
			query: ({ id, data }) => ({
				url: `category/${id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Category'],
		}),
		updateCategoryStatus: builder.mutation({
			query: ({ id, status }) => ({
				url: `category/${id}/status?status=${status}`,
				method: 'PUT',
				body: { status },
			}),
			invalidatesTags: ['Category'],
		}),

		deleteCategory: builder.mutation({
			query: (id) => ({
				url: `category/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Category'],
		}),
	}),
});

export const {
	useGetCategorysQuery,
	useGetCategorysByPaginationQuery,
	useGetCategoryByIdQuery,
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
	useUpdateCategoryStatusMutation,
	useDeleteCategoryMutation,
} = categoryApi;
