import { settings } from "@/types/types";
import * as FileSystem from "expo-file-system";

export async function SaveSettings(settings: settings) {
  const filePath = FileSystem.cacheDirectory + "settings.json";

  const data = JSON.stringify(settings);
  await FileSystem.writeAsStringAsync(filePath, data);
}

export async function ReadSettings(): Promise<settings> {
  const filePath = FileSystem.cacheDirectory + "settings.json";

  const fileInfo = await FileSystem.getInfoAsync(filePath);
  if (!fileInfo.exists) {
    SaveSettings({ deleteOnComplete: false });
    return { deleteOnComplete: false };
  }

  const data = await FileSystem.readAsStringAsync(filePath);
  return JSON.parse(data) as settings;
}
