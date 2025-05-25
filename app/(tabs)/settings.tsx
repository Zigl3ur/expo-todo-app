import SwitchSettings from "@/components/switch-settings";
import { colors } from "@/lib/colors";
import { dropTodos, insertTestData } from "@/lib/db";
import { useRefetchTodos, useSettings } from "@/lib/hooks";
import { SaveSettings } from "@/lib/settings";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const db = useSQLiteContext();
  const { refetch, setRefetch } = useRefetchTodos();
  const { settings, setSettings } = useSettings();

  const [switchValue, setSwitchValue] = useState<boolean>(
    settings.deleteOnComplete
  );

  // fetch settings
  useEffect(() => {
    setSwitchValue(settings.deleteOnComplete);
  }, [setSwitchValue, settings.deleteOnComplete]);

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

  const handleSwitch = () => {
    const newSettings = { deleteOnComplete: !settings.deleteOnComplete };
    setSettings(newSettings);
    setSwitchValue(newSettings.deleteOnComplete);
    SaveSettings(newSettings);
  };

  return (
    <SafeAreaView style={styles.safeview}>
      <View>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.view}>
          <Pressable onPress={handleTestData} style={styles.pressable}>
            <FontAwesome5 name="database" size={20} />
            <Text style={styles.text}>Add test data</Text>
          </Pressable>
        </View>
      </View>
      <View>
        <Text style={[styles.title, { color: colors.red }]}>Danger Zone</Text>
        <View style={styles.view}>
          <SwitchSettings
            value={switchValue}
            onChange={handleSwitch}
            text="Delete todo on complete"
          />
          <Pressable onPress={handleTodosDrop} style={styles.pressable}>
            <FontAwesome5 name="trash" size={20} color={colors.red} />
            <Text style={[styles.text, { color: colors.red }]}>
              Delete all todos
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeview: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    gap: 30,
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
    fontWeight: "600",
  },
  title: {
    fontSize: 26,
    fontWeight: "500",
    marginBottom: 5,
  },
});
