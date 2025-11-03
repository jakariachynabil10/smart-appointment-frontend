"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const AdminPage = () => {
  // Summary Data
  const summary = [
    {
      title: "Total Users",
      value: "1,245",
      change: "+10.5%",
      color: "text-green-500",
      icon: <PeopleIcon fontSize="large" className="text-blue-600" />,
    },
    {
      title: "Total Appointments",
      value: "789",
      change: "+5.2%",
      color: "text-green-500",
      icon: <CalendarMonthIcon fontSize="large" className="text-purple-600" />,
    },
    {
      title: "Pending Requests",
      value: "23",
      change: "-2.1%",
      color: "text-red-500",
      icon: <PendingActionsIcon fontSize="large" className="text-yellow-600" />,
    },
    {
      title: "Revenue (Monthly)",
      value: "$12,450",
      change: "+18.5%",
      color: "text-green-500",
      icon: <MonetizationOnIcon fontSize="large" className="text-green-600" />,
    },
  ];

  // Chart Data
  const bookingsData = [
    { month: "Jan", bookings: 100, cancellations: 10 },
    { month: "Feb", bookings: 130, cancellations: 12 },
    { month: "Mar", bookings: 160, cancellations: 8 },
    { month: "Apr", bookings: 180, cancellations: 14 },
    { month: "May", bookings: 210, cancellations: 11 },
    { month: "Jun", bookings: 240, cancellations: 9 },
  ];

  const userRolesData = [
    { name: "Clients", value: 90 },
    { name: "Providers", value: 50 },
    { name: "Admins", value: 1 },
  ];

  const COLORS = ["#3b82f6", "#a855f7", "#10b981"];

  // Table Data
  const users = [
    { name: "Alice Johnson", email: "alice@example.com", role: "Client", status: "active", joined: "2023-01-15" },
    { name: "Bob Smith", email: "bob@example.com", role: "Provider", status: "active", joined: "2023-02-20" },
    { name: "Charlie Brown", email: "charlie@example.com", role: "Client", status: "suspended", joined: "2023-03-19" },
    { name: "Diana Prince", email: "diana@example.com", role: "Admin", status: "active", joined: "2023-10-01" },
  ];

  const appointments = [
    { client: "Alice Johnson", provider: "Dr. Emily White", date: "2024-07-20", time: "10:00 AM", status: "confirmed" },
    { client: "John Doe", provider: "Sarah Connor", date: "2024-07-21", time: "2:30 PM", status: "pending" },
    { client: "Charlie Brown", provider: "Dr. Emily White", date: "2024-07-22", time: "9:00 AM", status: "cancelled" },
    { client: "Eve Adams", provider: "Dr. Robert Green", date: "2024-07-23", time: "11:00 AM", status: "confirmed" },
  ];

  const suspiciousBookings = [
    { client: "User A", provider: "Dr. X", date: "2024-07-21", reason: "Multiple same-day bookings", status: "action required" },
    { client: "User B", provider: "Tutor Y", date: "2024-07-19", reason: "Unusual location pattern", status: "investigating" },
    { client: "User C", provider: "Therapist Z", date: "2024-07-22", reason: "Payment mismatch", status: "resolved" },
  ];

  return (
    <motion.div
      className="bg-gray-50 min-h-screen overflow-y-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box className="p-8">
        {/* Dashboard Header */}
        <Typography variant="h5" className="font-bold mb-6">
          Admin Dashboard
        </Typography>

        {/* Summary Cards */}
        <Box className="grid grid-cols-1 md:grid-cols-4 gap-6 my-8">
          {summary.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-md! rounded-2xl!">
                <CardContent>
                  <Box className="flex items-center justify-between">
                    {item.icon}
                    <Box className="text-right">
                      <Typography variant="subtitle2" color="text.secondary">
                        {item.title}
                      </Typography>
                      <Typography variant="h6" className="font-bold mt-1">
                        {item.value}
                      </Typography>
                      <Typography className={`text-sm mt-1 ${item.color}`}>
                        {item.change} from last month
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>

        {/* Charts Section */}
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Bar Chart */}
          <Card className="shadow-md rounded-2xl">
            <CardContent>
              <Typography variant="subtitle1" className="font-semibold mb-4">
                Monthly Bookings & Cancellations
              </Typography>
              <Box className="w-full h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bookingsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="bookings" fill="#3b82f6" name="Bookings" />
                    <Bar dataKey="cancellations" fill="#ef4444" name="Cancellations" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card className="shadow-md rounded-2xl">
            <CardContent>
              <Typography variant="subtitle1" className="font-semibold mb-4">
                User Roles Distribution
              </Typography>
              <Box className="w-full h-56 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userRolesData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {userRolesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* User Management Table */}
        <Card className="shadow-md rounded-2xl mb-8">
          <CardContent>
            <Typography variant="h6" className="font-semibold mb-4">
              User Management
            </Typography>
            <Divider />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Joined</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((u, index) => (
                  <TableRow key={index}>
                    <TableCell>{u.name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.role}</TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-white text-xs ${
                          u.status === "active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {u.status}
                      </span>
                    </TableCell>
                    <TableCell>{u.joined}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Appointment Management Table */}
        <Card className="shadow-md rounded-2xl mb-8">
          <CardContent>
            <Typography variant="h6" className="font-semibold mb-4">
              Appointment Management
            </Typography>
            <Divider />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Client</TableCell>
                  <TableCell>Provider</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((a, index) => (
                  <TableRow key={index}>
                    <TableCell>{a.client}</TableCell>
                    <TableCell>{a.provider}</TableCell>
                    <TableCell>{a.date}</TableCell>
                    <TableCell>{a.time}</TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-white text-xs ${
                          a.status === "confirmed"
                            ? "bg-green-500"
                            : a.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      >
                        {a.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Suspicious Bookings Table */}
        <Card className="shadow-md rounded-2xl mb-10">
          <CardContent>
            <Typography variant="h6" className="font-semibold mb-4">
              Suspicious Bookings
            </Typography>
            <Divider />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Client</TableCell>
                  <TableCell>Provider</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {suspiciousBookings.map((s, index) => (
                  <TableRow key={index}>
                    <TableCell>{s.client}</TableCell>
                    <TableCell>{s.provider}</TableCell>
                    <TableCell>{s.date}</TableCell>
                    <TableCell>{s.reason}</TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-white text-xs ${
                          s.status === "resolved"
                            ? "bg-green-500"
                            : s.status === "action required"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {s.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Box>
    </motion.div>
  );
};

export default AdminPage;
