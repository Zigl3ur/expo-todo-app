import LoadingScreen from "@/components/loading-screen";
import { RefetchContext } from "@/lib/contexts";
import { init } from "@/lib/db";
import { Stack } from "expo-router";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { Suspense, useEffect, useState } from "react";

export default function RootLayout() {
  const db = openDatabaseSync("app.db");

  useEffect(() => {
    const runInit = async () => await init(db);

    runInit();
  });

  const [refetch, setRefetch] = useState(false);

  return (
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
  );
}
