import { createSlice } from "@reduxjs/toolkit"

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        darkMode: ''
    },
    reducers: {
        toggleDarkMode: (state, action) => ({
            darkMode: !state.darkMode
        })
    }
})

export const { toggleDarkMode } = uiSlice.actions

export default uiSlice.reducer