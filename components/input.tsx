import { colors } from "@/lib/colors";
import { useThemeColors } from "@/lib/hooks";
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
  const { theme } = useThemeColors();

  return (
    <View>
      <TextInput
        style={[
          styles.input,
          {
            color: theme.text,
            backgroundColor: theme.foreground,
            borderColor: theme.border,
          },
          variant === "full" && { height: 100 },
          error && [styles.errorBorder, { borderColor: theme.accent }],
        ]}
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        returnKeyType="next"
        placeholderTextColor={theme.border}
        onChangeText={(e) => onChange(e)}
        onSubmitEditing={onSubmitEditing}
        multiline={variant === "full"}
        textAlignVertical={variant === "full" ? "top" : "auto"}
      />
      {error && (
        <Text style={[styles.errorLabel, { color: theme.accent }]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 15,
    fontSize: 16,
    borderRadius: 10,
  },
  errorLabel: {
    paddingLeft: 5,
    paddingTop: 2,
  },
  errorBorder: {
    borderWidth: 1,
  },
});
