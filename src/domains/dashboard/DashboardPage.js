import React from "react";
import { Row, Col, Card, Typography } from "antd";
import { ResponsiveLine } from "@nivo/line";
import { DashboardOutlined, UsergroupAddOutlined } from "@ant-design/icons";

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Generating random data here to populate the chart
 */
const days = getRandomInteger(5, 15);

const activeUsers = Array(days)
  .fill()
  .map((_, index) => {
    return {
      quantity: getRandomInteger(0, 50),
      date: `${index + 1}/03/20`
    };
  });

const newUsers = Array(days)
  .fill()
  .map((_, index) => {
    return {
      quantity: getRandomInteger(0, 50),
      date: `${index + 1}/03/20`
    };
  });

/**
 * Parsing the random data into components format, so we can show the chart
 */
const parsedData = [
  {
    id: "Active Users",
    data: activeUsers.map(item => ({ x: item.date, y: item.quantity }))
  },
  {
    id: "New Users",
    data: newUsers.map(item => ({ x: item.date, y: item.quantity }))
  }
];

const chartProps = {
  margin: { top: 30, right: 110, bottom: 30, left: 30 },
  pointBorderColor: { from: "serieColor" },
  legends: [
    {
      anchor: "bottom-right",
      direction: "column",
      translateX: 100,
      itemWidth: 80,
      itemHeight: 20
    }
  ]
};

export default function DashboardPage() {
  return (
    <Row justify="center" className="m-20">
      <Col span={24}>
        <Typography.Title level={3}>
          <DashboardOutlined /> Dashboard
        </Typography.Title>

        <Card className="shadow mb-20">
          <Row justify="space-between">
            <Col>
              <Typography.Title level={4}>
                <UsergroupAddOutlined /> New and Active Users
              </Typography.Title>
            </Col>

            <Col>
              <Typography.Text>
                Quantity x Date: {activeUsers.length} items in total
              </Typography.Text>
            </Col>
          </Row>

          <div className="h-500">
            <ResponsiveLine
              data={parsedData}
              useMesh
              lineWidth={3}
              pointBorderWidth={5}
              {...chartProps}
            />
          </div>
        </Card>

        <Typography.Paragraph className="opacity-50 text-sm">
          Data is generated randomly every time the page refreshes
        </Typography.Paragraph>
      </Col>
    </Row>
  );
}
