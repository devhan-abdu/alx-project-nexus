import { Category, Product } from "@/interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_API_URL }),
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            query: () => 'categories',
            transformResponse: (response: { categories: Category[] }) => response.categories,
        }),
        getCategoryProducts: builder.query<Product[], string>({
            query: (category) => `categories/${category}`,
            transformResponse: (response: { products: Product[] }) => response.products,
        }),
    }),
})



export const { useGetCategoriesQuery, useGetCategoryProductsQuery } = categoryApi