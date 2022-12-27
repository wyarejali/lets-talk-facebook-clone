import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://lets-talk-api.cyclic.app/api/message/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    createMessage: builder.mutation({
      query: (body) => ({
        url: 'create',
        method: 'POST',
        body,
      }),
    }),
    getMessages: builder.query({
      query: (id) => `${id}`,
    }),
  }),
})

export const { useCreateMessageMutation, useGetMessagesQuery } = messageApi
