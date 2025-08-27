import { apiSlice } from '@/store/api/apiSlice';

export const subChildCategoryApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getSubChildCategorys: builder.query({
			query: () => 'sub-child-category',
			providesTags: ['SubChildCategory'],
		}),

		getSubChildCategorysByPagination: builder.query({
			query: ({ page = 1, limit = 10, order = 'desc', search = '' }) =>
				`sub-child-category/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
			providesTags: ['SubChildCategory'],
		}),

		getSubChildCategoryById: builder.query({
			query: (id) => `sub-child-category/${id}`,
			providesTags: ['SubChildCategory'],
		}),

		createSubChildCategory: builder.mutation({
			query: (data) => ({
				url: 'sub-child-category',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['SubChildCategory'],
		}),

		updateSubChildCategory: builder.mutation({
			query: ({ id, data }) => ({
				url: `sub-child-category/${id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['SubChildCategory'],
		}),

		updateSubChildCategoryStatus: builder.mutation({
			query: ({ id, status }) => ({
				url: `sub-child-category/${id}/status?status=${status}`,
				method: 'PUT',
				body: { status },
			}),
			invalidatesTags: ['SubChildCategory'],
		}),

		deleteSubChildCategory: builder.mutation({
			query: (id) => ({
				url: `sub-child-category/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['SubChildCategory'],
		}),
	}),
});

export const {
	useGetSubChildCategorysQuery,
	useGetSubChildCategorysByPaginationQuery,
	useGetSubChildCategoryByIdQuery,
	useCreateSubChildCategoryMutation,
	useUpdateSubChildCategoryMutation,
	useUpdateSubChildCategoryStatusMutation,
	useDeleteSubChildCategoryMutation,
} = subChildCategoryApi;
