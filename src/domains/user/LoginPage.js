import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Typography,
  Input,
  Button,
  Divider,
  notification,
  Tooltip
} from "antd";
import { Link } from "react-router-dom";
import {
  LoginOutlined,
  UserOutlined,
  LockOutlined,
  UserAddOutlined
} from "@ant-design/icons";

import { ReactComponent as Logo } from "images/logo.svg";
import useUserStore from "./useUserStore";

const usernameRules = [
  { required: true, message: "Please input your username or email" }
];

const passwordRules = [
  { required: true, message: "Please input your password" }
];

export default function LoginPage() {
  const userStore = useUserStore();

  const [loading, setLoading] = useState(false);

  async function onFinish(values) {
    setLoading(true);

    try {
      await userStore.login(values);

      notification.success({
        message: "Welcome",
        description: `Hello ${userStore.loggedUser.name}`
      });
    } catch (exception) {
      notification.error({
        message: "Login Error",
        description:
          exception.response?.data?.message || "An unknown error happened"
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Row justify="center" className="mt-50">
      <Col xs={23} sm={19} md={14} lg={11} xl={9} xxl={7}>
        <Card className="shadow mb-50">
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={onFinish}
          >
            <div className="text-center mb-50">
              <Logo className="w-100 text-blue-500 -mt-50 pb-10" />

              <Typography.Title level={3}>
                Welcome to {process.env.REACT_APP_NAME}
              </Typography.Title>

              <Typography.Paragraph className="font-bold">
                Here you can have full control of your data and settings
              </Typography.Paragraph>
            </div>

            <Form.Item
              label={<Tooltip title="Username or Email">Username</Tooltip>}
              name="username"
              rules={usernameRules}
              className="pb-10"
            >
              <Input
                disabled={loading}
                size="large"
                placeholder="E.g john_doe or john.doe@example.com"
                prefix={<UserOutlined />}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={passwordRules}
              className="pb-10"
            >
              <Input.Password
                disabled={loading}
                size="large"
                placeholder="E.g your secret password here"
                autoComplete="password"
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                icon={<LoginOutlined />}
                loading={loading}
              >
                Log into my Account
              </Button>
            </Form.Item>

            <Divider>or</Divider>

            <Link
              to="/register"
              component={LoginPageRegisterButton}
              appearance="ghost"
              block
              type="dashed"
              icon={<UserAddOutlined />}
            >
              Register a new Account
            </Link>
          </Form>
        </Card>

        <Typography.Paragraph className="opacity-50 text-center text-sm">
          For testing purposes, you can login with:
          <div className="font-bold">
            Username: demo_user or Email: demo@demo.com
            <br />
            Password: demo
          </div>
        </Typography.Paragraph>
      </Col>
    </Row>
  );
}

function LoginPageRegisterButton({ navigate, ...props }) {
  return <Button onClick={navigate} {...props} />;
}
