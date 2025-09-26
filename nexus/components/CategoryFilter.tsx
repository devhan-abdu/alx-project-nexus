import { Category } from "@/interface";
import { Text, View } from "react-native";
import { CategorySkeletonOne } from "./SkeletonLoader";

type Props = {
    categories: Category[];
    selectedCategory: number | 'All';
    onSelect: (categoryId: number | 0) => void;
    isLoading: boolean;
};

export const CategoryFilter = ({ categories, selectedCategory, onSelect, isLoading }: Props) => {
  if (isLoading) {
    
    return (
     <View className="flex-row flex-wrap gap-2 mb-4">
        {
            Array.from({length: 5}).map((_, i) => <CategorySkeletonOne key={i} />)
        }
     </View>)
  }

 return (
    <View className="flex-row flex-wrap gap-2 mb-4">
      {[
        { id: 0, name: 'All' },
        ...categories
      ].map((category) => (
        <Text
          key={category.id}
          onPress={() => onSelect(category.id)}
          className={`px-3 py-2 rounded-full ${selectedCategory === category.id ? 'bg-primary text-white' : ''}`}
        >
          {category.name}
        </Text>
      ))}
    </View>
  );
}