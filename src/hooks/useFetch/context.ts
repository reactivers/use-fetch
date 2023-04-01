import { createContext } from "react";
import { FetchContextProps } from "../../utils/types";

const FetchContext = createContext({} as FetchContextProps);

export { FetchContext };
