import { init } from "@/lib/db";
import { useThemeColors } from "@/lib/hooks";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { Tabs } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect } from "react";

export default function TabsLayout() {
  const db = useSQLiteContext();
  const { theme } = useThemeColors();

  // init query to populate db with one placeholder todo
  useEffect(() => {
    const initQuery = async () => await init(db);

    initQuery();
  }, [db]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.foreground,
          borderTopColor: theme.foreground,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Todos",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="tasks"
              size={20}
              color={focused ? theme.primary : theme.text}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="settings-sharp"
              size={20}
              color={focused ? theme.primary : theme.text}
            />
          ),
        }}
      />
    </Tabs>
  );
}
