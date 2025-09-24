import ProductCard from '@/components/ProductCard';
import { featuresProduct } from '@/data/mockProduct';
import { useState } from "react";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { category } from '../../data/mockProduct';


export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | string>('All');
  const [page, setPage] = useState(1);
  // const PAGE_SIZE = 8;

  // const filtered = useMemo(() => {
  //   return PRODUCTS.filter((p: Product) => {
  //     const matchCategory = selectedCategory === 'All' ? true : p.category === selectedCategory;
  //     const metchQuery = p.title.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase());
  //     return matchCategory && metchQuery;
  //   })
  // }, [query, selectedCategory]);

  // const paginated = filtered.slice(0, page * PAGE_SIZE);

  return (
    <ScrollView className='bg-foreground flex-1 p-4'>
        {/* <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search products..."
          className="bg-white rounded-xl p-3 mb-3" /> */}

        <View className="flex-col items-center justify-center px-4 py-6 mb-3 h-[40vh] w-full relative  ">

          <Text className="text-3xl font-bold text-center mb-4">
            Discover the Best Apple Products
            <Text className="text-primary"> With Us</Text>
          </Text>
          <Image
            source={require('../../assets/images/hero2.png')}
            className="w-48 h-48 "
            resizeMode="contain"
          />
        </View>
        <View className='flex-col  py-6'>
          <Text className='mb-6 text-lg font-bold'>
            Top Categories
          </Text>
          <FlatList
            data={category}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View className="items-center justify-center mr-4">
                <Image source={item.image} className="w-16 h-16 " />
                <Text className="mt-2 text-sm">{item.label}</Text>
              </View>

            )}
          />
        </View>
        <View className='  bg-gray-50  flex-col gap-3 mt-6'>
          <Text className='my-6 text-lg font-bold px-2  rounded-md'>
            Featured Product
          </Text>
          <FlatList
            data={featuresProduct}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            numColumns={2}
            columnWrapperClassName='justify-between'
            renderItem={({ item }) => <ProductCard product={item} />}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={<Text className="text-center mt-10">No products found</Text>}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
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
          <FlatList
            data={featuresProduct}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            numColumns={2}
            columnWrapperClassName='justify-between'
            renderItem={({ item }) => <ProductCard product={item} />}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={<Text className="text-center mt-10">No products found</Text>}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        </View>
    </ScrollView>
  )
}
