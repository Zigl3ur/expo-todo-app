import LoadingScreen from "@/lib/components/loading-screen";
import { init } from "@/lib/db";
import { Stack } from "expo-router";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { Suspense, useEffect } from "react";

export default function RootLayout() {
  const db = openDatabaseSync("app.db");

  useEffect(() => {
    const runInit = async () => await init(db);

    runInit();
  });

  return (
    <Suspense fallback={<LoadingScreen />}>
      <SQLiteProvider databaseName="app.db" useSuspense>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="todo/create"
            options={{ presentation: "formSheet", sheetAllowedDetents: [0.5] }}
          />
        </Stack>
      </SQLiteProvider>
    </Suspense>
  );
}
