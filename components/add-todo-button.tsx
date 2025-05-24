import { colors } from "@/lib/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

export default function AddTodoButton() {
  return (
    <Pressable onPress={() => router.navigate("/todo/create")}>
      <View style={styles.addButton}>
        <Ionicons name="add" size={20} color={"white"} />
      </View>
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
