import { CartItems } from "@/interface";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { decreaseCartQuantity, increaseCartQuantity, removeCartItem, selectCartItems, selectTotalPrice } from "@/redux/slices/cartSlice";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SwipeListView } from 'react-native-swipe-list-view';

const CartCard = ({ cartItem }: { cartItem: CartItems }) => {
    const dispatch = useAppDispatch();
    return (
        <View className="flex-row items-center bg-white shadow-white shadow-xl px-2 py-4 mt-2 rounded-xl">

            <Image  source={{ uri: cartItem.image }} className="w-20 h-20" style={{ resizeMode: 'contain' }} />
            <View className="flex-1 px-4">
                <Text className="text-lg font-bold">{cartItem.title}</Text>
                <Text className="text-md text-gray-600 mt-1 font-bold">${cartItem.price}</Text>
            </View>
            <View className="flex-row items-center gap-4 self-end">
                <TouchableOpacity onPress={() => dispatch(decreaseCartQuantity(cartItem.productId))}>
                    <Ionicons name="remove" size={24}  />
                </TouchableOpacity>
                <Text>{cartItem.quantity}</Text>
                <TouchableOpacity onPress={() => dispatch(increaseCartQuantity(cartItem.productId))}>
                    <Ionicons name="add-circle" size={24} color="#C7326A" />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default function CartScreen() {
     const cartItems = useAppSelector(selectCartItems)
     const totalPrice = useAppSelector(selectTotalPrice)
     const dispatch = useAppDispatch();


    const handleDelete = (rowKey: number) => {
        const newData = cartItems.filter((item) => item.productId !== rowKey);
        dispatch(removeCartItem(rowKey));
    };
    return (
        <ScrollView className="bg-foreground px-3 pt-4">
      <Text className="my-2 text-xl font-bold px-2">
            Your Cart
      </Text>

            <SwipeListView
                data={cartItems}
                keyExtractor={(item) => item.productId.toString()}
                scrollEnabled={false}
                renderItem={({ item }) => <CartCard cartItem={item} />}
                renderHiddenItem={(data, rowMap) => (
                    <View className="w-64 ml-auto flex-1 flex-row justify-end items-center my-2 bg-red-100 mx-0 rounded-xl px-4">
                        <TouchableOpacity
                            onPress={() => handleDelete(data.item.productId)}
                        >
                            <Ionicons name="trash" size={28} color="#DC2626" />
                        </TouchableOpacity>
                    </View>
                )}

                rightOpenValue={-75}
                disableRightSwipe
            />
            <View className="flex-row items-center justify-between p-4  my-4">
                <Text className="text-2xl font-bold ">Total</Text>
                <Text className="font-semibold text-xl">${totalPrice}</Text>
            </View>
            <TouchableOpacity>
                <View className="bg-primary p-4 rounded-sm items-center mb-10">
                    <Text className="text-white font-bold text-lg">Proceed to Checkout</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}