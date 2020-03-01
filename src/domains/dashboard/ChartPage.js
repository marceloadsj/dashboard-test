import React, { useState, useMemo } from "react";
import { Row, Col, Card, Typography, DatePicker, Tooltip } from "antd";
import { ResponsiveLine } from "@nivo/line";
import {
  LineChartOutlined,
  UsergroupAddOutlined,
  AppstoreOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";
import moment from "moment";

import statsData from "utils/stats.json";
import randomChartData from "utils/randomChartData";

const chartProps = {
  margin: { top: 30, right: 110, bottom: 100, left: 50 },
  pointBorderColor: { from: "serieColor" },
  axisBottom: {
    tickRotation: 45
  },
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

const initialFrom = moment("24/12/2019", "DD/MM/YYYY");
const initialRange = [initialFrom, moment(initialFrom).add(5, "days")];

/**
 * Parsing the stats.json data to add it to chart
 */
const parsedStatsData = statsData.map(({ quantity, date }) => ({
  x: date,
  y: quantity
}));

export default function ChartPage() {
  const [range, setRange] = useState(initialRange);

  const onRangeChange = range => {
    let [from, to] = range || [];

    if (from && to) {
      const maxTo = moment(from).add(5, "days");
      if (to > maxTo) to = maxTo;

      setRange([from, to]);

      return;
    }

    setRange();
  };

  const [from, to] = range || initialRange;

  const filteredStatsData = useMemo(() => {
    let data = [];

    if (from && to) {
      data = parsedStatsData.filter(data => {
        const date = moment(data.x);
        return date >= from && date <= to;
      });
    }

    return [{ id: "Stats", data }];
  }, [from, to]);

  return (
    <Row justify="center" className="m-20" data-testid="chart-page">
      <Col span={24}>
        <Typography.Title level={3}>
          <LineChartOutlined /> Chart
        </Typography.Title>

        <Card className="shadow mb-20" data-testid="chart-first-card">
          <Row justify="space-between">
            <Col>
              <Typography.Title level={4}>
                <AppstoreOutlined /> Stats
              </Typography.Title>
            </Col>

            <Col>
              <Tooltip title="Max range of 5 days">
                <InfoCircleOutlined className="mr-10" />
              </Tooltip>

              <DatePicker.RangePicker
                value={range}
                onChange={onRangeChange}
                defaultPickerValue={initialRange}
              />
            </Col>
          </Row>

          <div className="h-500">
            <ResponsiveLine
              data={filteredStatsData}
              useMesh
              lineWidth={3}
              pointBorderWidth={5}
              {...chartProps}
            />
          </div>
        </Card>

        <Card className="shadow mb-20" data-testid="chart-second-card">
          <Row justify="space-between">
            <Col>
              <Typography.Title level={4}>
                <UsergroupAddOutlined /> New and Active Users
              </Typography.Title>
            </Col>

            <Col>
              <Typography.Text>
                Quantity x Date: {randomChartData[0].data.length} days in total
              </Typography.Text>
            </Col>
          </Row>

          <div className="h-500">
            <ResponsiveLine
              data={randomChartData}
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
