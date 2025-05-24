import AddTodoButton from "@/components/add-todo-button";
import SearchBar from "@/components/search-bar";
import TodoTile from "@/components/todo-tile";
import { getTodos } from "@/lib/db";
import { useRefetchTodos } from "@/lib/hooks";
import { todo } from "@/types/types";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets();
  const db = useSQLiteContext();
  const { refetch } = useRefetchTodos();

  const [search, setSearch] = useState<string>("");
  const [todos, setTodos] = useState<todo[]>([]);

  useEffect(() => {
    getTodos(db).then((allRows) => {
      setTodos(allRows);
    });
  }, [db, refetch]);

  return (
    <View style={[styles.view, { paddingTop: insets.top }]}>
      <View style={styles.searchView}>
        <SearchBar
          placeholder="Search Todos..."
          value={search}
          onChange={setSearch}
        />
        <AddTodoButton />
      </View>
      {todos.length !== 0 ? (
        <ScrollView>
          {todos.map((todo) => (
            <TodoTile key={todo.id} todo={todo} />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.viewNoTodos}>
          <Text style={styles.textNoTodos}>No todos</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  viewNoTodos: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textNoTodos: { fontWeight: "bold", fontSize: 25 },
});
