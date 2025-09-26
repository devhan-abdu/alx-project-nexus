import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";

type Props = {
  sortOption: 'default' | 'asc' | 'desc';
  onChange: (value: 'default' | 'asc' | 'desc') => void;
};

export const SortPicker = ({ sortOption, onChange }: Props) => (
  <View className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
    <Picker selectedValue={sortOption} onValueChange={onChange}>
      <Picker.Item label="Default" value="default" />
      <Picker.Item label="Price: Low to High" value="asc" />
      <Picker.Item label="Price: High to Low" value="desc" />
    </Picker>
  </View>
);
