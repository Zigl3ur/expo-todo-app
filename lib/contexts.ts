import { createContext } from "react";

// refetch context allow to refetch todos when they are deleted in settings page
type RefetchContextType = {
  refetch: boolean;
  setRefetch: (value: boolean) => void;
};

export const RefetchContext = createContext<RefetchContextType | undefined>(
  undefined
);
