import { CategoryFilter } from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";
import { ProductSkeleton } from "@/components/SkeletonLoader";
import { SortPicker } from "@/components/SortPicker";
import { Product, } from "@/interface";
import { useGetCategoriesQuery } from "@/redux/api/categoriesApi";
import { useGetProductsQuery } from "@/redux/api/productApi";
import { useMemo, useState } from "react";
import { Button, FlatList, ScrollView, Text, TextInput, View } from "react-native";

const PAGE_SIZE = 8;

export default function ProductScreen() {
    const { data: products, error: productError, isLoading: productIsLoading, refetch: refetchProducts } = useGetProductsQuery();
    const { data: categories, error: categoryError, isLoading: categoryIsLoading, refetch: refetchCategories } = useGetCategoriesQuery();

    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<0 | number>(0);
    const [sortOption, setSortOption] = useState<'default' | 'asc' | 'desc'>('default');
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        if (!products) return [];
        let result = products.filter((p: Product) => {
            const matchCategory = selectedCategory === 0 ? true : p.categoryId === selectedCategory;
            const matchQuery = p.title.toLowerCase().includes(query.toLowerCase()) || p.shortDesc.toLowerCase().includes(query.toLowerCase());
            return matchCategory && matchQuery;
        });

        if (sortOption === 'asc') result = result.sort((a, b) => a.price - b.price);
        if (sortOption === 'desc') result = result.sort((a, b) => b.price - a.price);
        return result;
    }, [products, query, selectedCategory, sortOption]);

    const paginated = filtered.slice(0, page * PAGE_SIZE);
    const hasNextPage = paginated.length < filtered.length;

    if (productError || categoryError) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text className="text-center mb-4">Failed to load data. Please try again later.</Text>
                <Button title="Retry Products" onPress={refetchProducts} />
                <Button title="Retry Categories" onPress={refetchCategories} />
            </View>
        );
    }
    return (
        <ScrollView className="px-4 py-4 bg-foreground">
            <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search products..."
                className="py-4 px-6 bg-primary/10 rounded-xl focus:outline focus:outline-primary mb-6"
            />

            <CategoryFilter
                categories={categories ?? []}
                selectedCategory={selectedCategory}
                onSelect={(id) => { setSelectedCategory(id); setPage(1); }}
                isLoading={categoryIsLoading}
            />

            <SortPicker sortOption={sortOption} onChange={(value) => { setSortOption(value); setPage(1); }} />


            {productIsLoading ? (
                <FlatList
                    data={Array.from({ length: 12 })}
                    keyExtractor={(_, index) => index.toString()}
                    numColumns={2}
                    scrollEnabled={false}
                    renderItem={({ index }) => <ProductSkeleton key={index} />}
                    columnWrapperStyle={{ gap: 16 }}
                    contentContainerStyle={{ gap: 16, marginBottom: 16 }}
                />
            ) : (
                <FlatList
                    data={paginated}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    scrollEnabled={false}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    renderItem={({ item }) => <ProductCard product={item} />}
                    onEndReached={() => { if (hasNextPage) setPage((p) => p + 1); }}
                    onEndReachedThreshold={0.5}
                    ListEmptyComponent={<Text className="text-center mt-10">No products found</Text>}
                    contentContainerStyle={{ paddingBottom: 60 }}
                />
            )}
        </ScrollView>
    )
}