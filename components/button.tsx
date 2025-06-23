import { useThemeColors } from "@/lib/hooks";
import { ColorValue, Pressable, StyleSheet, Text, View } from "react-native";

interface ButtonProps {
  content: string | React.ReactNode;
  color: ColorValue;
  disabled?: boolean;
  onPress: () => void;
}

export default function Button({
  content,
  color,
  disabled,
  onPress,
}: ButtonProps) {
  const { theme } = useThemeColors();

  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <View
        style={[
          styles.view,
          { backgroundColor: color },
          disabled && { backgroundColor: theme.border },
        ]}
      >
        {typeof content === "string" ? (
          <Text style={styles.text}>{content}</Text>
        ) : (
          content
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  view: {
    borderRadius: 10,
    padding: 15,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
