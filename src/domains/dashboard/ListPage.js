import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Row,
  Col,
  Typography,
  Card,
  Table,
  Tag,
  Input,
  Button,
  Tooltip
} from "antd";
import { TableOutlined, EllipsisOutlined } from "@ant-design/icons";

import dataSource from "utils/items.json";

const debounceMs = 500;

const colors = {
  SUSPENDED: "red",
  ACTIVE: "green",
  REQUESTED: "blue",
  CLOSED: "gray"
};

const columns = [
  {
    width: 200,
    title: "ID",
    dataIndex: "id",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.id - b.id
  },
  {
    width: 300,
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => (a.name > b.name ? 1 : -1)
  },
  {
    width: 400,
    title: "Date",
    dataIndex: "date",
    sorter: (a, b) => (a.date > b.date ? 1 : -1)
  },
  {
    title: "Status",
    dataIndex: "status",
    filters: [
      {
        text: "Requested",
        value: "REQUESTED"
      },
      {
        text: "Active",
        value: "ACTIVE"
      },
      {
        text: "Suspended",
        value: "SUSPENDED"
      },
      {
        text: "Closed",
        value: "CLOSED"
      }
    ],
    onFilter: (value, record) => record.status === value,
    sorter: (a, b) => (a.status > b.status ? 1 : -1),
    render: status => {
      return <Tag color={colors[status]}>{status}</Tag>;
    }
  },
  {
    width: 100,
    title: "Actions",
    render: () => (
      <Tooltip title="Coming soon">
        <Button type="link" disabled>
          <EllipsisOutlined />
        </Button>
      </Tooltip>
    )
  }
];

export default function ListPage() {
  const [search, setSearch] = useState("");
  const timeoutRef = useRef();

  function onSearchChange(event) {
    clearTimeout(timeoutRef.current);

    const value = event.target.value;

    timeoutRef.current = setTimeout(() => {
      setSearch(search => {
        if (search !== value) return value;

        return search;
      });
    }, debounceMs);
  }

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const parsedDataSource = useMemo(() => {
    if (!search) return dataSource;

    const parsedSearch = search.toLowerCase();

    return dataSource.filter(({ id, name, date, status }) => {
      return (
        String(id).includes(parsedSearch) ||
        name.toLowerCase().includes(parsedSearch) ||
        date.includes(parsedSearch) ||
        status.toLowerCase().includes(parsedSearch)
      );
    });
  }, [search]);

  return (
    <Row justify="center" className="m-20" data-testid="list-page">
      <Col span={24}>
        <Typography.Title level={3}>
          <TableOutlined /> List
        </Typography.Title>

        <Card className="shadow mb-20" data-testid="list-card">
          <Row justify="space-between" className="mb-20">
            <Col>
              <Typography.Title level={4}>List of Items</Typography.Title>
            </Col>

            <Col span={6}>
              <Input.Search
                allowClear
                enterButton
                placeholder="Search for any field here"
                onSearch={setSearch}
                onChange={onSearchChange}
              />
            </Col>
          </Row>

          <Table dataSource={parsedDataSource} columns={columns} rowKey="id" />
        </Card>
      </Col>
    </Row>
  );
}
