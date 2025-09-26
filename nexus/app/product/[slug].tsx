import ProductCard from '@/components/ProductCard';
import { ProductSkeleton } from '@/components/SkeletonLoader';
import { CartItems, ProductDetail } from '@/interface';
import { useGetProductDetailQuery, useGetRelatedProductsQuery } from '@/redux/api/productApi';
import { useAppDispatch } from '@/redux/hooks';
import { addCartItem } from '@/redux/slices/cartSlice';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const ProductDetailPage = () => {
    const { slug } = useLocalSearchParams();
    const [tabs, setTabs] = useState('description')
    const dispatch = useAppDispatch();
    if (!slug) return null;
    const { data, error, isLoading } = useGetProductDetailQuery(slug as string);
    const { data: relatedProducts, error: relatedError, isLoading: relatedIsLoading, } = useGetRelatedProductsQuery(data?.categoryId ?? 0);

    const addToCart = (product: ProductDetail) => {
        const cartItems: CartItems = {
            productId: product.id,
            title: product.title,
            price: product.price,
            desc: product.shortDesc,
            image: product.image,
            quantity: 1
        }
        dispatch(addCartItem(cartItems))
    }

    if (error) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text className="text-center mb-4">Failed to load product details. Please try again later. </Text>
            </View>
        )
    }

    return (
        <View className='bg-foreground flex-1 px-4 mb-8'>
            <Stack.Screen options={{ title: 'Product Detail', headerShadowVisible: false }} />

            <ScrollView>
                <Image source={{ uri: data?.image }} className="w-full h-[50vh] flex items-center justify-center " style={{ resizeMode: 'contain' }} />

                <View className='flex-col mb-6 gap-2'>
                    <Text className='text-2xl font-bold capitalize'>{data?.title}</Text>
                    <View className='flex-row items-center justify-between  gap-2 mb-2'>
                        <View className='flex-row items-center gap-2'>
                            <Ionicons name='star' size={16} color={"#FFC107"} />
                            <Text>4.5 ({data?.numReviews} review)</Text>
                        </View>
                        <Text className='text-2xl font-bold'>${data?.price}</Text>
                    </View>
                    <Text className='text-gray-600 '>{data?.shortDesc}</Text>
                </View>



                <View className="flex-row flex-wrap gap-x-6 gap-y-4  mb-6 ">
                    <View className="flex flex-col items-center ">
                        <Ionicons name='car-outline' size={24} color={"#C7326A"} />
                        <Text className='text-sm font-semibold text-gray-800'>Free Delivery</Text>
                    </View>
                    <View className="flex flex-col items-center ">
                        <Ionicons name='shield-checkmark-outline' size={24} color={"#C7326A"} />
                        <Text className='text-sm font-semibold text-gray-800'>Free Delivery</Text>
                    </View>
                    <View className="flex flex-col items-center ">
                        <Ionicons name='lock-closed-outline' size={24} color={"#C7326A"} />
                        <Text className='text-sm font-semibold text-gray-800'>Secure Payment</Text>
                    </View>
                    <View className="flex flex-col items-center ">
                        <Ionicons name='return-up-back-outline' size={24} color={"#C7326A"} />
                        <Text className='text-sm font-semibold text-gray-800'>7-Day Return Policy</Text>
                    </View>
                </View>
                <Text onPress={() => setTabs('description')} className='text-lg font-semibol text-primary mb-6' >Description</Text>

                <Text className='text-gray-600 mb-6'>{data?.longDesc}</Text>
                <View className='  bg-gray-50  flex-col gap-3 mb-6'>
                    <Text className='my-6 text-xl font-bold px-2  rounded-md'>
                        You may also like
                    </Text>
                    {relatedIsLoading ? (
                        <FlatList
                            data={Array.from({ length: 4 })}
                            keyExtractor={(_, index) => index.toString()}
                            numColumns={2}
                            scrollEnabled={false}
                            renderItem={({ index }) => <ProductSkeleton key={index} />}
                            columnWrapperStyle={{ gap: 16 }}
                            contentContainerStyle={{ gap: 16, marginBottom: 16 }}
                        />
                    ) : (
                        <FlatList
                            data={relatedProducts}
                            keyExtractor={(item) => item.id.toString()}
                            scrollEnabled={false}
                            numColumns={2}
                            columnWrapperClassName='justify-between'
                            renderItem={({ item }) => <ProductCard product={item} />}
                            onEndReachedThreshold={0.5}
                            ListEmptyComponent={<Text className="text-center mt-10">No products found</Text>}
                            contentContainerStyle={{ paddingBottom: 40 }}
                        />
                    )}
                </View>



            </ScrollView>
            <View className="absolute bottom-0 left-0 right-0 flex-row bg-white border-t border-gray-200 px-4 py-3">
                <TouchableOpacity
                    className="flex-1 bg-white py-3 rounded-xl mr-2"
                    onPress={() => addToCart}
                >
                    <Text className="text-center font-semibold text-primary">Add to Cart</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-1 bg-primary py-3 rounded-xl ml-2"
                    onPress={() => console.log("Pay pressed")}
                >
                    <Text className="text-center font-semibold text-white ">Pay</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default ProductDetailPage
