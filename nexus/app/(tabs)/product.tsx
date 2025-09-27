import { CategoryFilter } from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";
import { SortPicker } from "@/components/SortPicker";
import { Product, } from "@/interface";
import { useGetCategoriesQuery } from "@/redux/api/categoriesApi";
import { useGetProductsQuery } from "@/redux/api/productApi";
import { useMemo, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";

const PAGE_SIZE = 8;
type SortOption = 'default' | 'asc' | 'desc';

export default function ProductsScreen() {
    const { data: products, error: productError, isLoading: productIsLoading, refetch: refetchProducts } = useGetProductsQuery();
    const { data: categories, error: categoryError, isLoading: categoryIsLoading, refetch: refetchCategories } = useGetCategoriesQuery();

    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const [sortOption, setSortOption] = useState<SortOption>('default');

    const [page, setPage] = useState(1);

    const filteredProducts: Product[] = useMemo(() => {
        if (!products) return [];
        let result = products.filter((p: Product) => {
            const matchCategory = selectedCategory === 0 ? true : p.categoryId === selectedCategory;
            const matchQuery = p.title.toLowerCase().includes(query.toLowerCase()) || p.shortDesc.toLowerCase().includes(query.toLowerCase());
            return matchCategory && matchQuery;
        });

        if (sortOption === 'asc') return [...result].sort((a, b) => a.price - b.price);
        if (sortOption === 'desc') return [...result].sort((a, b) => b.price - a.price);
        return result;
    }, [products, query, selectedCategory, sortOption]);

    const displayedProducts = filteredProducts.slice(0, page * PAGE_SIZE);
    const hasNextPage = displayedProducts.length < filteredProducts.length;

    const retry = () => {
        refetchProducts();
        refetchCategories();
    }

    if (productError || categoryError) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text className="text-center mb-4">Failed to load data. Please try again later.</Text>
                <Button title="Retry" onPress={retry} />
            </View>
        );
    }

    return (
        <View className="bg-foreground px-4 py-8">
            <FlatList
                data={displayedProducts}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item }) => <ProductCard product={item} />}
                onEndReached={() => hasNextPage && setPage(p => p + 1)}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={
                    <Text className="text-center mt-10">
                        {filteredProducts.length === 0 && query ? 'No products match your search.' : 'No products available.'}
                    </Text>
                }
                contentContainerStyle={{ paddingBottom: 20 }}
                ListHeaderComponent={
                    <>
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
                    </>
                }
            />
        </View>

    )
}