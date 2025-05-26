import LoadingScreen from "@/components/loading-screen";
import { colors } from "@/lib/colors";
import { RefetchContext, SettingsContext } from "@/lib/contexts";
import { ReadSettings } from "@/lib/settings";
import { settings } from "@/types/types";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense, useEffect, useState } from "react";

export default function RootLayout() {
  const [settings, setSettings] = useState<settings>({
    priorityColor: colors.red,
    deleteOnComplete: false,
  });
  const [refetch, setRefetch] = useState<boolean>(false);

  // get saved settings on mount
  useEffect(() => {
    ReadSettings().then((settings) => setSettings(settings));
  }, []);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <SQLiteProvider databaseName="app.db" useSuspense>
        <SettingsContext.Provider value={{ settings, setSettings }}>
          <RefetchContext.Provider value={{ refetch, setRefetch }}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen
                name="todo/create"
                options={{
                  headerShown: false,
                  presentation: "formSheet",
                  sheetAllowedDetents: [0.5, 0.7],
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
        </SettingsContext.Provider>
      </SQLiteProvider>
    </Suspense>
  );
}
