import { colors } from "@/lib/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

export default function AddTodoButton() {
  return (
    <Pressable
      style={styles.addButton}
      onPress={() => router.navigate("/todo/create")}
    >
      <Ionicons name="add" size={20} color={"white"} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: colors.blue,
    height: 30,
    width: 30,
  },
});
