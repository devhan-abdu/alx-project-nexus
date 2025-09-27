import { Product, ProductDetail } from "@/interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_API_URL}),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => 'products',
            transformResponse: (response: { products: Product[] }) => response.products,
        }),
        getProductDetail: builder.query<ProductDetail, string>({
            query: (slug) => `products/${slug}`,
            transformResponse: (response: { product: ProductDetail }) => response.product,
        }),
        getFeaturedProducts: builder.query<Product[], void>({
            query: () => 'products/featured',
            transformResponse: (response: { featuredProducts: Product[] }) => response.featuredProducts,
        }),
        getNewArrivals: builder.query<Product[], void>({
            query: () => 'products/new-arrivals',
            transformResponse: (response: { newArrivalsProducts: Product[] }) => response.newArrivalsProducts,
        }),
        getRelatedProducts: builder.query<Product[], number>({
            query: (category) => `products/${category}/related`,
            transformResponse: (response: { relatedProducts: Product[] }) => response.relatedProducts,

        })
    }),
})

export const { useGetProductsQuery, useGetProductDetailQuery, useGetFeaturedProductsQuery, useGetRelatedProductsQuery, useGetNewArrivalsQuery } = productApi