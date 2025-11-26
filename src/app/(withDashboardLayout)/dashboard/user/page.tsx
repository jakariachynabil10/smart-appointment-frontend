/* eslint-disable @typescript-eslint/no-explicit-any */
 
"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";

import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import BookAppointment from "@/components/Dashboard/BookAppointment/BookAppointment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



const notifications = [
  { text: "Your dental checkup with Dr. White is confirmed.", time: "2h ago" },
  { text: "New slot available with Prof. Lee this Friday!", time: "1d ago" },
  { text: "Reminder: Coaching session tomorrow at 4 PM.", time: "1d ago" },
];

export default function UserDashboard() {
  const router = useRouter();

  // const userInfo = useUserInfo();
  const { data: userInfo, isLoading } = useGetSingleUserQuery();
  useEffect(() => {
    if (!isLoading) {
      if (userInfo?.role !== "USER") {
        toast.error("Only users can access this dashboard");

        // Delay redirect so toast is visible
        const timeout = setTimeout(() => {
          router.push("/login");
        }, 1500); // 1.5 sec delay so user can see toast

        return () => clearTimeout(timeout);
      }
    }
  }, [userInfo, isLoading, router]);

  const appointments = userInfo?.appointments || [];

  const stats = [
    {
      label: "Upcoming",
      value: appointments.length || 0,
      icon: <EventAvailableIcon color="primary" />,
    },
    {
      label: "Completed",
      value: appointments.filter((a: any) => a.status === "COMPLETED").length,
      icon: <CheckCircleIcon color="success" />,
    },
    {
      label: "Cancelled",
      value: appointments.filter((a: any) => a.status === "CANCELLED").length,
      icon: <CancelIcon color="error" />,
    },
    {
      label: "Pending",
      value: appointments.filter((a: any) => a.status === "PENDING").length,
      icon: <PendingActionsIcon color="warning" />,
    },
  ];

  return (
    <Box className="p-4 sm:p-6 md:p-8 min-h-screen space-y-8 rounded-xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{
                color: "#0d47a1",
                textShadow: "0 2px 6px rgba(33,150,243,0.2)",
              }}
              className="text-2xl md:text-3xl"
            >
              Welcome back, {userInfo?.name} 👋
            </Typography>
            <Typography variant="body2" sx={{ color: "#1565c0" }}>
              Manage and track your appointments efficiently.
            </Typography>
          </Box>
        </Box>
      </motion.div>

      {/* Stats */}
      <Box className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              elevation={6}
              className="rounded-2xl!"
              sx={{
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(33,150,243,0.1)",
                textAlign: "center",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0 8px 20px rgba(33,150,243,0.25)",
                },
              }}
            >
              <CardContent>
                <Box className="flex justify-center mb-1">{item.icon}</Box>
                <Typography
                  variant="body2"
                  sx={{ color: "#1565c0", fontWeight: 500 }}
                >
                  {item.label}
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>

      {/* Main Grid */}
      <Box className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Book New Appointment — takes full height */}
        <BookAppointment />
        {/* Right Column: Upcoming + Notifications */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col gap-6"
        >
          {/* Upcoming Appointments */}
          <Card
            elevation={6}
            className="rounded-2xl!"
            sx={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(33,150,243,0.1)",
            }}
          >
            <CardContent>
              <Box className="flex items-center gap-2 mb-3">
                <EventAvailableIcon sx={{ color: "#1976d2" }} />
                <Typography variant="h6" fontWeight={600}>
                  Upcoming Appointments
                </Typography>
              </Box>
              <Divider className="mb-3" />

              {/* ✅ Show only first 3 appointments */}
              {appointments
                .filter(
                  (a: any) => a.status === "PENDING" || a.status === "CONFIRMED"
                )
                .slice(0, 3)
                .map((a: any, i: number) => {
                  const date = new Date(a.date);
                  const start = new Date(a.startTime);
                  const end = new Date(a.endTime);

                  return (
                    <Box
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 p-3 rounded-xl hover:bg-blue-50 transition"
                    >
                      <Box className="flex items-center gap-3">
                        <Avatar
                          src={
                            a.specialist?.profilePhoto ||
                            "https://via.placeholder.com/48"
                          }
                          alt={a.specialist?.name || "Specialist"}
                          sx={{ width: 48, height: 48 }}
                        />
                        <Box>
                          <Typography fontWeight={600} variant="body2">
                            {a.specialist?.name || "Unknown Specialist"} —{" "}
                            {a.specialist?.specialty || "Service"}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {date.toLocaleDateString(undefined, {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}{" "}
                            •{" "}
                            {start.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}{" "}
                            -{" "}
                            {end.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Typography>
                        </Box>
                      </Box>

                      <Button
                        size="small"
                        variant="outlined"
                        sx={{
                          textTransform: "none",
                          borderRadius: "10px",
                          fontSize: "0.75rem",
                          borderColor:
                            a.status === "CONFIRMED"
                              ? "#2e7d32"
                              : a.status === "PENDING"
                              ? "#ff9800"
                              : "#1976d2",
                          color:
                            a.status === "CONFIRMED"
                              ? "#2e7d32"
                              : a.status === "PENDING"
                              ? "#ff9800"
                              : "#1976d2",
                          "&:hover": {
                            bgcolor:
                              a.status === "CONFIRMED"
                                ? "#2e7d32"
                                : a.status === "PENDING"
                                ? "#ff9800"
                                : "#1976d2",
                            color: "#fff",
                          },
                        }}
                      >
                        {a.status}
                      </Button>
                    </Box>
                  );
                })}

              {/* 🟡 Empty State */}
              {appointments.filter(
                (a: any) => a.status === "PENDING" || a.status === "CONFIRMED"
              ).length === 0 && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ py: 2 }}
                >
                  No upcoming appointments found.
                </Typography>
              )}

              {/* 🔗 View All Button using Next Link */}
              <Box className="flex justify-center mt-4">
                <Link href="/dashboard/user/appointments" passHref>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      borderRadius: "10px",
                      bgcolor: "#1976d2",
                      "&:hover": { bgcolor: "#1565c0" },
                    }}
                  >
                    View All
                  </Button>
                </Link>
              </Box>
            </CardContent>
          </Card>

          {/* Notifications below Upcoming */}
          <Card
            elevation={6}
            className="rounded-2xl!"
            sx={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(33,150,243,0.1)",
            }}
          >
            <CardContent>
              <Box className="flex items-center gap-2 mb-3">
                <NotificationsActiveIcon sx={{ color: "#1976d2" }} />
                <Typography variant="h6" fontWeight={600}>
                  Notifications
                </Typography>
              </Box>
              <Divider className="mb-3" />

              {notifications.map((n, i) => (
                <Box
                  key={i}
                  className="flex items-start gap-3 mb-4 p-2 rounded-xl hover:bg-blue-50 transition"
                >
                  {i === 0 && <CheckCircleIcon color="success" />}
                  {i === 1 && <EventAvailableIcon color="primary" />}
                  {i === 2 && <NotificationsActiveIcon color="warning" />}
                  <Box>
                    <Typography variant="body2" fontWeight={500}>
                      {n.text}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {n.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </Box>
    </Box>
  );
}
