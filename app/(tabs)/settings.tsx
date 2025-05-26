import ColorPicker from "@/components/color-picker";
import SwitchSettings from "@/components/custom-switch";
import { colors } from "@/lib/colors";
import { dropTodos, insertTestData } from "@/lib/db";
import { useRefetchTodos, useSettings } from "@/lib/hooks";
import { SaveSettings } from "@/lib/settings";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import {
  Alert,
  ColorValue,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const db = useSQLiteContext();
  const { refetch, setRefetch } = useRefetchTodos();
  const { settings, setSettings } = useSettings();

  const [pickerColor, setPickerColor] = useState<ColorValue>(colors.red);
  const [switchValue, setSwitchValue] = useState<boolean>(
    settings.deleteOnComplete
  );

  // fetch settings
  useEffect(() => {
    setSwitchValue(settings.deleteOnComplete);
    setPickerColor(settings.priorityColor);
  }, [setSwitchValue, settings.deleteOnComplete, settings.priorityColor]);

  // save settings when they change
  useEffect(() => {
    SaveSettings(settings);
  }, [settings]);

  const handleTodosDelete = () => {
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
    const newSettings = {
      ...settings,
      deleteOnComplete: !settings.deleteOnComplete,
    };
    setSettings(newSettings);
    setSwitchValue(newSettings.deleteOnComplete);
  };

  const handlePickerChange = (value: ColorValue) => {
    const newSettings = {
      ...settings,
      priorityColor: value,
    };
    setSettings(newSettings);
    setPickerColor(value);
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
          <View>
            <View style={styles.pressable}>
              <Ionicons name="color-palette" size={20} />
              <Text style={styles.text}>Todo priority color</Text>
            </View>
            <ColorPicker color={pickerColor} onChange={handlePickerChange} />
          </View>
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
          <Pressable onPress={handleTodosDelete} style={styles.pressable}>
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
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
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
