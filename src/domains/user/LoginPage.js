import React from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Typography,
  Input,
  Button,
  Divider,
  notification
} from "antd";
import { Link } from "react-router-dom";
import {
  LoginOutlined,
  MailOutlined,
  LockOutlined,
  UserAddOutlined
} from "@ant-design/icons";

import { ReactComponent as Logo } from "images/logo.svg";
import useUserStore from "./useUserStore";

const emailRules = [{ required: true, message: "Please input your email" }];

const passwordRules = [
  { required: true, message: "Please input your password" }
];

export default function LoginPage() {
  const userStore = useUserStore();

  async function onFinish(values) {
    try {
      await userStore.login(values);
    } catch (exception) {
      notification.error({
        message: "Login Error",
        description:
          exception.response?.data?.message || "An unknown error happened"
      });
    }
  }

  return (
    <Row justify="center" className="mt-50">
      <Col span={6}>
        <Card className="shadow">
          <Form
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
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
              label="Email"
              name="email"
              rules={emailRules}
              className="pb-10"
            >
              <Input
                size="large"
                placeholder="E.g john.doe@example.com"
                prefix={<MailOutlined />}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={passwordRules}
              className="pb-10"
            >
              <Input.Password
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
      </Col>
    </Row>
  );
}

function LoginPageRegisterButton({ navigate, ...props }) {
  return <Button onClick={navigate} {...props} />;
}
