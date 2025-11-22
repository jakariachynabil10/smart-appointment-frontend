/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { useGetUserAppointmentQuery } from "@/redux/api/appointmentApi";

const UserAppointmentsPage = () => {
  const { data: userData, isLoading: loadingUser } = useGetSingleUserQuery();
  const userId = userData?.id;

  const {
    data: appointments,
    isLoading: loadingAppointments,
    isError,
  } = useGetUserAppointmentQuery(userId, { skip: !userId });

  if (loadingUser || loadingAppointments) {
    return (
      <Box className="flex justify-center items-center h-64">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error" align="center" mt={4}>
        Failed to load appointments.
      </Typography>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center mt-6"
    >
      <Box display="flex" alignItems="center" gap={1.5} mb={3}>
        <EventAvailableIcon sx={{ color: "#1976d2" }} />
        <Typography variant="h6" fontWeight={600}>
          My Appointments
        </Typography>
      </Box>

      <Card
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 950,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(12px)",
          borderRadius: "16px",
          border: "1px solid rgba(25,118,210,0.15)",
          boxShadow: "0 6px 16px rgba(25,118,210,0.1)",
        }}
      >
        <CardContent>
          {appointments?.length > 0 ? (
            <Box sx={{ width: "100%", overflowX: "auto" }}>
              <Table sx={{ minWidth: 750 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Service</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Specialist</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      <CalendarMonthIcon fontSize="small" sx={{ mr: 0.5 }} />
                      Date
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Time</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {appointments.map((apt: any, index: number) => (
                    <motion.tr
                      key={apt.id || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <TableCell>{apt?.service?.name || "N/A"}</TableCell>

                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <PersonIcon fontSize="small" color="action" />
                          {apt?.specialist?.name || "N/A"}
                        </Box>
                      </TableCell>

                      <TableCell>
                        {new Date(apt?.date).toLocaleDateString()}
                      </TableCell>

                      <TableCell>
                        {new Date(apt?.startTime).toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}{" "}
                        -{" "}
                        {new Date(apt?.endTime).toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={
                            apt?.status
                              ? apt.status.charAt(0).toUpperCase() +
                                apt.status.slice(1)
                              : "Pending"
                          }
                          color={
                            apt?.status === "completed"
                              ? "success"
                              : apt?.status === "cancelled"
                              ? "error"
                              : "warning"
                          }
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </Box>
          ) : (
            <Typography align="center" color="textSecondary" mt={2}>
              No appointments found.
            </Typography>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserAppointmentsPage;
