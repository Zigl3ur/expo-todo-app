import { dropTodos } from "@/lib/db";
import { useRefetchTodos } from "@/lib/hooks";
import { useSQLiteContext } from "expo-sqlite";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const db = useSQLiteContext();
  const { refetch, setRefetch } = useRefetchTodos();

  const handleTodosDrop = () => {
    dropTodos(db).then(() => {
      setRefetch(!refetch);
      alert("Todos have been deleted !");
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>settings</Text>
      <Button title="drop db" onPress={handleTodosDrop} />
    </SafeAreaView>
  );
}
