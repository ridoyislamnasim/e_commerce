import { apiSlice } from '@/store/api/apiSlice';

export const userApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query({
			query: () => 'auth/user',
			providesTags: ['User'],
		}),

		getUsersByPagination: builder.query({
			query: ({ page = 1, limit = 10, order = 'desc', search = '' }) =>
				`user/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
			providesTags: ['User'],
		}),

		getUserById: builder.query({
			query: (id) => `user/${id}`,
			providesTags: ['User'],
		}),

		createUser: builder.mutation({
			query: (data) => ({
				url: 'user',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['User'],
		}),

		updateUser: builder.mutation({
			query: ({ id, data }) => ({
				url: `user/${id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['User'],
		}),

		updateUserStatus: builder.mutation({
			query: ({ id, status }) => ({
				url: `user/${id}/status?status=${status}`,
				method: 'PUT',
				body: { status },
			}),
			invalidatesTags: ['User'],
		}),

		deleteUser: builder.mutation({
			query: (id) => ({
				url: `user/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['User'],
		}),
	}),
});

export const {
	useGetUsersQuery, //
	useGetUsersByPaginationQuery, //
	useGetUserByIdQuery,
	useCreateUserMutation,
	useUpdateUserMutation,
	useUpdateUserStatusMutation,
	useDeleteUserMutation, //
} = userApi;
