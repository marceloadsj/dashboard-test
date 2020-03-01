import React from "react";
import { Layout, Row, Col, Dropdown, Menu, Avatar, Typography } from "antd";
import { useObserver } from "mobx-react-lite";
import {
  LogoutOutlined,
  LineChartOutlined,
  TableOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "images/logo.svg";
import useUserStore from "domains/user/useUserStore";

const avatarStyle = { backgroundColor: "#1890ff" };
const defaultSelectedKeys = ["dashboard"];

export default function Header() {
  const userStore = useUserStore();

  const onLogoutClick = () => userStore.logout();

  const userMenu = (
    <Menu>
      <Menu.Item onClick={onLogoutClick}>
        <LogoutOutlined /> Logout
      </Menu.Item>
    </Menu>
  );

  return useObserver(() => (
    <Layout.Header>
      <Row justify="space-between" className="h-full">
        <Col className="flex">
          <div className="h-full items-center mr-50 hidden md:flex">
            <Logo className="text-white w-30 mr-10" />

            <Typography.Title level={4} className="text-white mb-0">
              {process.env.REACT_APP_NAME}
            </Typography.Title>
          </div>

          {userStore.userIsLogged && (
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={defaultSelectedKeys}
              className="line-h-64"
            >
              <Menu.Item key="dashboard">
                <Link to="/">
                  <LineChartOutlined /> Dashboard
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
