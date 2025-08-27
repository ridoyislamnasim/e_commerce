import { apiSlice } from '@/store/api/apiSlice';

export const bannerApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getBanners: builder.query({
			query: () => 'banners',
			providesTags: ['Banner'],
		}),

		getBannersByPagination: builder.query({
			query: ({ page = 1, limit = 10, order = 'desc', search = '' }) =>
				`banners/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
			providesTags: ['Banner'],
		}),

		getBannerById: builder.query({
			query: (id) => `banners/${id}`,
			providesTags: ['Banner'],
		}),

		createBanner: builder.mutation({
			query: (data) => ({
				url: 'banners',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Banner'],
		}),

		updateBanner: builder.mutation({
			query: ({ id, data }) => ({
				url: `banners/${id}`,
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
				url: `banners/${id}`,
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
