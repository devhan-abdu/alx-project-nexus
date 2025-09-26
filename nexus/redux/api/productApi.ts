import { Product } from "@/interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://10.4.111.25:5000/api/' }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => 'products',
            transformResponse: (response: { products: Product[] }) => response.products,
        }),
        getProductById: builder.query<Product, string>({
            query: (id) => `products/${id}`,
            transformResponse: (response: { product: Product }) => response.product,
        }),
        getFeaturedProducts: builder.query<Product[], void>({
            query: () => 'products/featured',
            transformResponse: (response: { featuredProducts: Product[] }) => response.featuredProducts,
        }),
        getNewArrivals: builder.query<Product[], void>({
            query: () => 'products/new-arrivals',
            transformResponse: (response: { newArrivalsProducts: Product[] }) => response.newArrivalsProducts,
        })
    }),
})

export const { useGetProductsQuery, useGetProductByIdQuery, useGetFeaturedProductsQuery, useGetNewArrivalsQuery } = productApi