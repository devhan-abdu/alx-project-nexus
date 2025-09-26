import { Text, View } from "react-native";

export const CategorySkeletonOne = () => (
    <Text className="px-3 py-2 w-12 rounded-full bg-gray-100 animate-pulse" />
);
export const CategorySkeletonTwo = () => (
    <View className="items-center justify-center mr-4 bg-yellow-200">
        <View className="w-[28%] bg-gray-200 h-40 rounded-lg animate-pulse" />
        <Text className="mt-2 text-sm"/>
    </View>
);

export const ProductSkeleton = () => (
    <View className="w-[48%] bg-gray-200 h-40 rounded-lg animate-pulse" />
)