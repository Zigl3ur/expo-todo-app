import { useContext } from "react";
import { RefetchContext } from "./contexts";

// hook that return the refetch context
export function useRefetchTodos() {
  const context = useContext(RefetchContext);
  if (context === undefined) {
    throw new Error("useRefetch must be used within a RefetchProvider");
  }
  return context;
}
