import { todo } from "@/types/types";
import { Checkbox } from "expo-checkbox";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { updateTodoState } from "../db";

interface TodoProps {
  todo: todo;
}

export default function TodoTile({ todo }: TodoProps) {
  const db = useSQLiteContext();

  const [checked, setChecked] = useState<boolean>(
    todo.isDone === 0 ? false : true
  );

  const validateTodo = () => {
    updateTodoState(db, todo.id, !checked).then((success) => {
      success && setChecked(!checked);
    });
  };

  return (
    <Pressable style={styles.container} onPress={validateTodo}>
      <View style={styles.innerContainer}>
        <Checkbox
          color="#4b5563"
          value={checked}
          onValueChange={validateTodo}
        />
        <Text style={[styles.title, checked && styles.titleChecked]}>
          {todo.title}
        </Text>
      </View>
      <Text style={[styles.description, checked && styles.descriptionChecked]}>
        {todo.description}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#6b7280",
    paddingVertical: 8,
    marginHorizontal: 20,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  titleChecked: {
    textDecorationLine: "line-through",
    color: "#4b5563",
  },
  description: {
    paddingHorizontal: 32,
  },
  descriptionChecked: {
    color: "#9ca3af",
  },
});
