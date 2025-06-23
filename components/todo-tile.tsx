import { useRefetchTodos, useSettings, useThemeColors } from "@/lib/hooks";
import { todo } from "@/types/types";
import { Checkbox } from "expo-checkbox";
import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { deleteTodoById, updateTodoState } from "../lib/db";

interface TodoProps {
  todo: todo;
}

export default function TodoTile({ todo }: TodoProps) {
  const db = useSQLiteContext();
  const { settings } = useSettings();
  const { theme } = useThemeColors();
  const { refetch, setRefetch } = useRefetchTodos();

  const [checked, setChecked] = useState<boolean>(Boolean(todo.isDone));

  const validateTodo = () => {
    if (settings.deleteOnComplete) {
      if (checked) {
        setChecked(!checked);
      } else {
        deleteTodoById(db, todo.id.toString()).then(() => setRefetch(!refetch));
      }
    } else {
      updateTodoState(db, todo.id.toString(), !checked).then((success) => {
        success && setChecked(!checked);
      });
    }
  };

  return (
    <Pressable
      style={styles.pressable}
      onPress={validateTodo}
      onLongPress={() => router.navigate(`/todo/${todo.id}`)}
    >
      <View style={[styles.card, { backgroundColor: theme.foreground }]}>
        <View style={styles.content}>
          <Checkbox
            color={checked ? theme.border : theme.primary}
            value={checked}
            onValueChange={validateTodo}
          />

          {/* Todo Title */}
          <Text
            style={[
              [styles.title, { color: theme.text }],
              checked && [styles.titleDone, { color: theme.border }],
              todo.priority &&
                !checked && {
                  color: settings.priorityColor,
                },
            ]}
          >
            {todo.title}
          </Text>
        </View>

        {/* Todo Desc */}
        {todo.description && (
          <Text
            style={[
              [styles.description, { color: theme.text }],
              checked && { color: theme.border },
            ]}
          >
            {todo.description}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    paddingVertical: 8,
  },
  card: {
    padding: 16,
    borderRadius: 15,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    flex: 1,
    flexWrap: "wrap",
    fontWeight: "bold",
    fontSize: 26,
  },
  titleDone: {
    textDecorationLine: "line-through",
  },
  description: {
    fontSize: 16,
    paddingLeft: 30,
  },
});
