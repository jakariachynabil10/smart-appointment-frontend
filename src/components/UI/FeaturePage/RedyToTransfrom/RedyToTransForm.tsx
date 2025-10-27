"use client";

import { motion, useAnimation } from "framer-motion";
import { Button, Typography, Container, Box } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import Link from "next/link";
import { useEffect } from "react";

const RedyToTransform = () => {
  const controls = useAnimation();

  // Start animation immediately when component mounts (after route navigation)
  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeInOut" as const },
    },
    tap: { scale: 0.95 },
  };

  const pulseVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
        mt: "10px",
      }}
    >
      {/* Background decorations */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -50,
          left: -50,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
        }}
      />

      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls} // ✅ Runs immediately on route load
        >
          <motion.div variants={itemVariants}>
            <Typography
              variant="h3"
              component="h2"
              align="center"
              sx={{
                fontWeight: "bold",
                mb: 3,
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              Ready to Transform Your Scheduling?
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="h6"
              align="center"
              sx={{
                mb: 6,
                opacity: 0.9,
                maxWidth: "600px",
                mx: "auto",
                fontSize: { xs: "1rem", md: "1.25rem" },
              }}
            >
              Join thousands of businesses already simplifying their operations
              with QuickMeet. Get started now and experience the difference.
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants} style={{ textAlign: "center" }}>
            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Link href="/register">
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    backgroundColor: "white",
                    color: "#667eea",
                    fontWeight: "bold",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                    borderRadius: "50px",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  Sign Up Now
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            style={{ textAlign: "center", marginTop: "2rem" }}
          >
            <motion.div variants={pulseVariants} animate="animate">
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.7,
                  fontStyle: "italic",
                }}
              >
                Grey Up for Time
              </Typography>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default RedyToTransform;
