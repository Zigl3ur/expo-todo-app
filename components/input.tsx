import { colors } from "@/lib/colors";
import { Ref } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface InputProps {
  variant?: "full";
  inputRef?: Ref<TextInput>;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onSubmitEditing?: () => void;
}

export default function Input({
  variant,
  inputRef,
  placeholder,
  value,
  error,
  onChange,
  onSubmitEditing,
}: InputProps) {
  return (
    <View>
      <TextInput
        style={[
          styles.input,
          variant === "full" && { height: 100 },
          error && styles.errorBorder,
        ]}
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        returnKeyType="next"
        placeholderTextColor={"white"}
        onChangeText={(e) => onChange(e)}
        onSubmitEditing={onSubmitEditing}
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
    borderColor: colors.ultraLightGray,
    padding: 15,
    fontSize: 16,
    backgroundColor: colors.ultraLightGray,
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
