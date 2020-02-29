import { useContext } from "react";

import StoreContext from "contexts/StoreContext";

export function userInitializer() {
  return {
    loggedUser: null
  };
}

export default function useUserStore() {
  return useContext(StoreContext).userStore;
}
