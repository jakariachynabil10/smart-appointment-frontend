/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Paper,
  CircularProgress,
  Divider,
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { useGetAppointmentsBySpecialistIdQuery } from "@/redux/api/specialsitApi";

const TodayAppointment = () => {
  // 🧠 Get logged in specialist info
  const { data: userData, isLoading: userLoading } = useGetSingleUserQuery();
  console.log(userData);

  // 🧠 Fetch appointments for that specialist
  const specialistId = userData?.id;
  const { data: appointmentData, isLoading: appointmentLoading } =
    useGetAppointmentsBySpecialistIdQuery(specialistId, {
      skip: !specialistId, // wait until we have ID
    });

  // 🧮 Today's date (formatted as yyyy-mm-dd)
  const today = new Date().toISOString().split("T")[0];

  // 📅 Filter today's appointments
  const todayAppointments = useMemo(() => {
    if (!appointmentData?.appointments) return [];
    return appointmentData.appointments.filter(
      (item: any) =>
        item?.date && new Date(item.date).toISOString().split("T")[0] === today
    );
  }, [appointmentData, today]);

  if (userLoading || appointmentLoading)
    return (
      <Box className="flex justify-center items-center h-[80vh]">
        <CircularProgress />
      </Box>
    );

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header Section */}
      <Box className="flex justify-between items-center mb-5">
        <Box className="flex items-center space-x-3">
          <EventAvailableIcon color="primary" fontSize="large" />
          <Typography variant="h5" fontWeight="bold">
            Today’s Appointments
          </Typography>
        </Box>
        <Chip
          label={new Date().toLocaleDateString()}
          color="primary"
          variant="outlined"
        />
      </Box>

      <Divider className="mb-5" />

      {/* Table Section */}
      {todayAppointments.length > 0 ? (
        <Box className="bg-white p-4">
          <TableContainer
            component={Paper}
            className="shadow-sm border border-gray-100 rounded-xl!"
          >
            <Table>
              <TableHead className="bg-gray-100">
                <TableRow>
                  <TableCell className="font-semibold">Patient</TableCell>
                  <TableCell className="font-semibold">Email</TableCell>
                  <TableCell className="font-semibold">Date</TableCell>
                  <TableCell className="font-semibold">Time</TableCell>
                  <TableCell className="font-semibold">Status</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {todayAppointments.map((item: any, i: number) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="hover:bg-gray-50"
                  >
                    <TableCell>
                      <Box className="flex items-center space-x-3">
                        <Avatar
                          src={item?.user?.profilePhoto}
                          alt={item?.user?.name}
                          sx={{ width: 38, height: 38 }}
                        />
                        <Typography>{item?.user?.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{item?.user?.email}</TableCell>
                    <TableCell>
                      {new Date(item?.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {item?.startTime
                        ? `${new Date(item.startTime).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })} - ${new Date(item.endTime).toLocaleTimeString(
                            [],
                            {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}`
                        : "N/A"}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={item?.status || "Pending"}
                        color={
                          item?.status === "Completed"
                            ? "success"
                            : item?.status === "Cancelled"
                            ? "error"
                            : "warning"
                        }
                        variant="outlined"
                      />
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box className="text-center py-10 bg-white rounded-2xl shadow-sm border border-gray-100">
          <Typography variant="h6" color="textSecondary">
            No appointments for today.
          </Typography>
        </Box>
      )}
    </motion.div>
  );
};

export default TodayAppointment;
