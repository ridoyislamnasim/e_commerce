import { apiSlice } from '../apiSlice';

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// registerUser: builder.mutation({
		// 	query: (user) => ({
		// 		url: 'register',
		// 		method: 'POST',
		// 		body: user,
		// 	}),
		// }),
		login: builder.mutation({
			query: (data) => ({
				url: 'auth/singin',
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const { useLoginMutation } = authApi;
