import ProductCard from '@/components/ProductCard';
import { CategorySkeletonTwo, ProductSkeleton } from '@/components/SkeletonLoader';
import { Product } from '@/interface';
import { useGetCategoriesQuery } from '@/redux/api/categoriesApi';
import { useGetFeaturedProductsQuery, useGetNewArrivalsQuery } from '@/redux/api/productApi';
import { Button, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";


export default function HomeScreen() {
  const { data: categories, error: categoryError, isLoading: categoryIsLoading, refetch: refetchCategories } = useGetCategoriesQuery();
  const { data: featuredProducts, error: FeaturedError, isLoading: FeaturedIsLoading, refetch: refetchFeatured } = useGetFeaturedProductsQuery();
  const { data: newArrivalProducts, error: newArrivalError, isLoading: newArrivalIsLoading, refetch: newArrivalFeatured } = useGetNewArrivalsQuery();

  if (categoryError) {

    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-center mb-4">Failed to load data. Please try again later. </Text>
        <Button title="Retry Categories" onPress={refetchCategories} />
        {/* <Button title="Retry Featured Products" onPress={refetchFeatured} />
        <Button title="Retry New Arrivals" onPress={newArrivalFeatured} /> */}

      </View>
    )
  }

  return (
    <ScrollView className='bg-foreground flex-1 p-4'>
      <View className="flex-col items-center justify-center px-4 py-6 mb-3 h-[40vh] w-full relative  ">

        <Text className="text-3xl font-bold text-center mb-4">
          Discover the Best Apple Products
          <Text className="text-primary"> With Us</Text>
        </Text>
        <Image
          source={require('../../assets/images/hero2.png')}
          className="w-48 h-48 -mt-6 "
          resizeMode="contain"
        />
      </View>
      <View className='flex-col  py-6'>
        <Text className='mb-6 text-lg font-bold'>
          Top Categories
        </Text>
        {
          categoryIsLoading ?
            <View className='flex-row flex-wrap gap-2 mb-4'>
              {
                Array.from({ length: 5 }).map((_, i) => <CategorySkeletonTwo key={i} />)
              }
            </View>
            :
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              contentContainerStyle={{ gap: 16 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View className="items-center justify-center mr-4">
                  <Image source={{ uri: item.image }} className="w-16 h-16 " />
                  <Text className="mt-2 text-sm">{item.name}</Text>
                </View>

              )}
              ListEmptyComponent={<Text className="text-center flex-row mt-10">No Category found</Text>}

            />
        }
      </View>

      <View className='  bg-gray-50  flex-col gap-3 mt-6'>
        <Text className='my-6 text-lg font-bold px-2  rounded-md'>
          Featured Product
        </Text>
        {FeaturedIsLoading ? (
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
            data={featuredProducts}
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

      <View className='bg-primary p-6 items-center justify-center  rounded-xl'>
        <Text className='text-white text-center text-lg font-bold mb-4'>
          Want to stay updated with the latest Apple products and offers?
        </Text>
        <TouchableOpacity className='bg-white px-6 py-3 rounded-full'>
          <Text className='text-primary font-bold'>Subscribe Now</Text>
        </TouchableOpacity>
      </View>

      <View className='  bg-gray-50  flex-col gap-3 mt-6'>
        <Text className='my-6 text-lg font-bold px-2  rounded-md'>
          New Arrival  Product
        </Text>
        {newArrivalIsLoading ? (
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
            data={newArrivalProducts}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            numColumns={2}
            columnWrapperClassName='justify-between'
            renderItem={({ item }) => <ProductCard product={item as Product} />}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={<Text className="text-center mt-10">No products found</Text>}
            contentContainerStyle={{ paddingBottom: 60 }}
          />
        )}
      </View>
    </ScrollView>
  )
}
