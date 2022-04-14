import { apiSlice } from './apiSlice'

const POST_SIMPLIFY = process.env.REACT_APP_POST_SIMPLIFY
const BASE_URL = process.env.REACT_APP_BACKEND_URL

const simplifySlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    simplify: builder.mutation({
      query: ({ text, url }) => ({
        url: BASE_URL + POST_SIMPLIFY,
        method: 'POST',
        timeout: 300000,
        body: { text, url }
      })
    })
  })
})

export const { useSimplifyMutation } = simplifySlice