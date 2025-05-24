import { colors } from "@/lib/colors";
import { dropTodos, insertTestData } from "@/lib/db";
import { useRefetchTodos } from "@/lib/hooks";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const db = useSQLiteContext();
  const { refetch, setRefetch } = useRefetchTodos();

  const handleTodosDrop = () => {
    Alert.alert(
      "Delete All Todos",
      "Are you sure, you want to delete all todos ?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
            return;
          },
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () =>
            dropTodos(db).then(() => {
              setRefetch(!refetch);
            }),
        },
      ]
    );
  };

  const handleTestData = () => {
    Alert.alert("Success", "Test data successfully inserted !", [
      {
        text: "Ok",
        style: "default",
        onPress: () =>
          insertTestData(db).then(() => {
            setRefetch(!refetch);
          }),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeview}>
      <View style={styles.view}>
        <Pressable onPress={handleTestData} style={styles.pressable}>
          <FontAwesome5 name="database" size={20} />
          <Text style={styles.text}>Add test data</Text>
        </Pressable>
        <Pressable onPress={handleTodosDrop} style={styles.pressable}>
          <FontAwesome5 name="trash" size={20} color={colors.red} />
          <Text style={[styles.text, { color: colors.red }]}>
            Delete all todos
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeview: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  view: {
    borderRadius: 15,
    paddingHorizontal: 25,
    paddingVertical: 25,
    backgroundColor: colors.ultraLightGray,
    gap: 25,
  },
  pressable: {
    paddingVertical: 10,
    flexDirection: "row",
    alignContent: "center",
    gap: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
  },
});
