import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const uploadApi = createApi({
  reducerPath: 'uploadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://lets-talk-api.cyclic.app/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (body) => ({
        url: 'upload',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useUploadImageMutation } = uploadApi
