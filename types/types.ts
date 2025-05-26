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

export type settings = {
  priorityColor: ColorValue;
  deleteOnComplete: boolean;
};
