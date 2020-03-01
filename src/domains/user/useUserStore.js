import { useContext, useEffect } from "react";
import SecureLS from "secure-ls";
import { useLocalStore } from "mobx-react-lite";

import fetch from "utils/fetch";
import StoreContext from "contexts/StoreContext";

const secureLs = new SecureLS({
  encodingType: "aes",
  encryptionSecret: process.env.REACT_APP_ENCRYPTION_SECRET
});

export function userInitializer() {
  const loggedUserToken =
    secureLs.get(process.env.REACT_APP_LOGGED_USER_LOCALSTORAGE_KEY) || null;

  return {
    loggedUser: null,
    loggedUserToken,

    get userHasToken() {
      return !!this.loggedUserToken;
    },

    get userIsLogged() {
      return !!this.loggedUser;
    },

    async getLoggedUser() {
      const response = await fetch.get("/user/me", {
        headers: { Authorization: `Bearer ${this.loggedUserToken}` }
      });

      this.loggedUser = response.data;
    },

    async logout() {
      secureLs.remove(process.env.REACT_APP_LOGGED_USER_LOCALSTORAGE_KEY);

      this.loggedUser = null;
      this.loggedUserToken = null;
    },

    async login(values) {
      const response = await fetch.post("/user/login", values);

      this.loggedUser = response.data.loggedUser;
      this.loggedUserToken = response.data.token;

      try {
        secureLs.set(
          process.env.REACT_APP_LOGGED_USER_LOCALSTORAGE_KEY,
          this.loggedUserToken
        );
      } catch (error) {
        // TODO: we should implement an error tracker to keep looking into these situations
        console.error(
          "Error when saving logged user info to localstorage",
          error
        );
      }
    }
  };
}

export function useUserStoreInit() {
  const userStore = useLocalStore(userInitializer);

  useEffect(() => {
    if (userStore.loggedUserToken) {
      async function run() {
        try {
          await userStore.getLoggedUser();
        } catch (error) {
          userStore.logout();
        }
      }

      run();
    }
  }, [userStore]);

  return userStore;
}

export default function useUserStore() {
  return useContext(StoreContext).userStore;
}
