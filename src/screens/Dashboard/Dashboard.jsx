import React from "react";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import {
  FiUsers,
  FiShoppingCart,
  FiDollarSign,
  FiTrendingUp,
  FiMoreVertical,
  FiEdit,
  FiTrash,
} from "react-icons/fi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "../../assets/css/Dashboard.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const statsCards = [
    {
      title: "Total Users",
      value: "1,234",
      icon: <FiUsers className="stat-icon" />,
      color: "primary",
      increase: true,
      percent: "12%",
    },
    {
      title: "Total Posts",
      value: "456",
      icon: <FiShoppingCart className="stat-icon" />,
      color: "success",
      increase: true,
      percent: "8%",
    },
    {
      title: "Revenue",
      value: "$12,345",
      icon: <FiDollarSign className="stat-icon" />,
      color: "warning",
      increase: false,
      percent: "5%",
    },
    {
      title: "Growth",
      value: "+23%",
      icon: <FiTrendingUp className="stat-icon" />,
      color: "info",
      increase: true,
      percent: "18%",
    },
  ];

  const chartData = [
    { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
    { name: "May", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
  ];

  const posts = [
    {
      id: 1,
      title: "New Policies Announcement",
      content:
        "The government has introduced new policies for economic growth.",
      author: "Admin",
      date: "2025-04-01",
    },
    {
      id: 2,
      title: "Healthcare Improvements",
      content:
        "New hospitals are being built to improve healthcare facilities.",
      author: "User1",
      date: "2025-04-02",
    },
    {
      id: 3,
      title: "Agricultural Support Scheme",
      content: "Government launches support scheme for farmers.",
      author: "User2",
      date: "2025-04-03",
    },
  ];

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4 fw-bold">Dashboard</h2>

      {/* Stats Cards */}
      <Row className="g-3 mb-4">
        {statsCards.map((stat, index) => (
          <Col key={index} xs={12} sm={6} md={3}>
            <Card className={`border-0 shadow-sm text-white bg-${stat.color}`}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="small mb-1">{stat.title}</div>
                    <h3 className="fw-bold">{stat.value}</h3>
                  </div>
                  {stat.icon}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts Section */}
      <Row className="g-3 mb-4" style={{ justifyContent: "space-between" }}>
        <Col xs={12} lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="fw-bold">Revenue Overview</h5>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#8884d8"
                    fillOpacity={0.3}
                    fill="#8884d8"
                  />
                  <Area
                    type="monotone"
                    dataKey="pv"
                    stroke="#82ca9d"
                    fillOpacity={0.3}
                    fill="#82ca9d"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={2}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <h5 className="fw-bold mb-3">Labels</h5>
              <div className="d-flex flex-wrap gap-2">
                {[
                  "God label",
                  "Dummy God label",
                  "Managers",
                  "Manager",
                  "Reporter",
                ].map((label, idx) => (
                  <span
                    key={idx}
                    className="badge bg-secondary px-3 py-2 text-capitalize"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Manage Posts Section */}
      <Row className="g-3">
        <Col xs={12}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Manage Posts</h5>
                <Link to="/posts">
                  <Button variant="primary">View All Posts</Button>
                </Link>
              </div>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Author</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td>{post.id}</td>
                      <td>
                        {post.title.length > 60
                          ? post.title.slice(0, 60) + "..."
                          : post.title}
                      </td>
                      <td>
                        {post.content.length > 60
                          ? post.content.slice(0, 60) + "..."
                          : post.content}
                      </td>
                      <td>{post.author}</td>
                      <td>{post.date}</td>
                      <td>
                        <Button variant="warning" size="sm" className="me-2">
                          <FiEdit />
                        </Button>
                        <Button variant="danger" size="sm">
                          <FiTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
