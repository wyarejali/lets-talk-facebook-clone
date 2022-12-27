import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://lets-talk-api.cyclic.app/api/user/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: 'signup',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: `${body._id}`,
        method: 'PUT',
        body,
      }),
    }),
    getUser: builder.query({
      query: (username) => `find/${username}`,
    }),

    getUserById: builder.query({
      query: (id) => `${id}`,
    }),

    getAllUser: builder.query({
      query: () => 'all',
    }),
  }),
})
export const {
  useUpdateUserMutation,
  useGetUserQuery,
  useGetUserByIdQuery,
  useRegisterMutation,
  useLoginMutation,
  useGetAllUserQuery,
} = authApi
