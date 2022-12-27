import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://lets-talk-api.cyclic.app/api/chat/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    createChat: builder.mutation({
      query: (body) => ({
        url: 'create',
        method: 'POST',
        body,
      }),
    }),
    getAllChat: builder.query({
      query: (id) => `${id}`,
    }),
    findChat: builder.query({
      query: (firstId, secondId) => `${firstId}/${secondId}`,
    }),
  }),
})
export const { useCreateChatMutation, useGetAllChatQuery, useFindChatQuery } =
  chatApi
