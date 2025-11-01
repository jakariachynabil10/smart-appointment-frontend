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

const ProviderPage = () => {
  const appointments = [
    { name: "Alice Wonderland", service: "Consultation", time: "10:00 AM", status: "Confirmed" },
    { name: "Bob The Builder", service: "Follow-up", time: "11:30 AM", status: "Confirmed" },
    { name: "Charlie Chaplin", service: "Initial Meeting", time: "02:00 PM", status: "Pending" },
    { name: "Diana Prince", service: "Therapy Session", time: "03:45 PM", status: "Confirmed" },
    { name: "Eve Harrington", service: "Strategy Call", time: "05:00 PM", status: "Completed" },
  ];

  const appointmentRequests = [
    { name: "Frank Sinatra", time: "Tomorrow, 09:00 AM" },
    { name: "Grace Kelly", time: "Mon, 01:00 PM" },
    { name: "Harry Potter", time: "Tue, 10:00 AM" },
  ];

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

  // Pagination for Schedule
  const [page, setPage] = React.useState(0);
  const slotsPerPage = 6;

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
  const currentSlots = timeSlots.slice(page * slotsPerPage, page * slotsPerPage + slotsPerPage);

  return (
    <Box className="p-6 bg-gray-50 min-h-screen">
      <Typography variant="h5" fontWeight="bold" mb={4}>
        Provider Dashboard
      </Typography>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch">
        {/* Today's Appointments */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="xl:col-span-2 h-full">
          <Card className="shadow-sm border border-gray-100 rounded-2xl h-full flex flex-col">
            <CardContent className="grow flex flex-col">
              <Box className="flex justify-between items-center mb-4">
                <Typography variant="h6" fontWeight="bold">Today&apos;s Appointments</Typography>
                <Button size="small" variant="text">View All</Button>
              </Box>
              <Divider />
              <Box mt={2} className="space-y-3 grow">
                {appointments.map((item, i) => (
                  <Box key={i} className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-3 rounded-lg">
                    <Typography className="w-1/4 font-medium text-gray-700">{item.name}</Typography>
                    <Typography className="w-1/4 text-gray-600">{item.service}</Typography>
                    <Typography className="w-1/4 text-gray-600">{item.time}</Typography>
                    <Typography className={`w-1/4 text-right font-medium ${item.status === "Confirmed" ? "text-blue-600" : item.status === "Pending" ? "text-orange-600" : "text-green-600"}`}>{item.status}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </motion.div>

        {/* Appointment Requests */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="h-full">
          <Card className="shadow-sm border border-gray-100 rounded-2xl h-full flex flex-col">
            <CardContent className="grow flex flex-col">
              <Box className="flex justify-between items-center mb-4">
                <Typography variant="h6" fontWeight="bold">Appointment Requests</Typography>
                <Typography className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full">2 New</Typography>
              </Box>
              <Divider />
              <Box mt={2} className="space-y-3 grow">
                {appointmentRequests.map((req, i) => (
                  <Box key={i} className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-3 rounded-lg">
                    <Box>
                      <Typography fontWeight="medium">{req.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{req.time}</Typography>
                    </Box>
                    <Button size="small" variant="outlined">Review</Button>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </motion.div>

        {/* Schedule + Charts Row */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="xl:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

          {/* Schedule Overview */}
          <Card className="shadow-sm border border-gray-100 rounded-2xl h-full flex flex-col">
            <CardContent className="grow">
              <Typography variant="h6" fontWeight="bold" mb={2}>Schedule Overview</Typography>

              <div className="grid grid-cols-2 gap-2">
                {currentSlots.map((slot, i) => (
                  <Box key={i} className="p-3 bg-gray-50 hover:bg-blue-50 border border-gray-100 rounded-lg text-center">
                    <Typography variant="body2" className="font-medium">{slot}</Typography>
                    <Typography variant="caption" color="text.secondary">Available</Typography>
                  </Box>
                ))}
              </div>

              <Box className="flex justify-between items-center mt-4">
                <Button size="small" variant="outlined" disabled={page === 0} onClick={() => setPage(prev => prev - 1)}>Previous</Button>
                <Typography variant="body2">Page {page + 1} of {totalPages}</Typography>
                <Button size="small" variant="outlined" disabled={page === totalPages - 1} onClick={() => setPage(prev => prev + 1)}>Next</Button>
              </Box>
            </CardContent>
          </Card>

          {/* Booking Trends */}
          <Card className="shadow-sm border border-gray-100 rounded-2xl h-full flex flex-col">
            <CardContent className="grow flex flex-col justify-center">
              <Typography variant="h6" fontWeight="bold" mb={2}>Booking Trends</Typography>
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
              <Typography variant="h6" fontWeight="bold" mb={2}>Revenue Overview</Typography>
              <LineChart width={300} height={200} data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#EC4899" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Box>
  );
};

export default ProviderPage;