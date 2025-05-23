import TodoTile from "@/components/todo-tile";
import { colors } from "@/lib/colors";
import { getTodos } from "@/lib/db";
import { useRefetchTodos } from "@/lib/hooks";
import { todo } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets();
  const db = useSQLiteContext();
  const { refetch } = useRefetchTodos();

  const [todos, setTodos] = useState<todo[]>([]);

  useEffect(() => {
    getTodos(db).then((allRows) => {
      setTodos(allRows);
    });
  }, [db, refetch]);

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <ScrollView style={styles.container}>
        {todos.map((todo) => (
          <TodoTile key={todo.id} todo={todo} />
        ))}
      </ScrollView>
      <Pressable
        style={styles.addButton}
        onPress={() => router.navigate("/todo/create")}
      >
        <Ionicons name="add" color={"white"} size={25} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  addButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: colors.blue,
    height: 65,
    width: 65,
    right: 0,
    bottom: 0,
    margin: 25,
  },
});
