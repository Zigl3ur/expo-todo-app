import Button from "@/components/button";
import Input from "@/components/input";
import { createTodo } from "@/lib/db";
import { useRefetchTodos } from "@/lib/hooks";
import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CreateTodoScreen() {
  const db = useSQLiteContext();
  const { refetch, setRefetch } = useRefetchTodos();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleCreateTodo = async () => {
    //TODO: zod
    createTodo(db, title, description).then(() => {
      setRefetch(!refetch);
      router.dismiss();
    });
  };

  return (
    <View style={styles.view}>
      <Text style={styles.title}>New Todo</Text>
      <View style={{ gap: 20 }}>
        <Input placeholder="Title..." value={title} onChange={setTitle} />
        <Input
          variant="full"
          placeholder="Description..."
          value={description}
          onChange={setDescription}
        />
      </View>
      <Button text="Save" onPress={handleCreateTodo} />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 20,
    gap: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
  },
});
