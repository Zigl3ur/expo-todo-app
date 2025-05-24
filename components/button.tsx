import { colors } from "@/lib/colors";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ButtonProps {
  text: string;
  disabled: boolean;
  onPress: () => void;
}

export default function Button({ text, disabled, onPress }: ButtonProps) {
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <View
        style={[styles.view, disabled && { backgroundColor: colors.lightGray }]}
      >
        <Text style={styles.text}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.blue,
    borderRadius: 10,
    padding: 15,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
