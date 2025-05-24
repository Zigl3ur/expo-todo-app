import { colors } from "@/lib/colors";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface InputProps {
  variant?: "full";
  placeholder: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

export default function Input({
  variant,
  placeholder,
  value,
  error,
  onChange,
}: InputProps) {
  return (
    <View>
      <TextInput
        style={[
          styles.input,
          variant === "full" && { height: 100 },
          error && styles.errorBorder,
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={(e) => onChange(e)}
        multiline={variant === "full"}
        textAlignVertical={variant === "full" ? "top" : "auto"}
      />
      <Text style={styles.errorLabel}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    padding: 15,
    fontSize: 16,
    backgroundColor: colors.lightGray,
    borderRadius: 10,
  },
  errorLabel: {
    color: colors.red,
    paddingLeft: 5,
    paddingTop: 2,
  },
  errorBorder: {
    borderWidth: 1,
    borderColor: colors.red,
  },
});
