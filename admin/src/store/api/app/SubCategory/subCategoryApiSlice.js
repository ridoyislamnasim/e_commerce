import { apiSlice } from '@/store/api/apiSlice';

export const subCategoryApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getSubCategorys: builder.query({
			query: () => 'sub-category',
			providesTags: ['SubCategory'],
		}),

		getSubCategorysByPagination: builder.query({
			query: ({ page = 1, limit = 10, order = 'desc', search = '' }) =>
				`sub-category/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
			providesTags: ['SubCategory'],
		}),

		getSubCategoryById: builder.query({
			query: (id) => `sub-category/${id}`,
			providesTags: ['SubCategory'],
		}),

		createSubCategory: builder.mutation({
			query: (data) => ({
				url: 'sub-category',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['SubCategory'],
		}),

		updateSubCategory: builder.mutation({
			query: ({ id, data }) => ({
				url: `sub-category/${id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['SubCategory'],
		}),

		updateSubCategoryStatus: builder.mutation({
			query: ({ id, status }) => ({
				url: `sub-category/${id}/status?status=${status}`,
				method: 'PUT',
				body: { status },
			}),
			invalidatesTags: ['SubCategory'],
		}),

		deleteSubCategory: builder.mutation({
			query: (id) => ({
				url: `sub-category/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['SubCategory'],
		}),
	}),
});

export const {
	useGetSubCategorysQuery,
	useGetSubCategorysByPaginationQuery,
	useGetSubCategoryByIdQuery,
	useCreateSubCategoryMutation,
	useUpdateSubCategoryMutation,
	useUpdateSubCategoryStatusMutation,
	useDeleteSubCategoryMutation,
} = subCategoryApi;
