import React from "react";
import { Layout, Row, Col, Dropdown, Menu, Avatar, Typography } from "antd";
import { useObserver } from "mobx-react-lite";
import { LogoutOutlined } from "@ant-design/icons";

import { ReactComponent as Logo } from "images/logo.svg";
import useUserStore from "domains/user/useUserStore";

const avatarStyle = { backgroundColor: "#1890ff" };

export default function Header() {
  const userStore = useUserStore();

  const onLogoutClick = () => userStore.logout();

  const menu = (
    <Menu>
      <Menu.Item onClick={onLogoutClick}>
        <LogoutOutlined /> Logout
      </Menu.Item>
    </Menu>
  );

  return useObserver(() => (
    <Layout.Header>
      <Row justify="space-between" className="h-full">
        <Col className="flex items-center">
          <Logo className="text-white w-30 mr-10" />

          <Typography.Title level={4} className="text-white mb-0">
            {process.env.REACT_APP_NAME}
          </Typography.Title>
        </Col>

        {userStore.userIsLogged && (
          <Col>
            <Dropdown overlay={menu}>
              <div className="cursor-pointer">
                <Avatar style={avatarStyle} className="mr-10">
                  {userStore.loggedUserInitials}
                </Avatar>

                <span className="text-white font-bold">
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
