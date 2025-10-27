"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import image1 from "../../../../../public/Selection (1).png";
import { motion } from "framer-motion";

const MotionBox = motion(Box); // ✅ Create a motion-enabled MUI Box

const HeroSection = () => {
  return (
    <Box className="bg-linear-to-b from-white via-blue-50 to-white">
      <Container className="py-16 md:py-24 lg:py-32">
        <Box
          className="
            flex flex-col-reverse lg:flex-row 
            items-center justify-between 
            gap-10 lg:gap-16
          "
        >
          {/* Left - Text Content */}
          <MotionBox
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center lg:text-left max-w-xl"
          >
            <Typography
              fontSize={{ xs: "32px", sm: "40px", lg: "52px" }}
              fontWeight="bold"
              className="leading-tight! text-gray-900"
            >
              Streamline Your <br />
              Schedule with{" "}
              <span className="text-blue-600">QuickMeet</span>
            </Typography>

            <Typography
              className="text-neutral-600 mt-5 pt-4 text-sm sm:text-base leading-relaxed"
            >
              The smart appointment booking system for clients, providers,
              and administrators. Experience seamless scheduling, smart
              reminders, and powerful analytics — all in one platform.
            </Typography>

            <Box
              className="
                flex flex-col sm:flex-row items-center lg:items-start 
                gap-4 mt-8 justify-center lg:justify-start
              "
            >
              <Link href="/register">
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  className="
                    transition-all duration-300 hover:shadow-blue-200 
                    hover:-translate-y-0.5 px-6 py-2 text-base font-medium
                  "
                >
                  Get Started
                </Button>
              </Link>

              <Link href="/features">
                <Button
                  variant="outlined"
                  size="medium"
                  className="
                    border-blue-500 text-blue-600 
                    hover:bg-blue-50 transition-all duration-300 
                    px-6 py-2 text-base font-medium
                  "
                >
                  Learn More
                </Button>
              </Link>
            </Box>
          </MotionBox>

          {/* Right - Image */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-end w-full lg:w-1/2"
          >
            <Image
              src={image1}
              alt="QuickMeet Hero"
              className="w-72 sm:w-96 lg:w-[520px] h-auto drop-shadow-xl"
              priority
            />
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
