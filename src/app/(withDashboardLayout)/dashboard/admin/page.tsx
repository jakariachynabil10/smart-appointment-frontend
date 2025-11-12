/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
import { useGetAllUserQuery } from "@/redux/api/userApi";
import { useGetAllAppointmentQuery } from "@/redux/api/appointmentApi";
import UserManagement from "@/components/Dashboard/UserManagement/UserManagement";
import AllAppointments from "@/components/Dashboard/AllAppointments/AllAppointments";

const AdminPage = () => {
  const { data: usersData, isLoading: isUserLoading } = useGetAllUserQuery();
  const { data: appointmentData, isLoading: isAppointmentLoading } =
    useGetAllAppointmentQuery();

  const summary = useMemo(
    () => [
      {
        title: "Total Users",
        value: usersData ? usersData.length : 0,
        // change: "+10.5%",
        color: "text-green-500",
        icon: <PeopleIcon fontSize="large" className="text-blue-600" />,
      },
      {
        title: "Total Appointments",
        value: appointmentData ? appointmentData.length : 0,
        // change: "+5.2%",
        color: "text-green-500",
        icon: (
          <CalendarMonthIcon fontSize="large" className="text-purple-600" />
        ),
      },
      {
        title: "Pending Requests",
        value:
          appointmentData?.filter((a: any) => a.status === "PENDING").length ||
          0,
        // change: "-2.1%",
        color: "text-red-500",
        icon: (
          <PendingActionsIcon fontSize="large" className="text-yellow-600" />
        ),
      },
      {
        title: "Completed Requests",
        value:
          appointmentData?.filter((a: any) => a.status === "COMPLETED")
            .length || 0,
        // change: "+12.3%",
        color: "text-green-500",
        icon: <CheckCircleIcon fontSize="large" className="text-green-600" />,
      },
    ],
    [usersData, appointmentData]
  );

  const bookingsData = useMemo(() => {
    if (!appointmentData) return [];

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyStats: Record<
      string,
      { bookings: number; cancellations: number }
    > = {};

    appointmentData.forEach((appt: any) => {
      const month = monthNames[new Date(appt.date).getMonth()];

      if (!monthlyStats[month]) {
        monthlyStats[month] = { bookings: 0, cancellations: 0 };
      }

      // Every appointment counts as a booking
      monthlyStats[month].bookings += 1;

      // Count cancellations
      if (appt.status === "CANCELLED") {
        monthlyStats[month].cancellations += 1;
      }
    });

    // Convert to array format for recharts
    return monthNames.map((month) => ({
      month,
      bookings: monthlyStats[month]?.bookings || 0,
      cancellations: monthlyStats[month]?.cancellations || 0,
    }));
  }, [appointmentData]);

  const userRolesData = useMemo(() => {
    if (!usersData) return [];

    const roleCounts = usersData.reduce(
      (acc: any, user: any) => {
        if (user.role === "USER") acc.clients += 1;
        else if (user.role === "SPECIALIST") acc.providers += 1;
        else if (user.role === "ADMIN") acc.admins += 1;
        return acc;
      },
      { clients: 0, providers: 0, admins: 0 }
    );

    return [
      { name: "Clients", value: roleCounts.clients },
      { name: "Providers", value: roleCounts.providers },
      { name: "Admins", value: roleCounts.admins },
    ];
  }, [usersData]);
  const COLORS = ["#3b82f6", "#a855f7", "#10b981"];

  return (
    <motion.div
      className="bg-gray-50 min-h-screen overflow-y-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box className="p-8">
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
              <Card className="shadow-md rounded-2xl!">
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
                      {/* <Typography className={`text-sm mt-1 ${item.color}`}>
                        {item.change} from last month
                      </Typography> */}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>

        {/* Charts Section */}
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-md rounded-2xl!">
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
                    <Bar
                      dataKey="cancellations"
                      fill="#ef4444"
                      name="Cancellations"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-2xl!">
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
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
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
        <UserManagement />

        {/* ✅ Appointment Management Table (Dynamic) */}
       <AllAppointments/>
      </Box>
    </motion.div>
  );
};

export default AdminPage;
