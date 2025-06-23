import { settings, ThemeValue } from "@/types/types";
import { createContext } from "react";

// refetch context allow to refetch todos when they are deleted in settings page
type RefetchContextType = {
  refetch: boolean;
  setRefetch: (value: boolean) => void;
};

export const RefetchContext = createContext<RefetchContextType | undefined>(
  undefined
);

// settings context allow to get settings values
type SettingsContextType = {
  settings: settings;
  setSettings: (value: settings) => void;
};

export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

type ThemeContextType = {
  theme: ThemeValue;
  setTheme: (value: ThemeValue) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
