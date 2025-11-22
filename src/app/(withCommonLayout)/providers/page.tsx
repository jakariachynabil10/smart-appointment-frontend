/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import { useGetAllSpecialistQuery } from "@/redux/api/specialsitApi";
import Link from "next/link";

const Providers = () => {
  const { data, isLoading, isError } = useGetAllSpecialistQuery();
  const specialists = data || [];

  const [searchText, setSearchText] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  // 📌 Extract unique specialties dynamically
  const specialties = [
    "All",
    ...new Set(
      specialists
        .map((s: any) => s.specialty)
        .filter((spec: any) => spec && spec !== "")
    ),
  ];

  // 🔍 Search + Specialty Filter Combined
  const filteredSpecialists = specialists.filter((s: any) => {
    const q = searchText.toLowerCase();

    const matchesSearch =
      s.name?.toLowerCase().includes(q) ||
      s.specialty?.toLowerCase().includes(q);

    const matchesSpecialty =
      selectedSpecialty === "All" ||
      s.specialty?.toLowerCase() === selectedSpecialty.toLowerCase();

    return matchesSearch && matchesSpecialty;
  });

  if (isLoading)
    return (
      <Box className="flex justify-center items-center h-[80vh]">
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );

  if (isError)
    return (
      <Box className="flex justify-center items-center h-[80vh] text-red-500 text-lg font-medium">
        Failed to load specialists 😔
      </Box>
    );

  return (
    <Box className="bg-gray-50 min-h-screen py-14 px-6 md:px-16 lg:px-24">
      {/* Header */}
      <Box className="text-center mb-12">
        <Typography
          variant="h4"
          className="font-semibold text-gray-800 mb-3 tracking-tight"
        >
          Find Your Perfect Professional
        </Typography>
        <Typography variant="body1" className="text-gray-500 pt-5 leading-relaxed">
          Browse our extensive network of certified professionals across various
          specialties.
        </Typography>
      </Box>

      {/* Search Bar */}
      <Box className="flex justify-center mb-8">
        <TextField
          placeholder="Search by name or specialty..."
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full md:w-2/3 lg:w-1/2 bg-white rounded-full"
          InputProps={{ className: "rounded-full px-4 py-1" }}
        />
      </Box>

      {/* Specialty Filter Buttons */}
      <Box className="flex flex-wrap justify-center gap-3 mb-14">
        {specialties.map((spec : any) => (
          <Button
            key={spec}
            onClick={() => setSelectedSpecialty(spec)}
            variant={selectedSpecialty === spec ? "contained" : "outlined"}
            color="primary"
            size="small"
            className={`rounded-full px-5 text-sm font-medium ${
              selectedSpecialty === spec
                ? "bg-blue-600 text-white"
                : "border-gray-300 text-gray-600 hover:bg-blue-50"
            }`}
          >
            {spec}
          </Button>
        ))}
      </Box>

      {/* Specialists Grid */}
      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
        {filteredSpecialists.length === 0 && (
          <Typography className="text-gray-500 text-lg col-span-3">
            No professionals found 😔
          </Typography>
        )}

        {filteredSpecialists.map((specialist: any, index: number) => (
          <motion.div
            key={specialist.id || index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{
              scale: 1.05,
              boxShadow:
                "0 10px 25px rgba(59,130,246,0.25), 0 0 10px rgba(96,165,250,0.15)",
            }}
          >
            <Card className="w-[400px] rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 bg-white">
              <CardContent className="flex flex-col items-center text-center p-8">
                <Avatar
                  src={
                    specialist.profilePhoto ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt={specialist.name}
                  sx={{ width: 90, height: 90 }}
                  className="mb-5 border-4 border-blue-100 shadow-sm"
                />

                <Typography variant="h6" className="font-semibold text-gray-800 capitalize">
                  {specialist.name}
                </Typography>

                <Typography variant="body2" className="text-gray-500 py-2 capitalize">
                  {specialist.specialty || "Specialty Not Available"}
                </Typography>

                <Typography variant="body2" color="text.secondary" className="mt-1">
                  {specialist.email}
                </Typography>

                <Box className="mt-4 text-sm text-gray-500">
                  <Typography variant="body2">
                    🗓️ Appointments: {specialist.appointments?.length || 0}
                  </Typography>
                  <Typography variant="body2">
                    ⏰ Available Slots: {specialist.availability?.length || 0}
                  </Typography>
                </Box>

                <Link href={"/dashboard/user"}>
                  <Button
                    variant="contained"
                    className="mt-5 rounded-full normal-case px-6 py-1.5 bg-blue-600 hover:bg-blue-700"
                  >
                    Book Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default Providers;
