import React from "react";
import { useLocalStore } from "mobx-react-lite";

import StoreContext from "./StoreContext";
import { userInitializer } from "domains/user/useUserStore";

export default function StoreProvider({ children }) {
  const userStore = useLocalStore(userInitializer);

  const value = { userStore };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
