import React from "react";
import { Layout } from "antd";
import { CoffeeOutlined, HeartOutlined } from "@ant-design/icons";
import { Switch, Route, Redirect } from "react-router-dom";

import useUserStore from "domains/user/useUserStore";
import LoginPage from "domains/user/LoginPage";

export default function App() {
  const userStore = useUserStore();

  return (
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
  );
}
