/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useGetAllAppointmentQuery } from "@/redux/api/appointmentApi";

const AllAppointments = () => {
  const pathname = usePathname();
  const { data: appointmentData, isLoading: isAppointmentLoading } =
    useGetAllAppointmentQuery();

  // Show only first 5 on dashboard
  const displayedAppointments =
    pathname === "/dashboard/admin"
      ? appointmentData?.slice(0, 5)
      : appointmentData;

  return (
    <>
      <Box className="flex justify-between items-center my-4">
        <Typography variant="h6" className="font-semibold">
          Appointment Management
        </Typography>

        {pathname === "/dashboard/admin" && (
          <Link href="/dashboard/admin/appointments">
            <Button variant="outlined" size="small">
              View All
            </Button>
          </Link>
        )}
      </Box>

      <Card className="shadow-md rounded-2xl mb-8">
        <CardContent>
          {isAppointmentLoading ? (
            <Typography>Loading appointments...</Typography>
          ) : displayedAppointments?.length > 0 ? (
            <Box sx={{ width: "100%", overflowX: "auto" }}>
              <Table
                sx={{
                  borderCollapse: "separate",
                  borderSpacing: "0 10px",
                  minWidth: 700,
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Client</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Provider</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Start Time</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>End Time</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {displayedAppointments.map((appt: any, i: number) => {
                    let statusColor = "default";
                    let statusLabel = appt?.status || "UNKNOWN";

                    switch (appt?.status) {
                      case "PENDING":
                        statusColor = "warning";
                        statusLabel = "Pending";
                        break;
                      case "COMPLETED":
                        statusColor = "success";
                        statusLabel = "Completed";
                        break;
                      case "CANCELLED":
                        statusColor = "error";
                        statusLabel = "Cancelled";
                        break;
                      case "CONFIRMED":
                        statusColor = "info";
                        statusLabel = "Confirmed";
                        break;
                      default:
                        statusColor = "default";
                    }

                    return (
                      <TableRow
                        key={i}
                        sx={{
                          backgroundColor: "white",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                          borderRadius: "12px",
                          "&:hover": { backgroundColor: "#f9fafb" },
                        }}
                      >
                        <TableCell sx={{ py: 2 }}>
                          {appt?.user?.name || "Unknown"}
                        </TableCell>

                        <TableCell sx={{ py: 2 }}>
                          {appt?.specialist?.name || "N/A"}
                        </TableCell>

                        <TableCell sx={{ py: 2 }}>
                          {new Date(appt?.date).toLocaleDateString()}
                        </TableCell>

                        <TableCell sx={{ py: 2 }}>
                          {appt?.startTime
                            ? new Date(appt.startTime).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "N/A"}
                        </TableCell>

                        <TableCell sx={{ py: 2 }}>
                          {appt?.endTime
                            ? new Date(appt.endTime).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "N/A"}
                        </TableCell>

                        <TableCell sx={{ py: 2 }}>
                          <Chip
                            label={statusLabel}
                            color={statusColor as any}
                            variant="outlined"
                            sx={{
                              fontWeight: "bold",
                              borderRadius: "8px",
                              fontSize: "0.8rem",
                              px: 1,
                              textTransform: "capitalize",
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          ) : (
            <Typography>No appointments found.</Typography>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default AllAppointments;
