import React, { useEffect } from "react";
import { Layout, notification } from "antd";
import { CoffeeOutlined, HeartOutlined } from "@ant-design/icons";
import { Switch, Route, Redirect } from "react-router-dom";
import { useObserver } from "mobx-react-lite";

import useSocket from "contexts/useSocket";
import useUserStore from "domains/user/useUserStore";
import LoginPage from "domains/user/LoginPage";

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

  return useObserver(() => (
    <Layout className="min-h-screen">
      <Layout.Header />

      <Layout>
        <Layout>
          <Layout.Content>
            <Switch>
              {!userStore.userIsLogged && (
                <Route path="/login">
                  <LoginPage />
                </Route>
              )}

              {!userStore.userIsLogged && <Redirect to="/login" />}
            </Switch>
          </Layout.Content>
        </Layout>
      </Layout>

      <Layout.Footer className="text-center">
        Created by{" "}
        <a
          href="https://github.com/marceloadsj"
          target="_blank"
          rel="noopener noreferrer"
        >
          Marcelo Junior (@marceloadsj)
        </a>{" "}
        with <HeartOutlined /> and <CoffeeOutlined />
      </Layout.Footer>
    </Layout>
  ));
}
