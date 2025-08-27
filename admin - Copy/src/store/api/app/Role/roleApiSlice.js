import { apiSlice } from '@/store/api/apiSlice';

export const roleApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getRoles: builder.query({
			query: () => '/role',
			providesTags: ['Role'],
		}),

		getRolesByPagination: builder.query({
			query: ({ page = 1, limit = 10, order = 'desc', search = '' }) =>
				`/role/pagination/?page=${page}&limit=${limit}&order=${order}&search=${search}`,
			providesTags: ['Role'],
		}),

		getRolesByBranchId: builder.query({
			query: (id) => `/role/role-branche/${id}`,
			providesTags: ['Role'],
		}),

		getSingleRoleById: builder.query({
			query: ({ id, permission = '' }) => `/role/${id}?permission=${permission}`,
			providesTags: ['Role'],
		}),

		createRole: builder.mutation({
			query: (data) => ({
				url: '/role',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Role'],
		}),

		updateRole: builder.mutation({
			query: ({ id, data }) => ({
				url: `/role/${id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Role'],
		}),


		deleteRole: builder.mutation({
			query: (id) => ({
				url: `/role/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Role'],
		}),
	}),
});
export const {
	useGetRolesQuery,
	useCreateRoleMutation,
	useDeleteRoleMutation,
	useGetSingleRoleByIdQuery, // use all pages for single role 
	useGetRolesByPaginationQuery,
	useUpdateRoleMutation,

} = roleApi;
