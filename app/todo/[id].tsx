import Button from "@/components/button";
import CustomSwitch from "@/components/custom-switch";
import Input from "@/components/input";
import { colors } from "@/lib/colors";
import { deleteTodoById, editTodos, getTodosById } from "@/lib/db";
import { useRefetchTodos } from "@/lib/hooks";
import { FontAwesome5 } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function EditTodoScreen() {
  const { id } = useLocalSearchParams();
  const db = useSQLiteContext();
  const { refetch, setRefetch } = useRefetchTodos();

  const descriptionInput = useRef<TextInput>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [titleError, setTittleError] = useState<string>("");
  const [priority, setPriority] = useState<boolean>(false);

  // fetch todo data
  useEffect(() => {
    getTodosById(db, id.toString()).then((todo) => {
      setTitle(todo.title);
      setDescription(todo.description || "");
      setPriority(Boolean(todo.priority));
    });
  }, [db, id]);

  // check if a todo title is provided
  useEffect(() => {
    if (title.length === 0) setTittleError("A todo title is needed");
    else setTittleError("");
  }, [title]);

  const handleEditTodo = () => {
    editTodos(db, id as string, title, description, priority).then(() => {
      setRefetch(!refetch);
      router.dismiss();
    });
  };

  const handleDeleteTodo = () => {
    deleteTodoById(db, id.toString()).then(() => {
      setRefetch(!refetch);
      router.dismiss();
    });
  };

  return (
    <View style={styles.view}>
      <Text style={styles.title}>Edit Todo</Text>
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
      <View style={styles.buttonView}>
        <View style={{ flex: 1 }}>
          <Button
            content="Save"
            color={colors.blue}
            disabled={titleError ? true : false}
            onPress={handleEditTodo}
          />
        </View>
        <Button
          content={<FontAwesome5 name="trash" size={20} color="white" />}
          color={colors.red}
          onPress={handleDeleteTodo}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  buttonView: {
    flexDirection: "row",
    gap: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
  },
});
