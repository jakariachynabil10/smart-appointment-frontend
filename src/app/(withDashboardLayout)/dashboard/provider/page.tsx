/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
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
} from "recharts";

import { useGetAppointmentsBySpecialistIdQuery } from "@/redux/api/specialsitApi";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import Link from "next/link";

const ProviderPage = () => {
  // Hooks must be at the top
  const [page, setPage] = React.useState(0);
  const slotsPerPage = 6;

  const { data: currentUser, isLoading: userLoading } = useGetSingleUserQuery();
  console.log(currentUser);
  const specialistId = currentUser?.id;

  const {
    data: appointmentsData,
    isLoading: appointmentsLoading,
    error,
  } = useGetAppointmentsBySpecialistIdQuery(specialistId || "", {
    skip: !specialistId,
  });

  // console.log(appointmentsData)

  // Pagination slots
  const timeSlots = [
    "08:00 AM - 09:00 AM",
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "12:00 PM - 01:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
    "05:00 PM - 06:00 PM",
    "06:00 PM - 07:00 PM",
  ];
  const totalPages = Math.ceil(timeSlots.length / slotsPerPage);
  const currentSlots = timeSlots.slice(
    page * slotsPerPage,
    page * slotsPerPage + slotsPerPage
  );

  // Early return for loading / error
  if (userLoading || appointmentsLoading) return <p>Loading appointments...</p>;
  if (error) return <p>Failed to load appointments.</p>;

  // Static chart data
  const bookingData = [
    { month: "Jan", bookings: 80 },
    { month: "Feb", bookings: 110 },
    { month: "Mar", bookings: 130 },
    { month: "Apr", bookings: 160 },
    { month: "May", bookings: 150 },
    { month: "Jun", bookings: 190 },
  ];

  const revenueData = [
    { month: "Feb", revenue: 1200 },
    { month: "Mar", revenue: 2400 },
    { month: "Apr", revenue: 3800 },
    { month: "May", revenue: 4600 },
    { month: "Jun", revenue: 4200 },
  ];

  // Filter appointments dynamically
  // const today = new Date().toISOString().split("T")[0];
  const appointments = appointmentsData?.appointments || [];
  const appointmentRequests =
    appointmentsData?.appointments?.filter(
      (apt: any) => apt.status === "PENDING"
    ) || [];

  console.log(appointments);

  return (
    <Box className="p-6  min-h-screen">
      <Typography variant="h5" fontWeight="bold" mb={4}>
        Provider Dashboard
      </Typography>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch">
        {/* Today's Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="xl:col-span-2 h-full"
        >
          <Card className=" flex flex-col">
            <CardContent className="grow flex flex-col">
              <Box className="flex justify-between items-center mb-4">
                <Typography variant="h6" fontWeight="bold">
                  Appointments
                </Typography>
                <Button size="small" variant="text">
                  <Link href={"/dashboard/provider/today"}>View All</Link>
                </Button>
              </Box>
              <Divider />
              <TableContainer component={Paper} className="mt-4">
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
                    {appointments.slice(0, 3).map((item: any, i: number) => (
                      <TableRow key={i} hover>
                        {/* Client */}
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

                        {/* Service */}
                        <TableCell>{item.service?.name || "Service"}</TableCell>

                        {/* Date & Time */}
                        <TableCell>
                          {new Date(item.startTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          -{" "}
                          {new Date(item.endTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>

                        {/* Status */}
                        <TableCell>
                          <Typography
                            className={`font-medium ${
                              item.status === "CONFIRMED"
                                ? "text-blue-600"
                                : item.status === "PENDING"
                                ? "text-orange-600"
                                : item.status === "COMPLETED"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {item.status}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Appointment Requests */}
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
                {appointmentRequests.map((req: any, i: number) => (
                  <Box
                    key={i}
                    className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-3 rounded-lg"
                  >
                    <Box>
                      <Typography fontWeight="medium">
                        {req.user?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {req.time}
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

        {/* Schedule + Charts Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="xl:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
        >
          {/* Schedule Overview */}
          <Card className="shadow-sm border border-gray-100 rounded-2xl h-full flex flex-col">
            <CardContent className="grow">
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Schedule Overview
              </Typography>
              <div className="grid grid-cols-2 gap-2">
                {currentSlots.map((slot, i) => (
                  <Box
                    key={i}
                    className="p-3 bg-gray-50 hover:bg-blue-50 border border-gray-100 rounded-lg text-center"
                  >
                    <Typography variant="body2" className="font-medium">
                      {slot}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Available
                    </Typography>
                  </Box>
                ))}
              </div>
              <Box className="flex justify-between items-center mt-4">
                <Button
                  size="small"
                  variant="outlined"
                  disabled={page === 0}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  Previous
                </Button>
                <Typography variant="body2">
                  Page {page + 1} of {totalPages}
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  disabled={page === totalPages - 1}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Next
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Booking Trends */}
          <Card className="shadow-sm border border-gray-100 rounded-2xl h-full flex flex-col">
            <CardContent className="grow flex flex-col justify-center">
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Booking Trends
              </Typography>
              <BarChart width={300} height={200} data={bookingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#2D00C2" radius={[6, 6, 0, 0]} />
              </BarChart>
            </CardContent>
          </Card>

          {/* Revenue Overview */}
          <Card className="shadow-sm border border-gray-100 rounded-2xl h-full flex flex-col">
            <CardContent className="grow flex flex-col justify-center">
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Revenue Overview
              </Typography>
              <LineChart width={300} height={200} data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#EC4899"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Box>
  );
};

export default ProviderPage;
