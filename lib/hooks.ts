import { useContext } from "react";
import { useColorScheme } from "react-native";
import { RefetchContext, SettingsContext, ThemeContext } from "./contexts";
import { colors } from "./colors";

/**
 * hook to access the refetch context that allow to refetch list of todos
 * @returns refetch context
 */
export function useRefetchTodos() {
  const context = useContext(RefetchContext);
  if (context === undefined) {
    throw new Error("useRefetch must be used within a RefetchProvider");
  }
  return context;
}

/**
 * hook to access the settings context that store the settings
 * @returns settings context
 */
export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

export function useThemeColors() {
  const context = useContext(ThemeContext);
  const { settings } = useSettings();
  const colorScheme = useColorScheme();

  if (context === undefined) {
    throw new Error("useThemeColors must be used within a ThemeProvider");
  }

  const actualTheme =
    settings.theme === "system" ? colorScheme || "light" : settings.theme;

  return {
    actualTheme: settings.theme,
    theme: actualTheme === "dark" ? colors.dark : colors.light,
    setTheme: context.setTheme,
  };
}
