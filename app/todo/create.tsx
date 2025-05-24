import Button from "@/components/button";
import Input from "@/components/input";
import { createTodo } from "@/lib/db";
import { useRefetchTodos } from "@/lib/hooks";
import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CreateTodoScreen() {
  const db = useSQLiteContext();
  const { refetch, setRefetch } = useRefetchTodos();

  const [title, setTitle] = useState<string>("");
  const [titleError, setTittleError] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string>("");

  // check if a todo title is provided
  useEffect(() => {
    if (title.length === 0) setTittleError("A todo title is needed");
    else setTittleError(undefined);
  }, [title]);

  const handleCreateTodo = () => {
    createTodo(db, title, description).then(() => {
      setRefetch(!refetch);
      router.dismiss();
    });
  };

  return (
    <View style={styles.view}>
      <Text style={styles.title}>New Todo</Text>
      <View style={{ gap: 10 }}>
        <Input
          placeholder="Title..."
          value={title}
          error={titleError}
          onChange={setTitle}
        />
        <Input
          variant="full"
          placeholder="Description..."
          value={description}
          onChange={setDescription}
        />
      </View>
      <Button
        text="Save"
        disabled={titleError ? true : false}
        onPress={handleCreateTodo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
  },
});
