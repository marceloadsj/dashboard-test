import React from "react";
import { Layout } from "antd";
import { CoffeeOutlined, HeartOutlined } from "@ant-design/icons";

export default function Footer() {
  return (
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
  );
}
