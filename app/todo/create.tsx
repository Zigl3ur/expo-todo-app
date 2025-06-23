import Button from "@/components/button";
import CustomSwitch from "@/components/custom-switch";
import Input from "@/components/input";
import { createTodo } from "@/lib/db";
import { useRefetchTodos, useThemeColors } from "@/lib/hooks";
import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function CreateTodoScreen() {
  const db = useSQLiteContext();
  const { refetch, setRefetch } = useRefetchTodos();
  const { theme } = useThemeColors();

  const descriptionInput = useRef<TextInput>(null);
  const [title, setTitle] = useState<string>("");
  const [titleError, setTittleError] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<boolean>(false);

  // check if a todo title is provided
  useEffect(() => {
    if (title.length === 0) setTittleError("A todo title is needed");
    else setTittleError("");
  }, [title]);

  const handleCreateTodo = () => {
    createTodo(db, title, description, priority).then(() => {
      setRefetch(!refetch);
      router.dismiss();
    });
  };

  return (
    <View style={[styles.view, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>New Todo</Text>

      <View style={{ gap: 10 }}>
        <Input
          placeholder="Title..."
          value={title}
          error={titleError}
          onChange={setTitle}
          onSubmitEditing={() => descriptionInput.current?.focus()}
        />
        <Input
          variant="full"
          inputRef={descriptionInput}
          placeholder="Description..."
          value={description}
          onChange={setDescription}
        />
      </View>
      <CustomSwitch
        text="High Priority"
        value={priority}
        onChange={setPriority}
      />
      <Button
        content="Save"
        color={theme.primary}
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
    fontWeight: "800",
  },
});
