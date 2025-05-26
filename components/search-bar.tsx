import { colors } from "@/lib/colors";
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
  return (
    <View style={styles.view}>
      <Ionicons name="search" size={20} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={(e) => onChange(e)}
        placeholder={placeholder}
        placeholderTextColor={colors.darkGray}
      />
      <Ionicons
        name="close-circle"
        size={20}
        color={colors.darkGray}
        onPress={() => onChange("")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.lightGray,
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
