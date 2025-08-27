import { apiSlice } from '@/store/api/apiSlice';

export const wishListApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getWishLists: builder.query({
			query: () => 'wish-list',
			providesTags: ['WishList'],
		}),

		getWishListsByPagination: builder.query({
			query: ({ page = 1, limit = 10, order = 'desc', search = '' }) =>
				`wish-list/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
			providesTags: ['WishList'],
		}),

		getWishListById: builder.query({
			query: (id) => `wish-list/${id}`,
			providesTags: ['WishList'],
		}),

		createWishList: builder.mutation({
			query: (data) => ({
				url: 'wish-list',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['WishList'],
		}),

		updateWishList: builder.mutation({
			query: ({ id, data }) => ({
				url: `wish-list/${id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['WishList'],
		}),

		updateWishListStatus: builder.mutation({
			query: ({ id, status }) => ({
				url: `wish-list/${id}/status?status=${status}`,
				method: 'PUT',
				body: { status },
			}),
			invalidatesTags: ['WishList'],
		}),

		deleteWishList: builder.mutation({
			query: (id) => ({
				url: `wish-list/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['WishList'],
		}),
	}),
});

export const {
	useGetWishListsQuery,
	useGetWishListsByPaginationQuery,
	useGetWishListByIdQuery,
	useCreateWishListMutation,
	useUpdateWishListMutation,
	useUpdateWishListStatusMutation,
	useDeleteWishListMutation,
} = wishListApi;
