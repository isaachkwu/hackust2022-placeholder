import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
// import { api } from './api/testSlice'
import { apiSlice } from './api/apiSlice';
import uiReducer from './uiSlice'

export default configureStore({
	reducer: {
        auth: authReducer,
        ui: uiReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        // [api.reducerPath]: api.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware)
});
