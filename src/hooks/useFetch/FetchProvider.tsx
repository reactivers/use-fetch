import { FC, PropsWithChildren } from "react";
import { FetchContextProps } from "../../utils/types";
import { FetchContext } from "./context";

const FetchProvider: FC<PropsWithChildren<FetchContextProps>> = ({
  children,
  getAuthorizationHeader,
  ...rest
}) => {
  return (
    <FetchContext.Provider
      value={{
        getAuthorizationHeader,
        ...rest,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
};

FetchProvider.defaultProps = {};

export default FetchProvider;
