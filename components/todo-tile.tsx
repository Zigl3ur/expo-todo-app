import { colors } from "@/lib/colors";
import { todo } from "@/types/types";
import { Checkbox } from "expo-checkbox";
import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { updateTodoState } from "../lib/db";

interface TodoProps {
  todo: todo;
}

export default function TodoTile({ todo }: TodoProps) {
  const db = useSQLiteContext();

  const [checked, setChecked] = useState<boolean>(
    todo.isDone === 0 ? false : true
  );

  const validateTodo = useCallback(() => {
    updateTodoState(db, todo.id, !checked).then((success) => {
      success && setChecked(!checked);
    });
  }, [db, todo.id, checked]);

  return (
    <Pressable
      style={styles.pressable}
      onPress={validateTodo}
      onLongPress={() => router.navigate(`/todo/${todo.id}`)}
    >
      <View style={{ paddingVertical: 16 }}>
        <View style={styles.content}>
          <Checkbox
            color={checked ? colors.lightGray : colors.darkGray}
            value={checked}
            onValueChange={validateTodo}
          />

          {/* Todo Title */}
          <View>
            <Text
              style={[styles.title, checked && { color: colors.lightGray }]}
            >
              {todo.title}
            </Text>
            {checked && <View style={styles.line} />}
          </View>
        </View>

        {/* Todo Desc */}
        {todo.description && (
          <Text
            style={[styles.description, checked && { color: colors.lightGray }]}
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
    borderBottomWidth: 2,
    borderStyle: "dashed",
    borderColor: "#6b7280",
    paddingVertical: 8,
    marginHorizontal: 20,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  line: {
    position: "absolute",
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.lightGray,
    top: "50%",
    left: -2,
    right: -2,
  },
  description: {
    color: colors.darkGray,
    fontSize: 16,
    paddingLeft: 30,
  },
});
