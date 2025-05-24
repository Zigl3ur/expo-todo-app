import { dropTodos, insertTestData } from "@/lib/db";
import { useRefetchTodos } from "@/lib/hooks";
import { useSQLiteContext } from "expo-sqlite";
import { Button, StyleSheet } from "react-native";
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

  const handleTestData = () => {
    insertTestData(db).then(() => {
      setRefetch(!refetch);
    });
  };

  return (
    <SafeAreaView style={styles.safeview}>
      <Button title="test_data" onPress={handleTestData} />
      <Button title="drop db" onPress={handleTodosDrop} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeview: { flex: 1, paddingHorizontal: 10, paddingTop: 10 },
});
