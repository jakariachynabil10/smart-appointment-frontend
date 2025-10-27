"use client";
import { motion } from "framer-motion";
import { Typography, Card, CardContent, Box } from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import SecurityIcon from "@mui/icons-material/Security";

const features = [
  {
    icon: <SpeedIcon sx={{ fontSize: 40, color: "#ec4899" }} />,
    title: "Boost Efficiency",
    desc: "Automate scheduling tasks, reduce manual errors,\nand free up your team to focus on core activities.\nStreamline every step from booking to follow-up.",
  },
  {
    icon: <ThumbUpAltIcon sx={{ fontSize: 40, color: "#a855f7" }} />,
    title: "Enhance Customer Experience",
    desc: "Provide a smooth, effortless booking process for your clients.\nEasy scheduling leads to higher satisfaction and repeat business.",
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 40, color: "#f87171" }} />,
    title: "Scale Your Business",
    desc: "QuickMeet is designed to grow with you.\nEasily manage more appointments, clients, and providers without operational bottlenecks.",
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 40, color: "#3b82f6" }} />,
    title: "Reliable and Secure",
    desc: "Built on modern, robust technologies, ensuring your data is safe\nand your operations run smoothly with minimal downtime.",
  },
];


export default function BestChoice() {
  return (
    <section className="py-20 bg-linear-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h4"
            className="font-bold mb-12 text-gray-900 text-center"
            sx={{ fontSize: { xs: "1.8rem", md: "2.4rem" } }}
          >
            Why <span className="text-indigo-600">QuickMeet</span> is Your Best
            Choice
          </Typography>
        </motion.div>

        {/* Tailwind Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="hover:shadow-2xl transition-all duration-300"
            >
              <Card
                sx={{
                  borderRadius: "20px",
                  border: "1px solid #eaeaea",
                  boxShadow:
                    "0 4px 12px rgba(0,0,0,0.05), 0 0 4px rgba(0,0,0,0.05)",
                }}
                className="h-full bg-white"
              >
                <CardContent className="flex flex-col items-start space-y-4 py-8 px-6">
                  <Box className="flex items-center gap-5">
                    <motion.div
                      whileHover={{
                        rotate: [0, -8, 8, 0],
                        transition: { duration: 0.5, ease: "easeInOut" },
                      }}
                    >
                      {feature.icon}
                    </motion.div>

                    <Typography
                      variant="h6"
                      className="font-bold text-gray-800 mt-1"
                    >
                      {feature.title}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    className="text-gray-700 font-medium leading-relaxed"
                    sx={{ whiteSpace: "pre-line" }}
                  >
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
