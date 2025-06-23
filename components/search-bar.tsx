import { useThemeColors } from "@/lib/hooks";
import { Ionicons } from "@expo/vector-icons";
import { Platform, StyleSheet, TextInput, View } from "react-native";

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  placeholder,
  value,
  onChange,
}: SearchBarProps) {
  const { theme } = useThemeColors();

  return (
    <View
      style={[
        styles.view,
        { backgroundColor: theme.foreground, borderColor: theme.border },
      ]}
    >
      <Ionicons name="search" size={20} color={theme.text} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={(e) => onChange(e)}
        placeholder={placeholder}
        placeholderTextColor={theme.text}
      />
      <Ionicons
        name="close-circle"
        size={20}
        color={theme.text}
        onPress={() => onChange("")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    // issue on text input, vertical padding was not the same between IOS and android
    // cause android apply a vertical padding by default to text input i guess
    ...Platform.select({
      android: {
        paddingVertical: 0,
      },
      ios: {
        paddingVertical: 8,
      },
    }),
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingLeft: 8,
    fontSize: 16,
  },
});
