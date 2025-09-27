import { Link } from "expo-router";
import { Image, Text, View } from "react-native";

export default function EmptyCart() {
    return (
        <View className="flex-col items-center justify-between p-4 my-8">
            <Image source={require("@/assets/images/emptycart.png")} className="w-full h-64" />
            <Link
                href="/"
                className="bg-primary p-4 rounded-sm items-center mb-10"
            >
                <Text className="text-white font-bold text-lg">
                    Continue Shopping
                </Text>
            </Link>
        </View>
    );
}
