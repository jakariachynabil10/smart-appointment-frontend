/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  MenuItem,
  Typography,
  Card,
  CircularProgress,
} from "@mui/material";
import SAForm from "@/components/Forms/SAForm";
import SAInput from "@/components/Forms/SAInput";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import toast from "react-hot-toast";
import { useCreateAvailabilityMutation } from "@/redux/api/availabilityApi";

const daysOfWeek = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

const CreateSchedule = () => {
  const { data: userData, isLoading: userLoading } = useGetSingleUserQuery();
  const [createAvailability] = useCreateAvailabilityMutation();

  const handleCreateAvailability = async (data: any) => {
    try {
      const formData = {
        specialistId: userData?.id, // send ID
        dayOfWeek: parseInt(data.dayOfWeek),
        startTime: data.startTime,
        endTime: data.endTime,
      };

      const res = await createAvailability(formData).unwrap();
      toast.success("✅ Availability created successfully!");
      console.log(res);
    } catch (error: any) {
      toast.error(error?.data?.message || "❌ Failed to create availability");
      console.error(error);
    }
  };

  if (userLoading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (!userData?.id) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <Typography variant="h6" color="error">
          ⚠️ User not found. Please log in first.
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="p-8 rounded-2xl shadow-xl w-[450px] bg-white">
          <Typography
            variant="h5"
            className="font-semibold text-center text-gray-800 mb-6"
          >
            🕒 Create Availability
          </Typography>

          <SAForm
            onSubmit={handleCreateAvailability}
            defaultValues={{
              specialistId: userData?.id, // hidden field for submission
            }}
          >
            {/* Display user name (read-only, not part of form) */}
            <Box className="mb-2">
              <Typography
                variant="body1"
                className="text-gray-700 font-bold! py-5"
              >
                Specialist: {userData?.name}
              </Typography>
            </Box>

            {/* Hidden field for specialist ID */}
            <SAInput
              name="specialistId"
              label="Specialist ID"
              fullWidth
              required
              sx={{ display: "none" }}
            />

            {/* Day of Week */}
            <SAInput
              name="dayOfWeek"
              label="Day of Week"
              fullWidth
              required
              select
              sx={{ mb: 2 }}
            >
              {daysOfWeek.map((day) => (
                <MenuItem key={day.value} value={day.value}>
                  {day.label}
                </MenuItem>
              ))}
            </SAInput>

            {/* Start Time */}
            <Box className="mb-1 font-medium text-gray-700">Start Time</Box>
            <SAInput
              name="startTime"
              type="datetime-local"
              fullWidth
              required
              sx={{ mb: 2 }}
            />

            {/* End Time */}
            <Box className="mb-1 font-medium text-gray-700">End Time</Box>
            <SAInput
              name="endTime"
              type="datetime-local"
              fullWidth
              required
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ py: 1.2 }}
            >
              Create Availability
            </Button>
          </SAForm>
        </Card>
      </motion.div>
    </Box>
  );
};

export default CreateSchedule;
