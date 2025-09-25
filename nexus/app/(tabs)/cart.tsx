import { PRODUCTS } from "@/data/mockProduct";
import { Product } from "@/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SwipeListView } from 'react-native-swipe-list-view';

const CartCard = ({ product }: { product: Product }) => {
    return (
        <View className="flex-row items-center bg-white shadow-white shadow-xl px-2 py-4 mt-2 rounded-xl">

            <Image source={product.image} className="w-20 h-20" style={{ resizeMode: 'contain' }} />
            <View className="flex-1 px-4">
                <Text className="text-lg font-bold">{product.title}</Text>
                <Text className="text-md text-gray-600 mt-1 font-bold">${product.price}</Text>
            </View>
            <View className="flex-row items-center gap-4 self-end">


                <TouchableOpacity onPress={() => console.log("Delete")}>
                    <Ionicons name="remove-circle" size={24} />
                </TouchableOpacity>
                <Text>1</Text>
                <TouchableOpacity onPress={() => console.log("Delete")}>
                    <Ionicons name="add-circle" size={24} color="#C7326A" />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default function CartScreen() {
    const [cartItems, setCartItems] = useState<Product[]>(PRODUCTS);

    const handleDelete = (rowKey: string) => {
        const newData = cartItems.filter((item) => item.id !== rowKey);
        setCartItems(newData);
    };
    return (
        <ScrollView className="bg-foreground px-3 pt-4">
      <Text className="my-2 text-xl font-bold px-2">
            Your Cart
      </Text>

            <SwipeListView
                data={cartItems}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                renderItem={({ item }) => <CartCard product={item} />}
                renderHiddenItem={(data, rowMap) => (
                    <View className="w-64 ml-auto flex-1 flex-row justify-end items-center my-2 bg-red-500/90 mx-0 rounded-xl px-4">
                        <TouchableOpacity
                            onPress={() => handleDelete(data.item.id)}
                        >
                            <Ionicons name="trash" size={28} color="#fff" />
                        </TouchableOpacity>
                    </View>
                )}

                rightOpenValue={-75}
                disableRightSwipe
            />
            <View className="flex-row items-center justify-between p-4  my-4">
                <Text className="text-2xl font-bold ">Total</Text>
                <Text className="font-semibold">$ 9999</Text>
            </View>
            <TouchableOpacity>
                <View className="bg-primary p-4 rounded-sm items-center mb-10">
                    <Text className="text-white font-bold text-lg">Proceed to Checkout</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}