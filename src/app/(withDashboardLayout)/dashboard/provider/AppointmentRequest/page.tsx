/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { useGetAppointmentsBySpecialistIdQuery } from "@/redux/api/specialsitApi";
import { useUpdateAppointmentStatusMutation } from "@/redux/api/appointmentApi";

const AppointmentRequest = () => {
  const { data: userData, isLoading: userLoading } = useGetSingleUserQuery();
  const specialistId = userData?.id;

  const {
    data: appointmentData,
    isLoading: appointmentLoading,
    refetch,
  } = useGetAppointmentsBySpecialistIdQuery(specialistId, {
    skip: !specialistId,
  });

  const [updateAppointmentStatus, { isLoading: updateLoading }] =
    useUpdateAppointmentStatusMutation();

  const [selectedStatus, setSelectedStatus] = useState<{ [key: string]: string }>({});
  const [previousStatus, setPreviousStatus] = useState<{ [key: string]: string }>({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(
    null
  );

  // ✅ Format ISO or HH:mm:ss time to 12-hour AM/PM
  const formatTime = (time: string) => {
    if (!time) return "-";
    const dateObj = new Date(time);
    if (isNaN(dateObj.getTime())) return time; // fallback
    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setPreviousStatus((prev) => ({ ...prev, [id]: selectedStatus[id] || "PENDING" }));
    setSelectedStatus((prev) => ({ ...prev, [id]: newStatus }));
    setSelectedAppointmentId(id);
    setOpenDialog(true);
  };

  const handleConfirmUpdate = async () => {
    if (!selectedAppointmentId) return;
    try {
      await updateAppointmentStatus({
        id: selectedAppointmentId,
        status: selectedStatus[selectedAppointmentId],
      }).unwrap();
      setOpenDialog(false);
      setSelectedAppointmentId(null);
      refetch();
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const handleCancelUpdate = () => {
    if (selectedAppointmentId) {
      setSelectedStatus((prev) => ({
        ...prev,
        [selectedAppointmentId]:
          previousStatus[selectedAppointmentId] || "PENDING",
      }));
    }
    setOpenDialog(false);
    setSelectedAppointmentId(null);
  };

  if (userLoading || appointmentLoading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="p-6">
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Appointment Requests
      </Typography>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Box className="overflow-x-auto mt-4">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-gray-700">Client Name</th>
                <th className="py-3 px-4 text-left text-gray-700">Date</th>
                <th className="py-3 px-4 text-left text-gray-700">Time</th>
                <th className="py-3 px-4 text-left text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointmentData?.appointments?.length > 0 ? (
                appointmentData.appointments.map((item: any) => {
                  const currentStatus =
                    selectedStatus[item.id] || item.status || "PENDING";

                  return (
                    <tr
                      key={item.id}
                      className=" hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-4">{item.user?.name || "Unknown"}</td>
                      <td className="py-3 px-4">
                        {new Date(item.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="py-3 px-4">
                        {formatTime(item.startTime)} - {formatTime(item.endTime)}
                      </td>
                      <td className="py-3 px-4">
                        <FormControl size="small" sx={{ minWidth: 130 }}>
                          <InputLabel>Status</InputLabel>
                          <Select
                            value={currentStatus}
                            label="Status"
                            onChange={(e) =>
                              handleStatusChange(item.id, e.target.value)
                            }
                          >
                            <MenuItem value="PENDING">PENDING</MenuItem>
                            <MenuItem value="CONFIRMED">CONFIRMED</MenuItem>
                            <MenuItem value="COMPLETED">COMPLETED</MenuItem>
                            <MenuItem value="CANCELLED">CANCELLED</MenuItem>
                          </Select>
                        </FormControl>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Box>
      </motion.div>

      {/* ✅ Confirmation Modal */}
      <Dialog
        open={openDialog}
        onClose={handleCancelUpdate}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle className="text-center font-semibold">
          Confirm Status Update
        </DialogTitle>
        <DialogContent>
          <Typography className="text-center">
            Are you sure you want to update this appointment status to{" "}
            <strong>
              {selectedAppointmentId &&
                selectedStatus[selectedAppointmentId]?.toUpperCase()}
            </strong>
            ?
          </Typography>
        </DialogContent>
        <DialogActions className="flex justify-center pb-4">
          <Button
            variant="contained"
            color="success"
            onClick={handleConfirmUpdate}
            disabled={updateLoading}
          >
            {updateLoading ? "Updating..." : "Yes"}
          </Button>
          <Button variant="outlined" color="error" onClick={handleCancelUpdate}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AppointmentRequest;
