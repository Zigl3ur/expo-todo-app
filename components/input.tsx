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
      style={[styles.input, variant && { flex: 0.7 }]}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.nativeEvent.text)}
      multiline={variant === "full"}
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
