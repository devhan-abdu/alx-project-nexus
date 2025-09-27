import { CartItems } from "@/interface";
import { useAppDispatch } from "@/redux/hooks";
import { decreaseCartQuantity, increaseCartQuantity } from "@/redux/slices/cartSlice";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function CartCard({ cartItem }: { cartItem: CartItems }) {
    const dispatch = useAppDispatch();
    return (
        <View className="flex-row items-center bg-white shadow-white shadow-xl px-2 py-4 mt-2 rounded-xl">

            <Image source={{ uri: cartItem.image }} className="w-20 h-20" style={{ resizeMode: 'contain' }} />
            <View className="flex-1 px-4">
                <Text className="text-lg font-bold">{cartItem.title}</Text>
                <Text className="text-md text-gray-600 mt-1 font-bold">${cartItem.price}</Text>
            </View>
            <View className="flex-row items-center gap-4 self-end">
                <TouchableOpacity onPress={() => dispatch(decreaseCartQuantity(cartItem.productId))}>
                    <Ionicons name="remove" size={24} />
                </TouchableOpacity>
                <Text>{cartItem.quantity}</Text>
                <TouchableOpacity onPress={() => dispatch(increaseCartQuantity(cartItem.productId))}>
                    <Ionicons name="add-circle" size={24} color="#C7326A" />
                </TouchableOpacity>
            </View>

        </View>
    )
}

