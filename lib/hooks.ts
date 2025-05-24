import { useContext } from "react";
import { RefetchContext, SettingsContext } from "./contexts";

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

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a RefetchProvider");
  }
  return context;
}
