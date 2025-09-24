import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from 'react-native';

export default function TabsLayout() {
    const router = useRouter();
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#C7326A',
                headerStyle: {
                    backgroundColor: '#FFFFF0',
                },
                headerShadowVisible: false,
                headerTintColor: '#000',
                tabBarStyle: {
                    backgroundColor: '#FFFFF0',
                },
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => {
                            router.push("/cart")
                        }}
                        style={{ marginRight: 20 }}
                    >
                        <View className="relative p-2 bg-primary/10 rounded-full">
                            <Ionicons name="cart-outline" size={28} color="#000" />

                            <View className="absolute -top-1 -right-1 bg-primary w-5 h-5 rounded-full items-center justify-center">
                                <Text className="text-xs text-white font-bold">6</Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                ),
            }}
        >
            <Tabs.Screen name="index" options={{
                title: 'Home', tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'home-sharp' : 'home-outline'} size={24} color={color} />
                )
            }} />
            <Tabs.Screen name="search" options={{
                title: 'Search', tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'search-sharp' : 'search-outline'} size={24} color={color} />
                )
            }} />
            <Tabs.Screen name="product" options={{
                title: 'Product', tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'pricetag-sharp' : 'pricetag-outline'} size={24} color={color} />
                )
            }} />
            <Tabs.Screen name="cart" options={{
                title: 'Cart', tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'cart-sharp' : 'cart-outline'} size={24} color={color} />
                )
            }} />
        </Tabs>
    )
}