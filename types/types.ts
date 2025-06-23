import { ColorValue } from "react-native";

export type todo = {
  id: number;
  title: string;
  description?: string;
  priority: boolean;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ThemeValue = "light" | "dark" | "system";

export type settings = {
  theme: ThemeValue;
  priorityColor: ColorValue;
  deleteOnComplete: boolean;
};
