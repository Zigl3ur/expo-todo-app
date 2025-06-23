import AddTodoButton from "@/components/add-todo-button";
import SearchBar from "@/components/search-bar";
import TodoTile from "@/components/todo-tile";
import { getTodos, searchTodos } from "@/lib/db";
import { useRefetchTodos, useThemeColors } from "@/lib/hooks";
import { todo } from "@/types/types";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets();
  const db = useSQLiteContext();
  const { refetch } = useRefetchTodos();
  const { theme } = useThemeColors();

  const [search, setSearch] = useState<string>("");
  const [todos, setTodos] = useState<todo[]>([]);

  // debounce ?
  const handleSearch = (value: string) => {
    setSearch(value);
    if (value.trim() === "") {
      getTodos(db).then((allRows) => {
        setTodos(allRows);
      });
    } else
      searchTodos(db, value).then((result) => {
        setTodos(result);
      });
  };

  useEffect(() => {
    getTodos(db).then((allRows) => {
      setTodos(allRows);
    });
  }, [db, refetch]);

  return (
    <View
      style={[
        styles.view,
        { paddingTop: insets.top, backgroundColor: theme.background },
      ]}
    >
      <View style={styles.searchView}>
        <SearchBar
          placeholder="Search Todos..."
          value={search}
          onChange={handleSearch}
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
          <Text style={[styles.textNoTodos, { color: theme.text }]}>
            No todos found
          </Text>
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
