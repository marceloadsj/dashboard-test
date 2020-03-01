import React, { useMemo } from "react";
import { Layout, Row, Col, Dropdown, Menu, Avatar, Typography } from "antd";
import { useObserver } from "mobx-react-lite";
import {
  LogoutOutlined,
  LineChartOutlined,
  TableOutlined
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

import { ReactComponent as Logo } from "images/logo.svg";
import useUserStore from "domains/user/useUserStore";

const avatarStyle = { backgroundColor: "#1890ff" };

export default function Header() {
  const userStore = useUserStore();
  const location = useLocation();

  const selectedKeys = useMemo(() => {
    let selectedKeys = [];

    if (location.pathname === "/") selectedKeys.push("chart");
    if (location.pathname === "/list") selectedKeys.push("list");

    return selectedKeys;
  }, [location.pathname]);

  const onLogoutClick = () => userStore.logout();

  const userMenu = (
    <Menu>
      <Menu.Item onClick={onLogoutClick}>
        <LogoutOutlined /> Logout
      </Menu.Item>
    </Menu>
  );

  return useObserver(() => (
    <Layout.Header data-testid="header">
      <Row justify="space-between" className="h-full">
        <Col className="flex">
          <Link to="/" className="h-full items-center mr-50 hidden md:flex">
            <Logo className="text-white w-30 mr-10" />

            <Typography.Title level={4} className="text-white mb-0">
              {process.env.REACT_APP_NAME}
            </Typography.Title>
          </Link>

          {userStore.userIsLogged && (
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={selectedKeys}
              className="line-h-64"
            >
              <Menu.Item key="chart">
                <Link to="/">
                  <LineChartOutlined /> Chart
                </Link>
              </Menu.Item>

              <Menu.Item key="list">
                <Link to="/list">
                  <TableOutlined /> List
                </Link>
              </Menu.Item>
            </Menu>
          )}
        </Col>

        {userStore.userIsLogged && (
          <Col>
            <Dropdown overlay={userMenu}>
              <div className="cursor-pointer">
                <Avatar style={avatarStyle} className="mr-10">
                  {userStore.loggedUserInitials}
                </Avatar>

                <span className="text-white font-bold hidden md:inline">
                  {userStore.loggedUser.name}
                </span>
              </div>
            </Dropdown>
          </Col>
        )}
      </Row>
    </Layout.Header>
  ));
}
