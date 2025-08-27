import { apiSlice } from '@/store/api/apiSlice';

export const brandApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getBrands: builder.query({
			query: () => 'brand',
			providesTags: ['Brand'],
		}),

		getBrandsByPagination: builder.query({
			query: ({ page = 1, limit = 10, order = 'desc', search = '' }) =>
				`brand/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
			providesTags: ['Brand'],
		}),

		getBrandById: builder.query({
			query: (id) => `brand/${id}`,
			providesTags: ['Brand'],
		}),

		createBrand: builder.mutation({
			query: (data) => ({
				url: 'brand',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Brand'],
		}),

		updateBrand: builder.mutation({
			query: ({ id, data }) => ({
				url: `brand/${id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Brand'],
		}),
		updateBrandStatus: builder.mutation({
			query: ({ id, status }) => ({
				url: `brand/${id}/status?status=${status}`,
				method: 'PUT',
				body: { status },
			}),
			invalidatesTags: ['Brand'],
		}),

		deleteBrand: builder.mutation({
			query: (id) => ({
				url: `brand/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Brand'],
		}),
	}),
});

export const {
	useGetBrandsQuery,
	useGetBrandsByPaginationQuery,
	useGetBrandByIdQuery,
	useCreateBrandMutation,
	useUpdateBrandMutation,
	useUpdateBrandStatusMutation,
	useDeleteBrandMutation,
} = brandApi;
