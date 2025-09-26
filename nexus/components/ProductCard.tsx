import { useAppDispatch } from '@/redux/hooks';
import { addCartItem } from '@/redux/slices/cartSlice';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { CartItems, Product } from '../interface';

type Props = {
    product: Product;
};

export default function ProductCard({ product }: Props) {

    const dispatch = useAppDispatch();

    const addToCart = (product: Product) => {
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
    return (
        <Link href={{ pathname: "/product/[id]", params: { id: product.id } }} asChild >
        <TouchableOpacity
            activeOpacity={0.9}
            className="flex-1 bg-white rounded-xl shadow-white shadow-2xl overflow-hidden m-2 py-2"
            style={{ minWidth: 0 }}
        >
            <Image source={{ uri: product.image }} className="w-full h-36" style={{ resizeMode: 'contain' }} />
            <View className="p-3">
                <Text numberOfLines={1} className="text-lg font-bold">
                    {product.title}
                </Text>
                <View className='flex-row items-center justify-between gap-4'>
                    <Text className="text-md text-gray-600 mt-1 font-bold">
                        ${product.price}
                    </Text>
                    <TouchableOpacity onPress={() => addToCart(product)}  className ="bg-primary p-2 rounded-full" >
                        <Ionicons name="cart" size={18} color="#fff" />
                    </TouchableOpacity>
                </View>

            </View>

        </TouchableOpacity>
         </Link>
    )
}