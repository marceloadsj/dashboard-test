import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Typography,
  Input,
  Button,
  Divider,
  notification
} from "antd";
import { Link, useHistory } from "react-router-dom";
import {
  LoginOutlined,
  UserOutlined,
  LockOutlined,
  UserAddOutlined,
  SmileOutlined,
  MailOutlined
} from "@ant-design/icons";
import { useObserver } from "mobx-react-lite";

import { ReactComponent as Logo } from "images/logo.svg";
import useUserStore from "./useUserStore";

const nameRules = [{ required: true, message: "Please input your name" }];

const usernameRules = [
  { required: true, message: "Please input your username" },
  {
    pattern: new RegExp("^[a-zA-Z_]+$"),
    message: "Please use a-z, A-Z and _ characters only"
  }
];

const emailRules = [
  { required: true, message: "Please input your email" },
  { type: "email", message: "Please input a valid email" }
];

const passwordRules = [
  { required: true, message: "Please input your password" },
  {
    pattern: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"),
    message:
      "Please use 1 lowercase, 1 uppercase, 1 numeric and at least 8 characters"
  }
];

export default function RegisterPage() {
  const userStore = useUserStore();

  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function onFinish(values) {
    setLoading(true);

    try {
      await userStore.register(values);

      notification.success({
        message: "Register Successful",
        description: "You account has been created"
      });

      history.push("/login");
    } catch (exception) {
      notification.error({
        message: "Register Error",
        description:
          exception.response?.data?.message || "An unknown error happened"
      });

      setLoading(false);
    }
  }

  return useObserver(() => (
    <Row justify="center" className="mt-50" data-testid="register-page">
      <Col xs={23} sm={19} md={14} lg={11} xl={9} xxl={7}>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          data-testid="register-form"
        >
          <div className="text-center mb-50">
            <Logo className="w-100 text-blue-500 -mt-30 pb-10" />

            <Typography.Title level={3}>
              Register a new Account at {process.env.REACT_APP_NAME}
            </Typography.Title>
          </div>

          <Form.Item
            label="Name"
            name="name"
            rules={nameRules}
            className="pb-10"
          >
            <Input
              disabled={loading}
              size="large"
              placeholder="E.g John Doe"
              prefix={<SmileOutlined />}
            />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={usernameRules}
            className="pb-10"
          >
            <Input
              disabled={loading}
              size="large"
              placeholder="E.g john_doe"
              prefix={<UserOutlined />}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={emailRules}
            className="pb-10"
          >
            <Input
              disabled={loading}
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
              icon={<UserAddOutlined />}
              loading={loading}
            >
              Register a new Account
            </Button>
          </Form.Item>
        </Form>

        <Divider>or</Divider>

        <Link
          to="/login"
          component={RegisterPageLoginButton}
          block
          type="link"
          icon={<LoginOutlined />}
        >
          Log into your Account
        </Link>
      </Col>
    </Row>
  ));
}

function RegisterPageLoginButton({ navigate, ...props }) {
  function onButtonClick(event) {
    event.preventDefault();
    navigate(event);
  }

  return <Button onClick={onButtonClick} {...props} />;
}
