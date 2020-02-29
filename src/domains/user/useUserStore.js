import { useContext } from "react";

import fetch from "utils/fetch";
import StoreContext from "contexts/StoreContext";

export function userInitializer() {
  return {
    loggedUser: null,

    get userIsLogged() {
      return !!this.loggedUser;
    },

    async login(values) {
      const response = await fetch.post("/user/login", values);

      this.loggedUser = response.data;
    }
  };
}

export default function useUserStore() {
  return useContext(StoreContext).userStore;
}
