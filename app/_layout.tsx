import { init } from "@/lib/db";
import { Stack } from "expo-router";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { Suspense, useEffect } from "react";
import { Text } from "react-native";

export default function RootLayout() {
  const db = openDatabaseSync("app.db");

  useEffect(() => {
    const runInit = async () => await init(db);

    runInit();
  }, [db]);

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <SQLiteProvider databaseName="app.db" useSuspense>
        <Stack screenOptions={{ headerShown: false }} />
      </SQLiteProvider>
    </Suspense>
  );
}
