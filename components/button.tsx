import { colors } from "@/lib/colors";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ButtonProps {
  text: string;
  onPress: () => void;
}

export default function Button({ text, onPress }: ButtonProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.view}>
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
