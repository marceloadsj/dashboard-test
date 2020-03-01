import React, { useEffect, useMemo } from "react";
import { Layout, notification } from "antd";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { useObserver } from "mobx-react-lite";

import useSocket from "contexts/useSocket";
import useUserStore from "domains/user/useUserStore";
import Header from "domains/app/Header";
import Footer from "domains/app/Footer";
import LoginPage from "domains/user/LoginPage";
import RegisterPage from "domains/user/RegisterPage";
import ChartPage from "domains/dashboard/ChartPage";
import ListPage from "domains/dashboard/ListPage";

/**
 * Effect to connect/disconnect the logged user to the websocket network
 */
function useSocketConnection(socket, userStore) {
  useEffect(() => {
    if (userStore.userIsLogged) {
      function onConnect() {
        notification.success({
          message: "Realtime Network",
          description: "You are connected on our realtime network"
        });
      }

      socket.on("connect", onConnect);

      socket.open();

      return () => {
        socket.off("connect", onConnect);

        notification.error({
          message: "Realtime Network",
          description: "You disconnected from our realtime network"
        });
      };
    }
  }, [socket, userStore.userIsLogged]);
}

/**
 * Effect to send the user login message, and receive others users msgs as well
 */
function useSocketLogginMessage(socket, userStore) {
  useEffect(() => {
    if (userStore.userIsLogged) {
      socket.emit("userLogged", userStore.loggedUser.name);

      function onUserLogged(userName) {
        notification.success({
          message: "Realtime Network",
          description: `${userName} logged into the application`
        });
      }

      socket.on("userLogged", onUserLogged);

      return () => socket.off("userLogged", onUserLogged);
    }
  }, [socket, userStore, userStore.userIsLogged]);
}

export default function App() {
  const userStore = useUserStore();
  const socket = useSocket();

  useSocketConnection(socket, userStore);
  useSocketLogginMessage(socket, userStore);

  const location = useLocation();

  const redirectTo = useMemo(() => {
    const query = new URLSearchParams(location.search);

    const redirectTo = query.get("redirectTo");
    if (!redirectTo || redirectTo === "/login") return "/";

    return redirectTo;
  }, [location.search]);

  return useObserver(() => (
    <Layout className="min-h-screen">
      <Header />

      <Layout>
        <Layout.Content>
          <Switch>
            {!userStore.userIsLogged && (
              <Route path="/login" exact>
                <LoginPage />
              </Route>
            )}

            {!userStore.userIsLogged && (
              <Route path="/register" exact>
                <RegisterPage />
              </Route>
            )}

            {userStore.userIsLogged && (
              <Route path="/" exact>
                <ChartPage />
              </Route>
            )}

            {userStore.userIsLogged && (
              <Route path="/list" exact>
                <ListPage />
              </Route>
            )}

            <Redirect
              to={
                userStore.userIsLogged
                  ? redirectTo
                  : `/login?redirectTo=${location.pathname}`
              }
            />
          </Switch>
        </Layout.Content>
      </Layout>

      <Footer />
    </Layout>
  ));
}
