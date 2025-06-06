import { colors } from "@/lib/colors";
import { init } from "@/lib/db";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { Tabs } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect } from "react";

export default function TabsLayout() {
  const db = useSQLiteContext();

  // init query to populate db with one placeholder todo
  useEffect(() => {
    const initQuery = async () => await init(db);

    initQuery();
  }, [db]);

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Todos",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="tasks"
              size={20}
              color={focused ? colors.blue : colors.darkGray}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="settings-sharp"
              size={20}
              color={focused ? colors.blue : colors.darkGray}
            />
          ),
        }}
      />
    </Tabs>
  );
}
