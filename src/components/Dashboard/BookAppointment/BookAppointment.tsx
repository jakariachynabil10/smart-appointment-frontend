/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useMemo } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { motion } from "framer-motion";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { useGetAllSpecialistQuery } from "@/redux/api/specialsitApi";
import { useGetAllServicesQuery } from "@/redux/api/serviceApi";
import { useCreateAppointmentMutation } from "@/redux/api/appointmentApi";
import { useGetAvailabilityBySpecialistQuery } from "@/redux/api/availabilityApi";


// Helper: generate hourly slots between start and end time (12-hour format)
const generateTimeSlots = (start: string, end: string) => {
  const slots: string[] = [];
  const startDate = new Date(start);
  const endDate = new Date(end);

  while (startDate < endDate) {
    const time = startDate.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    slots.push(time);
    startDate.setHours(startDate.getHours() + 1);
  }
  return slots;
};




const BookAppointment = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { data: userData, isLoading: loadingUser } = useGetSingleUserQuery();
  const { data: specialists, isLoading: loadingSpecialists } = useGetAllSpecialistQuery();
  const { data: services, isLoading: loadingServices } = useGetAllServicesQuery();
  const [createAppointment, { isLoading: creating }] = useCreateAppointmentMutation();

  // Fetch availability for selected specialist
  const { data: availabilityData, isLoading: loadingAvailability } =
    useGetAvailabilityBySpecialistQuery(selectedSpecialist, {
      skip: !selectedSpecialist,
    });

  const userId = userData?.id;

  // Determine day of week for selected date
  const selectedDayOfWeek = selectedDate ? selectedDate.getDay() : null;

  // Generate dynamic time slots
const availableSlots = useMemo(() => {
  if (!availabilityData || selectedDayOfWeek === null) return [];

  // Match the day of week
  const dayAvailabilities = availabilityData.filter(
    (a: any) => a.dayOfWeek === selectedDayOfWeek
  );

  // Collect all slots
  let slots: string[] = [];
  dayAvailabilities.forEach((a: any) => {
    const s = generateTimeSlots(a.startTime, a.endTime);
    slots = [...slots, ...s];
  });

  // ✅ Remove duplicates and sort chronologically
  const uniqueSlots = Array.from(new Set(slots));

  // Optional: sort in proper time order (AM before PM)
  uniqueSlots.sort((a, b) => {
    const dateA = new Date(`1970-01-01 ${a}`);
    const dateB = new Date(`1970-01-01 ${b}`);
    return dateA.getTime() - dateB.getTime();
  });

  return uniqueSlots;
}, [availabilityData, selectedDayOfWeek]);


  // Booking logic
  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime || !selectedSpecialist || !selectedService) {
      alert("Please select date, time, specialist, and service.");
      return;
    }

    try {
      const [hours, minutes] = selectedTime.split(":");
      const hour = parseInt(hours);
      const minute = parseInt(minutes);
      const startTime = new Date(selectedDate);
      startTime.setHours(hour, minute, 0, 0);

      const endTime = new Date(startTime);
      endTime.setHours(endTime.getHours() + 1);

      const appointmentData: any = {
        userId,
        specialistId: selectedSpecialist,
        serviceId: selectedService,
        date: selectedDate,
        startTime,
        endTime,
      };

      await createAppointment(appointmentData).unwrap();
      setOpenSnackbar(true);
      setSelectedTime(null);
    } catch (error: any) {
      alert(error?.data?.message || "Failed to create appointment");
    }
  };

  // Loading state
  if (loadingUser || loadingSpecialists || loadingServices) {
    return (
      <Box className="flex justify-center items-center h-64">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="col-span-1 lg:col-span-2 flex flex-col"
      >
        <Card
          elevation={6}
          sx={{
            height: "100%",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(33,150,243,0.1)",
            boxShadow: "0 4px 16px rgba(33,150,243,0.1)",
            borderRadius: "16px",
          }}
        >
          <CardContent>
            <Box className="flex items-center gap-2 mb-4">
              <CalendarMonthIcon sx={{ color: "#1976d2" }} />
              <Typography variant="h6" fontWeight={600}>
                Book New Appointment
              </Typography>
            </Box>

            {/* Auto-filled user info */}
            <Box mb={3}>
              <Typography variant="body2" color="textSecondary">
                Booking as:{" "}
                <strong>
                  {userData?.name || "Unknown"} ({userData?.email})
                </strong>
              </Typography>
            </Box>

            {/* Specialist */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Select Specialist</InputLabel>
              <Select
                value={selectedSpecialist}
                onChange={(e) => setSelectedSpecialist(e.target.value)}
                label="Select Specialist"
              >
                {specialists?.map((sp: any) => (
                  <MenuItem key={sp.id} value={sp.id}>
                    {sp.name} — {sp.specialization || "Specialist"}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Service */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Select Service</InputLabel>
              <Select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                label="Select Service"
              >
                {services?.map((sv: any) => (
                  <MenuItem key={sv.id} value={sv.id}>
                    {sv.name} ({sv.price ? `$${sv.price}` : "Free"})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Calendar */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box className="flex justify-center mb-4">
                <DateCalendar
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                />
              </Box>
            </LocalizationProvider>

            {/* Dynamic Time Slots */}
            <Box className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {loadingAvailability ? (
                <CircularProgress size={24} />
              ) : availableSlots.length > 0 ? (
                availableSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "contained" : "outlined"}
                    size="small"
                    sx={{
                      textTransform: "none",
                      borderRadius: "12px",
                      fontWeight: 500,
                      borderColor: "#1976d2",
                      color: selectedTime === time ? "#fff" : "#1976d2",
                      bgcolor: selectedTime === time ? "#1976d2" : "transparent",
                      "&:hover": { bgcolor: "#1976d2", color: "#fff" },
                    }}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No available time slots for this day.
                </Typography>
              )}
            </Box>

            <Button
              fullWidth
              variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: "12px",
                py: 1.2,
                bgcolor: "#1976d2",
                "&:hover": { bgcolor: "#1565c0" },
              }}
              disabled={creating}
              onClick={handleBookAppointment}
            >
              {creating ? "Booking..." : "Book Now"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Appointment booked successfully!"
      />
    </>
  );
};

export default BookAppointment;
