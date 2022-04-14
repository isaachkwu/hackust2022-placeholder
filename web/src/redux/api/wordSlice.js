import { apiSlice } from './apiSlice'


const LABEL_WORD_TAG = 'Word'
const LABEL_MEANING_TAG = 'Meaning'
const WORD_URL = process.env.REACT_APP_WORD
const BASE_URL = process.env.REACT_APP_BACKEND_URL
const GET_DICT = process.env.REACT_APP_GET_DICT


const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: [LABEL_WORD_TAG],
})

const labelAPISlice = apiWithTag.injectEndpoints({
  endpoints: builder => ({

    getWordList: builder.query({
      query: (page = 1) => ({
        url: `${BASE_URL}${WORD_URL}?page=${page}`,
        method: 'GET'
      }),
      providesTags: (result, error, args) => !error ? [
        { type: LABEL_WORD_TAG, id: 'LIST' },
        ...result.results.map((word) => ({ type: LABEL_WORD_TAG, id: word.id }))
      ] : []
    }),

    getWord: builder.query({
      query: (id) => ({
        url: `${BASE_URL}${WORD_URL}${id}/`,
        method: 'GET'
      }),
      providesTags: (result) => [
        { type: LABEL_WORD_TAG, id: result.id }
      ]
    }),

    createWord: builder.mutation({
      query: () => ({
        url: BASE_URL + WORD_URL,
        method: 'POST',
      }),
      invalidatesTags: [{ type: LABEL_WORD_TAG, id: 'LIST' }]
    }),

    deleteWord: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}${WORD_URL}${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: LABEL_WORD_TAG, id: arg },
        { type: LABEL_WORD_TAG, id: 'LIST' }
      ]
    }),

    replaceWord: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `${BASE_URL}${WORD_URL}${id}/`,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: LABEL_WORD_TAG, id: id }
      ]
    }),

    editWord: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `${BASE_URL}${WORD_URL}${id}/`,
        method: 'PATCH',
        body: body
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: LABEL_WORD_TAG, id: id }
      ]
    }),

    getWordDict: builder.query({
      query: ({ word }) => ({
        url: `${GET_DICT}${word}`,
        method: 'GET',
      }),
      providesTags: (result, error, { word }) => [
        { type: LABEL_MEANING_TAG, id: word}
      ]
    })
  })
})

export const {
  useGetWordListQuery,
  useGetWordQuery,
  useCreateWordMutation,
  useDeleteWordMutation,
  useEditWordMutation,
  useReplaceWordMutation,
  useGetWordDictQuery,
  useLazyGetWordDictQuery,
} = labelAPISlice