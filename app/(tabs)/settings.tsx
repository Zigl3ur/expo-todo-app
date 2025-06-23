import ColorSelector from "@/components/color-selector";
import SwitchSettings from "@/components/custom-switch";
import ThemeSwitcher from "@/components/theme-switcher";
import { colors } from "@/lib/colors";
import { ThemeValue } from "@/lib/contexts";
import { dropTodos, insertTestData } from "@/lib/db";
import { useRefetchTodos, useSettings, useThemeColors } from "@/lib/hooks";
import { SaveSettings } from "@/lib/settings";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import {
  Alert,
  ColorValue,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const db = useSQLiteContext();
  const { refetch, setRefetch } = useRefetchTodos();
  const { settings, setSettings } = useSettings();
  const { actualTheme, setTheme, theme } = useThemeColors();

  const [color, setColor] = useState<ColorValue>(
    colors.priorityColors[0].value
  );
  const [switchValue, setSwitchValue] = useState<boolean>(
    settings.deleteOnComplete
  );

  // fetch settings
  useEffect(() => {
    setSwitchValue(settings.deleteOnComplete);
    setColor(settings.priorityColor);
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

  const handleTheme = (value: ThemeValue) => {
    const newSettings = {
      ...settings,
      theme: value,
    };
    setSettings(newSettings);
    setTheme(value);
  };

  const handleColorChange = (value: ColorValue) => {
    const newSettings = {
      ...settings,
      priorityColor: value,
    };
    setSettings(newSettings);
    setColor(value);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.background }}
      edges={["top", "left", "right"]}
    >
      <ScrollView
        style={[styles.scrollview, { backgroundColor: theme.background }]}
        contentContainerStyle={{ gap: 30 }}
      >
        <Text style={[styles.title, { color: theme.text }]}>Settings</Text>
        <View style={[styles.view, { backgroundColor: theme.foreground }]}>
          <Pressable onPress={handleTestData} style={styles.pressable}>
            <FontAwesome5 name="database" size={20} color={theme.text} />
            <Text style={[styles.text, { color: theme.text }]}>
              Add test data
            </Text>
          </Pressable>
          <View>
            <ThemeSwitcher
              actualTheme={actualTheme}
              theme={theme}
              onChange={handleTheme}
            />
          </View>
          <View>
            <ColorSelector
              theme={theme}
              color={color}
              onChange={handleColorChange}
            />
          </View>
        </View>

        <View>
          <Text style={[styles.title, { color: theme.accent }]}>
            Danger Zone
          </Text>
          <View style={[styles.view, { backgroundColor: theme.foreground }]}>
            <SwitchSettings
              value={switchValue}
              onChange={handleSwitch}
              text="Delete todo on complete"
            />
            <Pressable onPress={handleTodosDelete} style={styles.pressable}>
              <FontAwesome5 name="trash" size={20} color={theme.accent} />
              <Text style={[styles.text, { color: theme.accent }]}>
                Delete all todos
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollview: {
    paddingHorizontal: 20,
  },
  view: {
    borderRadius: 15,
    paddingHorizontal: 25,
    paddingVertical: 25,
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
