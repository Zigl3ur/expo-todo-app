import LoadingScreen from "@/components/loading-screen";
import { colors } from "@/lib/colors";
import {
  RefetchContext,
  SettingsContext,
  ThemeContext,
  ThemeValue,
} from "@/lib/contexts";
import { ReadSettings } from "@/lib/settings";
import { settings } from "@/types/types";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const [settings, setSettings] = useState<settings>({
    theme: "system",
    priorityColor: colors.priorityColors[0].value,
    deleteOnComplete: false,
  });
  const [refetch, setRefetch] = useState<boolean>(false);

  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeValue>("system");

  const actualTheme =
    settings.theme === "system" ? colorScheme || "light" : settings.theme;
  const themeColors = actualTheme === "dark" ? colors.dark : colors.light;

  // get saved settings on mount
  useEffect(() => {
    ReadSettings().then((settings) => {
      setSettings(settings);
      setTheme(settings.theme);
    });
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Suspense fallback={<LoadingScreen />}>
          <SQLiteProvider databaseName="app.db" useSuspense>
            <RefetchContext.Provider value={{ refetch, setRefetch }}>
              <StatusBar style={actualTheme === "dark" ? "light" : "dark"} />
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: themeColors.background },
                }}
              >
                <Stack.Screen name="(tabs)" />
                <Stack.Screen
                  name="todo/create"
                  options={{
                    presentation: "formSheet",
                    sheetAllowedDetents: [0.5, 0.7],
                    sheetGrabberVisible: true,
                  }}
                />
                <Stack.Screen
                  name="todo/[id]"
                  options={{
                    presentation: "formSheet",
                    sheetAllowedDetents: [0.5, 0.7],
                    sheetGrabberVisible: true,
                  }}
                />
              </Stack>
            </RefetchContext.Provider>
          </SQLiteProvider>
        </Suspense>
      </ThemeContext.Provider>
    </SettingsContext.Provider>
  );
}
