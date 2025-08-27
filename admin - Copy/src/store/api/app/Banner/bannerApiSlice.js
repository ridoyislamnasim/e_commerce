import { apiSlice } from '@/store/api/apiSlice';

export const bannerApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getBanners: builder.query({
			query: () => 'banners',
			providesTags: ['Banner'],
		}),

		getBannersByPagination: builder.query({
			query: ({ page = 1, limit = 10, order = 'desc', search = '' }) =>
				`banner/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
			providesTags: ['Banner'],
		}),

		getBannerById: builder.query({
			query: (id) => `banner/${id}`,
			providesTags: ['Banner'],
		}),

		createBanner: builder.mutation({
			query: (data) => ({
				url: 'banner',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Banner'],
		}),

		updateBanner: builder.mutation({
			query: ({ id, data }) => ({
				url: `banner/${id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Banner'],
		}),

		updateBannerStatus: builder.mutation({
			query: ({ id, status }) => ({
				url: `banner/${id}/status?status=${status}`,
				method: 'PUT',
				body: { status },
			}),
			invalidatesTags: ['Banner'],
		}),

		deleteBanner: builder.mutation({
			query: (id) => ({
				url: `banner/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Banner'],
		}),
	}),
});

export const {
	useGetBannersQuery,
	useGetBannersByPaginationQuery,
	useGetBannerByIdQuery,
	useCreateBannerMutation,
	useUpdateBannerMutation,
	useUpdateBannerStatusMutation,
	useDeleteBannerMutation,
} = bannerApi;
