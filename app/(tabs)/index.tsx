import TodoTile from "@/lib/components/todo-tile";
import { getTodos } from "@/lib/db";
import { todo } from "@/types/types";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets();
  const db = useSQLiteContext();
  const [todos, setTodos] = useState<todo[]>([]);

  useEffect(() => {
    getTodos(db).then((allRows) => {
      setTodos(allRows);
    });
  }, [db]);

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <ScrollView style={styles.container}>
        {todos.map((todo) => (
          <TodoTile key={todo.id} todo={todo} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
