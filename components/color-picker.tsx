import { colors } from "@/lib/colors";
import { Picker } from "@react-native-picker/picker";
import { ColorValue } from "react-native";

interface ColorPickerProps {
  color: ColorValue;
  onChange: (color: ColorValue) => void;
}

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  return (
    <Picker selectedValue={color} onValueChange={onChange}>
      {colors.priorityColors.map((color) => (
        <Picker.Item
          key={color.value}
          label={color.name}
          value={color.value}
          color={color.value}
        />
      ))}
    </Picker>
  );
}
