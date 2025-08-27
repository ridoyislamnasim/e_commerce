import { apiSlice } from '@/store/api/apiSlice';

export const bannerApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCoupons: builder.query({
			query: () => 'coupon',
			providesTags: ['Coupon'],
		}),

		getCouponsByPagination: builder.query({
			query: ({ page = 1, limit = 10, order = 'desc', search = '' }) =>
				`coupon/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
			providesTags: ['Coupon'],
		}),

		getCouponById: builder.query({
			query: (id) => `coupon/${id}`,
			providesTags: ['Coupon'],
		}),

		createCoupon: builder.mutation({
			query: (data) => ({
				url: 'coupon',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Coupon'],
		}),

		updateCoupon: builder.mutation({
			query: ({ id, data }) => ({
				url: `coupon/${id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Coupon'],
		}),

		updateCouponStatus: builder.mutation({
			query: ({ id, status }) => ({
				url: `banner/${id}/status?status=${status}`,
				method: 'PUT',
				body: { status },
			}),
			invalidatesTags: ['Coupon'],
		}),

		deleteCoupon: builder.mutation({
			query: (id) => ({
				url: `coupon/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Coupon'],
		}),
	}),
});

export const {
	useGetCouponsQuery,
	useGetCouponsByPaginationQuery,
	useGetCouponByIdQuery,
	useCreateCouponMutation,
	useUpdateCouponMutation,
	useUpdateCouponStatusMutation,
	useDeleteCouponMutation,
} = bannerApi;
