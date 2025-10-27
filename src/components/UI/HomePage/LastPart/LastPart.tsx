"use client";

import { motion } from "framer-motion";
import { Star, FormatQuote } from "@mui/icons-material";
import { Box, Typography, Button, Container, Card } from "@mui/material";
import Link from "next/link";

const LastPart = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  const testimonials = [
    {
      text: "Ask about the company's transformation from a message on client appointments. The incredible machine and reliable.",
      author: "Join the business to evaluate.",
      stars: 5,
    },
    {
      text: "The analytics provided are a game-changer for my practice. Let us only see what's working and where to improve.",
      author: "Dr. John Smith, Projects",
      stars: 5,
    },
    {
      text: "Our administrative tasks have been cut in that makes the QuickMeet's efficient management tools. Highly recommended.",
      author: "State Office Office Manager",
      stars: 5,
    },
  ];

  return (
    <Box sx={{ bgcolor: "white" }}>
      {/* What Our Users Are Saying Section */}
      <Box sx={{ py: 8, px: 2 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h3"
              component="h2"
              align="center"
              sx={{
                fontWeight: "bold",
                mb: 2,
                color: "text.primary",
              }}
            >
              What Our Users Are Saying
            </Typography>
            <Typography
              variant="h6"
              align="center"
              sx={{
                mb: 6,
                color: "text.secondary",
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              Discover how QuickMeet is transforming businesses worldwide
            </Typography>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card
                  sx={{
                    p: 4,
                    height: "100%",
                    bgcolor: "grey.50",
                    border: "1px solid",
                    borderColor: "grey.200",
                    "&:hover": {
                      boxShadow: 4,
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <Box sx={{ display: "flex", mb: 2 }}>
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star
                        key={i}
                        sx={{ color: "yellow.400", fontSize: "20px" }}
                      />
                    ))}
                  </Box>
                  <FormatQuote
                    sx={{ color: "grey.400", fontSize: "28px", mb: 2 }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.primary",
                      lineHeight: 1.6,
                      mb: 2,
                      fontStyle: "italic",
                    }}
                  >
                    &quot;{testimonial.text}&quot;
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "text.secondary",
                      fontWeight: "semibold",
                    }}
                  >
                    {testimonial.author}
                  </Typography>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Box>

      {/* Ready to Simplify Your Scheduling Section */}
      <Box
        sx={{
          py: 8,
          px: 2,
          background: "linear-gradient(135deg, #e0f2fe 0%, #f3e8ff 100%)",
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h3"
              component="h2"
              align="center"
              sx={{
                fontWeight: "bold",
                mb: 3,
                color: "text.primary",
              }}
            >
              Ready to Simplify Your Scheduling?
            </Typography>
            <Typography
              variant="h6"
              align="center"
              sx={{
                mb: 4,
                color: "text.secondary",
                maxWidth: "500px",
                mx: "auto",
              }}
            >
              Join thousands of businesses that trust QuickMeet for their
              appointment management needs
            </Typography>

            <Box sx={{ textAlign: "center", mb: 6 }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={"/register"}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      background:
                        "linear-gradient(135deg, #1976d2 0%, #7b1fa2 100%)",
                      color: "white",
                      fontWeight: "bold",
                      py: 2,
                      px: 6,
                      fontSize: "1.1rem",
                      borderRadius: "50px",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #1565c0 0%, #6a1b9a 100%)",
                        boxShadow: 4,
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Register Now
                  </Button>
                </Link>
              </motion.div>
            </Box>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: "white",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: 1,
                  }}
                >
                  📅
                </Box>
                <Typography variant="body2" sx={{ color: "grey.600" }}>
                  Easy Scheduling
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: "white",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: 1,
                  }}
                >
                  ⚡
                </Box>
                <Typography variant="body2" sx={{ color: "grey.600" }}>
                  Fast Setup
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: "white",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: 1,
                  }}
                >
                  🔒
                </Box>
                <Typography variant="body2" sx={{ color: "grey.600" }}>
                  Secure & Reliable
                </Typography>
              </Box>
            </div>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default LastPart;
