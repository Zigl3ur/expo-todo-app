import { colors } from "@/lib/colors";
import { StyleSheet, TextInput } from "react-native";

interface InputProps {
  variant?: "full";
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export default function Input({
  variant,
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <TextInput
      style={[styles.input, variant === "full" && { height: 100 }]}
      placeholder={placeholder}
      value={value}
      onChangeText={(e) => onChange(e)}
      multiline={variant === "full"}
      textAlignVertical={variant === "full" ? "top" : "auto"}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    fontSize: 16,
    backgroundColor: colors.lightGray,
    borderRadius: 10,
  },
});
