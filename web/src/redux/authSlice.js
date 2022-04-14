import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: ''
    },
    reducers: {
        setAccessToken: (state, action) => ({
            accessToken: action.payload.value
        }),
        deleteAccessToken: (state, action) => ({
            accessToken: ''
        })
    }
})

export const { setAccessToken, deleteAccessToken } = authSlice.actions

export default authSlice.reducer