import { ColorValue } from "react-native";
import { ThemeValue } from "@/lib/contexts";

export type todo = {
  id: number;
  title: string;
  description?: string;
  priority: boolean;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type settings = {
  theme: ThemeValue;
  priorityColor: ColorValue;
  deleteOnComplete: boolean;
};
