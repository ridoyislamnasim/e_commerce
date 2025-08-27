import { apiSlice } from '@/store/api/apiSlice';

export const productApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: ({ warehouseRef }) => `product?warehouseRef=${warehouseRef}`,
			providesTags: ['Product'],
		}),

		getProductsByPagination: builder.query({
			query: ({ page = 1, limit = 10, order = 'desc', warehouseRef = '', search = '' }) =>
				`product/pagination/admin?page=${page}&limit=${limit}&order=${order}&warehouseRef=${warehouseRef}&search=${search}`,
			providesTags: ['Product'],
		}),

		getProductById: builder.query({
			query: (id) => `product/${id}`,
			providesTags: ['Product'],
		}),

		createProduct: builder.mutation({
			query: (data) => ({
				url: 'product',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Product'],
		}),

		updateProduct: builder.mutation({
			query: ({ id, data }) => ({
				url: `product/${id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Product'],
		}),
		updateProductStatus: builder.mutation({
			query: ({ id, status }) => ({
				url: `product/${id}/status?status=${status}`,
				method: 'PUT',
				body: { status },
			}),
			invalidatesTags: ['Product'],
		}),

		deleteProduct: builder.mutation({
			query: (id) => ({
				url: `product/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Product'],
		}),
	}),
});

export const {
	useGetProductsQuery, //
	useGetProductsByPaginationQuery,
	useGetProductByIdQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useUpdateProductStatusMutation,
	useDeleteProductMutation,
} = productApi;
