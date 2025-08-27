import { apiSlice } from '@/store/api/apiSlice';

export const childCategoryApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getChildCategorys: builder.query({
			query: () => 'child-category',
			providesTags: ['ChildCategory'],
		}),

		getChildCategorysByPagination: builder.query({
			query: ({ page = 1, limit = 10, order = 'desc', search = '' }) =>
				`child-category/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
			providesTags: ['ChildCategory'],
		}),

		getChildCategoryById: builder.query({
			query: (id) => `child-category/${id}`,
			providesTags: ['ChildCategory'],
		}),

		createChildCategory: builder.mutation({
			query: (data) => ({
				url: 'child-category',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['ChildCategory'],
		}),

		updateChildCategory: builder.mutation({
			query: ({ id, data }) => ({
				url: `child-category/${id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['ChildCategory'],
		}),

		updateChildCategoryStatus: builder.mutation({
			query: ({ id, status }) => ({
				url: `child-category/${id}/status?status=${status}`,
				method: 'PUT',
				body: { status },
			}),
			invalidatesTags: ['ChildCategory'],
		}),

		deleteChildCategory: builder.mutation({
			query: (id) => ({
				url: `child-category/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['ChildCategory'],
		}),
	}),
});

export const {
	useGetChildCategorysQuery,
	useGetChildCategorysByPaginationQuery,
	useGetChildCategoryByIdQuery,
	useCreateChildCategoryMutation,
	useUpdateChildCategoryMutation,
	useUpdateChildCategoryStatusMutation,
	useDeleteChildCategoryMutation,
} = childCategoryApi;
