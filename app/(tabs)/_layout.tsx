import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { Tabs } from "expo-router";
import React from "react";

export default function RootLayout() {
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
              color={focused ? "rgb(63, 142, 247)" : "gray"}
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
              color={focused ? "rgb(63, 142, 247)" : "gray"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
