import { useContext } from "react";
import { FetchContext } from "./context";

export const useFetchContext = () => {
  const context = useContext(FetchContext);
  if (context === undefined) {
    throw new Error(
      "useFetchContext must be used within an FetchContext.Provider",
    );
  }
  return context;
};
