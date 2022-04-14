import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { setAccessToken, deleteAccessToken } from '../authSlice'
import { setRefreshToken, deleteRefreshToken, getRefreshToken } from 'storage/refreshToken'


const BASE_URL = process.env.REACT_APP_BACKEND_URL
const POST_REFRESH = process.env.REACT_APP_POST_REFRESH
const POST_LOGIN = process.env.REACT_APP_POST_LOGIN
const POST_LOGOUT = process.env.REACT_APP_POST_LOGOUT
const POST_REGISTER = process.env.REACT_APP_POST_REGISTER
const PUT_CHANGE_PASSWORD = process.env.REACT_APP_PUT_CHANGE_PASSWORD


const axiosBaseQuery =
  async ({ url, method, body, timeout }, { getState }) => {
    try {
      const token = getState().auth.accessToken
      // console.log(`accessToken = ${token}`)

      const result = await axios({
        url: url,
        method,
        data: body,
        timeout: timeout ? timeout : 5000,
        headers: token ? { 'authorization': `Bearer ${token}` } : {}
      })
      return { data: result.data }
    } catch (axiosError) {
      let err = axiosError
      console.error(err)
      return {
        error: {
          status: err.response?.status,
          data: err.response ? err.response.data : 'timeout'
        },
      }
    }
  }

const axiosQuerywithReauth = async (args, api, extraOptions) => {
  let result = await axiosBaseQuery(args, api, extraOptions)
  const refreshToken = getRefreshToken()

  if (result.error && result.error.status === 401) {
    if (refreshToken) {
      console.log('refreshing access token by refresh token...')
      const refreshResult = await axiosBaseQuery(
        {
          url: BASE_URL + POST_REFRESH,
          method: 'POST',
          body: {
            'refresh': refreshToken
          }
        }, api, extraOptions
      )
      if (refreshResult.data) {
        api.dispatch(setAccessToken(refreshResult.data.access))
        result = await axiosBaseQuery(args, api, extraOptions)
      } else {
        // Both access token and refresh token is already expired
        console.warn(`Refresh token failed: `, JSON.stringify(refreshResult.error))
        api.dispatch(deleteAccessToken())
        deleteRefreshToken()
        // TODO: prompt 'your session is expired, please login again'
        // TODO: redirct to login page
      }
    } else {
      // TODO: prompt 'please login'
      // TODO: redirct to login page
    }
  }
  return result
}

export const apiSlice = createApi({
  baseQuery: axiosQuerywithReauth,
  endpoints: builder => ({

    login: builder.mutation({
      query: ({ username, password }) => ({
        url: BASE_URL + POST_LOGIN,
        method: 'POST',
        body: { username, password }
      }),
      async onQueryStarted(_, { getState, dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(setAccessToken({ value: data.access }))
        setRefreshToken(data.refresh)
      }
    }),

    logout: builder.mutation({
      query: () => ({
        url: BASE_URL + POST_LOGOUT,
        method: 'POST',
        body: { 'refresh_token': getRefreshToken() }
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
        dispatch(deleteAccessToken())
        deleteRefreshToken()
      }
    }),

    // refreshToken: builder.mutation({
    //   query: () => ({
    //     url: POST_REFRESH_ENDPOINT,
    //     method: 'POST',
    //     body: {
    //       'refresh': getRefreshToken()
    //     }
    //   }),

    //   async onQueryStarted(_, { queryFulfilled, dispatch }) {
    //     try {
    //       const { data } = await queryFulfilled
    //       dispatch(setAccessToken({value: data.access}))
    //     } catch (err) {
    //       console.error(err)
    //       dispatch(apiSlice.endpoints.logout.initiate())
    //     }
    //   }
    // })

  })
})

export const {
  useLoginMutation,
  useLogoutMutation,
  // useRefreshTokenMutation,
} = apiSlice