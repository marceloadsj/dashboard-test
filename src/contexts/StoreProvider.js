import React from "react";

import StoreContext from "./StoreContext";
import { useUserStoreInit } from "domains/user/useUserStore";

export default function StoreProvider({ children }) {
  const userStore = useUserStoreInit();

  const value = { userStore };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
