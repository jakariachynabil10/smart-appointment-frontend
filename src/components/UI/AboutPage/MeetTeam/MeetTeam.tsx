"use client";

import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { motion } from "framer-motion";

const team = [
  {
    name: "Eleanor Vance",
    role: "CEO & Founder",
    img: "/team1.png",
    desc: "Visionary leader driving QuickMeet’s mission to connect the world.",
  },
  {
    name: "Marcus Thorne",
    role: "CTO",
    img: "/team2.png",
    desc: "Architecting the robust and scalable technology behind QuickMeet.",
  },
  {
    name: "Sarah Chen",
    role: "Head of Product",
    img: "/team3.png",
    desc: "Championing user-centric design to create intuitive collaboration tools.",
  },
  {
    name: "David Lee",
    role: "Lead Engineer",
    img: "/team4.png",
    desc: "Building innovative features and ensuring platform stability.",
  },
];

const MeetTeam = () => {
  return (
    <>
      <Box className="py-20 md:py-28 bg-white px-4 flex flex-col items-center">
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Typography
            fontWeight="700"
            className="text-3xl! md:text-4xl! text-gray-900"
          >
            Meet Our Visionary Team
          </Typography>

          <Typography className="mt-10! text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Behind QuickMeet is a team of passionate innovators, dedicated to
            crafting the future of collaboration. We bring diverse expertise and
            a shared commitment to excellence.
          </Typography>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-14 w-full max-w-6xl">
          {team.map((person, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{
                scale: 1.04,
                y: -4,
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              }}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center"
            >
              <Avatar
                src={person.img}
                alt={person.name}
                className="w-20 h-20 mx-auto mb-4 rounded-full object-cover shadow-sm"
              />

              <Typography fontWeight="600" className="text-gray-900 text-lg">
                {person.name}
              </Typography>

              <Typography className="text-blue-600 text-sm font-medium mt-1 py-2">
                {person.role}
              </Typography>

              <Typography className="text-gray-600 text-sm mt-2 leading-relaxed">
                {person.desc}
              </Typography>
            </motion.div>
          ))}
        </div>
      </Box>
    </>
  );
};

export default MeetTeam;
