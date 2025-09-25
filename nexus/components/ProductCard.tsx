import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Product } from '../types';

type Props = {
    product: Product;   
};

export default function ProductCard({ product}: Props) {
    return (
        // <Link href={{ pathname: "/product/[id]", params: { id: product.id } }} asChild >
            <TouchableOpacity
            activeOpacity={0.9}
            className="flex-1 bg-white rounded-xl shadow-white shadow-2xl overflow-hidden m-2 py-2"
            style ={{ minWidth: 0}}
            >
                <Image source={product.image} className="w-full h-36" style={{ resizeMode: 'contain'}}/>
                <View className="p-3">
                    <Text numberOfLines={1} className="text-lg font-bold">
                        {product.title}
                    </Text>
                    <View className='flex-row items-center justify-between gap-4'>
                       <Text className="text-md text-gray-600 mt-1 font-bold">
                        ${product.price}
                    </Text>
                    <Ionicons name='cart' size={18} className='bg-primary text-white p-2 rounded-full' color={"#fff"}/>
                    </View>
                   
                </View>

            </TouchableOpacity>
        // </Link>
    )
}