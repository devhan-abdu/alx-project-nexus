import { configureStore } from "@reduxjs/toolkit";
import { categoryApi } from "./api/categoriesApi";
import { productApi } from "./api/productApi";
import cartReducer from './slices/cartSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        [productApi.reducerPath]: productApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(productApi.middleware)
            .concat(categoryApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
