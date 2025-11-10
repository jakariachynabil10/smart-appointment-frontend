/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Pagination,
} from "@mui/material";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

import { useGetAppointmentsBySpecialistIdQuery } from "@/redux/api/specialsitApi";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { useGetAvailabilityBySpecialistQuery } from "@/redux/api/availabilityApi";
import Link from "next/link";

const ProviderPage = () => {
  // ✅ Fetch current user (specialist)
  const { data: currentUser, isLoading: userLoading } = useGetSingleUserQuery();
  const specialistId = currentUser?.id;

  // ✅ Fetch appointments
  const {
    data: appointmentsData,
    isLoading: appointmentsLoading,
    error,
  } = useGetAppointmentsBySpecialistIdQuery(specialistId || "", {
    skip: !specialistId,
  });

  // ✅ Fetch availability
  const { data: availabilityData, isLoading: availabilityLoading } =
    useGetAvailabilityBySpecialistQuery(specialistId || "", {
      skip: !specialistId,
    });

  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  if (userLoading || appointmentsLoading || availabilityLoading)
    return <p>Loading dashboard...</p>;
  if (error) return <p>Failed to load data.</p>;

  const appointments = appointmentsData?.appointments || [];

  // ✅ Appointment Requests
  const appointmentRequests =
    appointments.filter((apt: any) => apt.status === "PENDING") || [];

  // ✅ Monthly booking trends
  const monthlyBookings = appointments.reduce((acc: any, apt: any) => {
    const month = new Date(apt.startTime).toLocaleString("default", {
      month: "short",
    });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const bookingData = Object.entries(monthlyBookings).map(([month, count]) => ({
    month,
    bookings: count,
  }));

  const dataArray = Array.isArray(availabilityData)
    ? availabilityData
    : availabilityData
    ? [availabilityData]
    : [];



  return (
    <Box className="p-6 min-h-screen bg-gray-50">
      <Typography variant="h5" fontWeight="bold" mb={4}>
        Provider Dashboard
      </Typography>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch">
        {/* 🩺 Appointments Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="xl:col-span-2 h-full"
        >
          <Box className="w-full">
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Recent Appointments
            </Typography>

            <TableContainer component={Paper} className="rounded-xl shadow-sm">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Client</TableCell>
                    <TableCell>Service</TableCell>
                    <TableCell>Date & Time</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.slice(0, 4).map((item: any, i: number) => (
                    <TableRow key={i} hover>
                      <TableCell>
                        <Box className="flex items-center space-x-2">
                          <Avatar
                            src={item.user?.profilePhoto}
                            alt={item.user?.name}
                            sx={{ width: 38, height: 38 }}
                          />
                          <Typography className="font-medium text-gray-700">
                            {item.user?.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{item.service?.name || "Service"}</TableCell>
                      <TableCell>
                        {new Date(item.startTime).toLocaleString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.status}
                          color={
                            item.status === "CONFIRMED"
                              ? "info"
                              : item.status === "COMPLETED"
                              ? "success"
                              : item.status === "PENDING"
                              ? "warning"
                              : "error"
                          }
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* View All Button */}
            <Box className="flex justify-center p-3 mt-3">
              <Link href="/dashboard/provider/todayAppointment">
                <Button size="medium" variant="outlined">
                  View All
                </Button>
              </Link>
            </Box>
          </Box>
        </motion.div>

        {/* 🔔 Appointment Requests */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="h-full"
        >
          <Card className="shadow-sm border border-gray-100 rounded-2xl h-full flex flex-col">
            <CardContent className="grow flex flex-col">
              <Box className="flex justify-between items-center mb-4">
                <Typography variant="h6" fontWeight="bold">
                  Appointment Requests
                </Typography>
                <Typography className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full">
                  {appointmentRequests.length} New
                </Typography>
              </Box>
              <Divider />
              <Box mt={2} className="space-y-3 grow">
                {appointmentRequests.length === 0 && (
                  <Typography color="text.secondary" align="center">
                    No pending requests.
                  </Typography>
                )}
                {appointmentRequests.map((req: any, i: number) => (
                  <Box
                    key={i}
                    className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-3 rounded-lg transition"
                  >
                    <Box>
                      <Typography fontWeight="medium">
                        {req.user?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(req.startTime).toLocaleString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </Typography>
                    </Box>
                    <Button size="small" variant="outlined">
                      Review
                    </Button>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </motion.div>

        {/* 🕒 Schedule + Charts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="xl:col-span-3 flex flex-col gap-6"
        >
          {/* 🕒 Schedule Overview - full width */}
          <Card className="shadow-sm border border-gray-100 rounded-2xl! flex flex-col w-full">
            <CardContent className="grow">
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Schedule Overview
              </Typography>

              {dataArray.length === 0 ? (
                <Typography color="text.secondary" align="center" py={5}>
                  No schedule found.
                </Typography>
              ) : (
                (() => {
                  const now = new Date();
                  const currentMonth = now.getMonth();
                  const currentYear = now.getFullYear();

                  const thisMonthData = dataArray.filter(
                    (availability: any) => {
                      const start = new Date(availability.startTime);
                      return (
                        start.getMonth() === currentMonth &&
                        start.getFullYear() === currentYear
                      );
                    }
                  );

                  const totalPages = Math.ceil(
                    thisMonthData.length / itemsPerPage
                  );
                  const currentData = thisMonthData.slice(
                    (page - 1) * itemsPerPage,
                    page * itemsPerPage
                  );

                  return thisMonthData.length === 0 ? (
                    <Typography color="text.secondary" align="center" py={5}>
                      No schedule available for this month.
                    </Typography>
                  ) : (
                    <>
                      {currentData.map((availability: any, index: number) => {
                        const slots: any[] = [];
                        const start = new Date(availability.startTime);
                        const end = new Date(availability.endTime);

                        for (
                          let t = new Date(start);
                          t < end;
                          t.setHours(t.getHours() + 1)
                        ) {
                          const slotStart = new Date(t);
                          const slotEnd = new Date(t);
                          slotEnd.setHours(slotStart.getHours() + 1);
                          slots.push({
                            startTime: slotStart,
                            endTime: slotEnd,
                          });
                        }

                        const weekday = new Date(
                          availability.startTime
                        ).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "short",
                          day: "numeric",
                        });

                        return (
                          <Box key={index} mb={4}>
                            <Typography
                              variant="subtitle1"
                              fontWeight="bold"
                              color="text.secondary"
                              mb={2}
                              className="tracking-wide uppercase text-gray-500"
                            >
                              {weekday}
                            </Typography>

                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                              {slots.map((slot, i) => {
                                const booked = appointments.some((apt: any) => {
                                  const aptStart = new Date(apt.startTime);
                                  const aptEnd = new Date(apt.endTime);
                                  return (
                                    (aptStart >= slot.startTime &&
                                      aptStart < slot.endTime) ||
                                    (aptEnd > slot.startTime &&
                                      aptEnd <= slot.endTime)
                                  );
                                });

                                return (
                                  <Box
                                    key={i}
                                    className={`p-3 border rounded-xl text-center shadow-sm transition-all hover:scale-[1.02] ${
                                      booked
                                        ? "bg-red-50 border-red-200 text-red-600"
                                        : "bg-emerald-50 border-emerald-200 text-emerald-700"
                                    }`}
                                  >
                                    <Typography
                                      variant="body2"
                                      className="font-semibold"
                                    >
                                      {slot.startTime.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                      })}{" "}
                                      -{" "}
                                      {slot.endTime.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                      })}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                    >
                                      {booked ? "Booked" : "Available"}
                                    </Typography>
                                  </Box>
                                );
                              })}
                            </div>
                          </Box>
                        );
                      })}

                      {/* Pagination Control */}
                      <Box className="flex justify-center mt-4">
                        <Pagination
                          count={totalPages}
                          page={page}
                          onChange={(_, val) => setPage(val)}
                          color="primary"
                          shape="rounded"
                        />
                      </Box>
                    </>
                  );
                })()
              )}
            </CardContent>
          </Card>

          {/* 📊 Bottom Row: Booking Trends + Revenue Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Booking Trends */}
            <Card className="shadow-sm border border-gray-100 rounded-2xl h-full flex flex-col">
              <CardContent className="grow flex flex-col justify-center">
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Booking Trends
                </Typography>
                {bookingData.length === 0 ? (
                  <Typography color="text.secondary" align="center">
                    No booking data available
                  </Typography>
                ) : (
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={bookingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="bookings"
                        fill="#2563EB"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            {/* Revenue Overview */}
            <Card className="shadow-sm border border-gray-100 rounded-2xl h-full flex flex-col">
              <CardContent className="grow flex flex-col justify-center">
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Revenue Overview
                </Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={bookingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="bookings"
                      stroke="#EC4899"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </Box>
  );
};

export default ProviderPage;
