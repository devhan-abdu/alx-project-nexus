import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/mockProduct";
import { Product } from "@/types";
import { Picker } from "@react-native-picker/picker";
import { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";

export default function ProductScreen() {
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<'All' | string>('All');
    const [sortOption, setSortOption] = useState<'default' | 'asc' | 'desc'>('default');
    const [page, setPage] = useState(1);
    const PAGE_SIZE = 8;

    const filtered = useMemo(() => {
        let result = PRODUCTS.filter((p: Product) => {
            const matchCategory = selectedCategory === 'All' ? true : p.category === selectedCategory;
            const metchQuery = p.title.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase());
            return matchCategory && metchQuery;
        })

        if (sortOption === 'asc') {
            result = result.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'desc') {
            result = result.sort((a, b) => b.price - a.price);
        }
        return result;
    }, [query, selectedCategory, sortOption]);

    const paginated = filtered.slice(0, page * PAGE_SIZE);

    return (
        <ScrollView className="px-4 py-4 bg-foreground  ">

            <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search products..."
                className="py-4 px-6 bg-primary/10 rounded-xl  focus:outline focus:outline-primary mb-6" />
            <View className="flex-row flex-wrap gap-2 mb-4">
                {
                    ["All", "Tablets", "Smartphones", "Headphones", "Laptops", "Accessories"].map((category) => (
                        <Text
                            key={category}
                            onPress={() => {
                                setSelectedCategory(category);
                                setPage(1);
                            }}
                            className={`px-3 py-2 rounded-full ${selectedCategory === category ? 'bg-primary text-white' : ''}`} >
                            {category}
                        </Text>
                    ))
                }
            </View>
            <View className="mb-6  border border-gray-200 rounded-lg overflow-hidden">
                <Picker
                    selectedValue={sortOption}
                    onValueChange={(value: 'default' | 'asc' | 'desc') => { 
                         setSortOption(value);
                        setPage(1);
                    }}
                    >
                    <Picker.Item label="Default" value="default" />
                    <Picker.Item label="Price: Low to High" value="asc" />
                    <Picker.Item label="Price: High to Low" value="desc" />
                </Picker>
            </View>
            <FlatList
                data={paginated}
                keyExtractor={(item) => item.id}
                numColumns={2}
                scrollEnabled={false}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item }) => <ProductCard product={item} />}
                onEndReached={() => {
                    if (paginated.length < filtered.length) setPage((p) => p + 1);
                }}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={<Text className="text-center mt-10">No products found</Text>}
                contentContainerStyle={{ paddingBottom: 60 }}
            />
        </ScrollView>
    )
}