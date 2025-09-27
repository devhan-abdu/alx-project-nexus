import CartCard from "@/components/CartCard";
import EmptyCart from "@/components/EmptyCart";
import { CartItems } from "@/interface";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeCartItem, selectCartItems, selectTotalPrice } from "@/redux/slices/cartSlice";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, TouchableOpacity, View } from "react-native";
import { SwipeListView } from 'react-native-swipe-list-view';



export default function CartScreen() {
    const cartItems: CartItems[] = useAppSelector(selectCartItems)
    const totalPrice: number = useAppSelector(selectTotalPrice)
    const dispatch = useAppDispatch();


    return (
        <View className="bg-foreground px-3 pt-4 min-h-screen">
            <Text className="my-2 text-xl font-bold px-2">
                Your Cart
            </Text>

            {
                cartItems?.length < 1 ?
                    <EmptyCart />
                    : (
                        <View>
                            <SwipeListView
                                data={cartItems}
                                keyExtractor={(item) => item.productId.toString()}
                                renderItem={({ item }) => <CartCard cartItem={item} />}
                                renderHiddenItem={(data, rowMap) => (
                                    <View className="flex-1 flex-row justify-end items-center my-2 bg-red-100 rounded-xl px-4">
                                        <TouchableOpacity
                                            onPress={() => dispatch(removeCartItem(data.item.productId))}
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
                        </View>
                    )
            }


        </View>
    )
}