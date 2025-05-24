import LoadingScreen from "@/components/loading-screen";
import { RefetchContext, SettingsContext } from "@/lib/contexts";
import { init } from "@/lib/db";
import { ReadSettings } from "@/lib/settings";
import { settings } from "@/types/types";
import { Stack } from "expo-router";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { Suspense, useEffect, useState } from "react";

export default function RootLayout() {
  const db = openDatabaseSync("app.db");

  const [settings, setSettings] = useState<settings>({
    deleteOnComplete: false,
  });
  const [refetch, setRefetch] = useState<boolean>(false);

  useEffect(() => {
    // TODO: do it prettier
    const runInit = async () => await init(db);

    runInit();
    ReadSettings().then((settings) => setSettings(settings));
  });

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      <RefetchContext.Provider value={{ refetch, setRefetch }}>
        <Suspense fallback={<LoadingScreen />}>
          <SQLiteProvider databaseName="app.db" useSuspense>
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
          </SQLiteProvider>
        </Suspense>
      </RefetchContext.Provider>
    </SettingsContext.Provider>
  );
}
