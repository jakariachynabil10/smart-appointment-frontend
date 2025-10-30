"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const stats = [
  { label: "Upcoming", value: 3, icon: <EventAvailableIcon color="primary" /> },
  { label: "Completed", value: 12, icon: <CheckCircleIcon color="success" /> },
  { label: "Cancelled", value: 1, icon: <CancelIcon color="error" /> },
  { label: "Pending", value: 2, icon: <PendingActionsIcon color="warning" /> },
];

const upcoming = [
  {
    title: "Dr. Emily White — Dental Checkup",
    date: "July 25, 2025 • 10:00 AM",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    title: "Coach Maya Singh — Fitness Coaching",
    date: "Aug 2, 2025 • 04:00 PM",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

const notifications = [
  { text: "Your dental checkup with Dr. White is confirmed.", time: "2h ago" },
  { text: "New slot available with Prof. Lee this Friday!", time: "1d ago" },
  { text: "Reminder: Coaching session tomorrow at 4 PM.", time: "1d ago" },
];

export default function UserDashboard() {
  return (
    <Box className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <Box className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Box>
          <Typography
            variant="h5"
            fontWeight={600}
            className="text-lg sm:text-xl md:text-2xl"
          >
            Welcome back, Sarah!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Here’s your appointment overview.
          </Typography>
        </Box>
      </Box>

      {/* Stats */}
      <Box className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((item, i) => (
          <motion.div key={i} whileHover={{ scale: 1.03 }}>
            <Card
              elevation={1}
              className="rounded-2xl"
              sx={{ textAlign: "center", py: { xs: 1.5, sm: 2 } }}
            >
              <Box className="flex justify-center mb-1">{item.icon}</Box>
              <Typography variant="body2" color="text.secondary">
                {item.label}
              </Typography>
              <Typography variant="h6" fontWeight={700}>
                {item.value}
              </Typography>
            </Card>
          </motion.div>
        ))}
      </Box>

      {/* Main Grid */}
      <Box className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar + Booking */}
        <Card elevation={1} className="rounded-2xl col-span-1 lg:col-span-2">
          <CardContent>
            <Box className="flex items-center gap-2 mb-3">
              <CalendarMonthIcon color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Book New Appointment
              </Typography>
            </Box>

            {/* Calendar */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box className="flex justify-center">
                <DateCalendar />
              </Box>
            </LocalizationProvider>

            {/* Time Slots */}
            <Box className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-4">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant="outlined"
                  size="small"
                  sx={{
                    textTransform: "none",
                    fontSize: { xs: "0.75rem", sm: "0.85rem" },
                  }}
                >
                  {time}
                </Button>
              ))}
            </Box>

            <Button
              fullWidth
              variant="contained"
              sx={{
                textTransform: "none",
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              Book Now
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card elevation={1} className="rounded-2xl">
          <CardContent>
            <Box className="flex items-center gap-2 mb-3">
              <EventAvailableIcon color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Upcoming Appointments
              </Typography>
            </Box>

            {upcoming.map((item, i) => (
              <Box
                key={i}
                className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 p-2 rounded-xl hover:bg-gray-50 transition"
              >
                {/* Avatar + Info */}
                <Box className="flex items-center gap-3 mb-2 sm:mb-0">
                  <Avatar src={item.avatar} alt={item.title} />
                  <Box>
                    <Typography fontWeight={600} variant="body2">
                      {item.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.date}
                    </Typography>
                  </Box>
                </Box>

                {/* Details Button */}
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    fontSize: { xs: "0.7rem", sm: "0.75rem" },
                    alignSelf: "flex-start sm:align-self-auto",
                  }}
                >
                  Details
                </Button>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>

      {/* Notifications */}
      <Card elevation={1} className="rounded-2xl">
        <CardContent>
          <Box className="flex items-center gap-2 mb-3">
            <NotificationsActiveIcon color="primary" />
            <Typography variant="h6" fontWeight={600}>
              Notifications
            </Typography>
          </Box>

          {notifications.map((n, i) => (
            <Box key={i} className="flex items-start gap-2 mb-3">
              {i === 0 && <CheckCircleIcon color="success" />}
              {i === 1 && <EventAvailableIcon color="primary" />}
              {i === 2 && <NotificationsActiveIcon color="warning" />}

              <Box className="flex flex-col">
                <Typography variant="body2">{n.text}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {n.time}
                </Typography>
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}
