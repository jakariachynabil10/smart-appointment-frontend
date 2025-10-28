"use client";

import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Link as MuiLink,
} from "@mui/material";
import { motion } from "framer-motion";

import { FieldValues } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import SAForm from "@/components/Forms/SAForm";
import SAInput from "@/components/Forms/SAInput";
import loginImage from "../../../public/login.png";
import Link from "next/link";
// import toast from "react-hot-toast";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: FieldValues) => {
    setLoading(true);
    console.log(data);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        px: 2,
      }}
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row items-center justify-center gap-10"
      >
        {/* Left Illustration */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Image
            src={loginImage}
            alt="Login Illustration"
            width={380}
            height={380}
            className="hidden md:block"
          />
        </motion.div>

        {/* Right Login Card */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Card
            sx={{
              p: 3,
              width: 360,
              borderRadius: 3,
              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent>
              <Box textAlign="center" mb={2}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  className="text-indigo-600"
                >
                  QuickMeet
                </Typography>
              </Box>

              <Typography
                variant="subtitle1"
                fontWeight="bold"
                textAlign="center"
                mb={3}
              >
                Login to your account
              </Typography>

              <SAForm onSubmit={handleLogin}>
                <Box display="flex" flexDirection="column" gap={2}>
                  <SAInput
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    required
                  />
                  <SAInput
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    required
                  />

                  <Box textAlign="right">
                    <MuiLink
                      href="#"
                      underline="hover"
                      color="primary"
                      fontSize="0.875rem"
                    >
                      Forgot Password?
                    </MuiLink>
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    sx={{
                      mt: 1,
                      bgcolor: "primary.main",
                      py: 1.2,
                      fontWeight: "bold",
                      textTransform: "none",
                      borderRadius: 2,
                      ":hover": { bgcolor: "primary.dark" },
                    }}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>

                  <Typography
                    variant="body2"
                    textAlign="center"
                    mt={1.5}
                    color="text.secondary"
                  >
                    Don’t have an account?{" "}
                    <Link
                      href="/register"
                      className="text-blue-600 font-medium hover:underline transition-all duration-200"
                    >
                      Register
                    </Link>
                  </Typography>
                </Box>
              </SAForm>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default LoginPage;
