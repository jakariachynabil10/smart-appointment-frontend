/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { easeOut, motion } from "framer-motion";
import { Box, Typography, Button, Card, Avatar } from "@mui/material";
import { Check, CloudUpload } from "@mui/icons-material";
import SAInput from "@/components/Forms/SAInput";
import SAForm from "@/components/Forms/SAForm";
import { useState } from "react";
import Link from "next/link";
import { modifyPayloads } from "@/utils/modifyPayloads";
import { registerUser } from "@/service/actions/registerUser";
import toast from "react-hot-toast";
import { useUseLoginMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/service/actions/setAccessToken";
import { useRouter } from "next/navigation";

const Register = () => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [userLogin, { isLoading }] = useUseLoginMutation();
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, duration: 0.6 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeOut },
    },
  };

  // ✅ Handle Register Form Submit
  const handleRegister = async (values: any) => {
    try {
      const payload = { ...values, file: photoFile };
      const data = modifyPayloads(payload);

      // console.log("✅ Final FormData before sending:", data);

      const res = await registerUser(data);
      if (res?.data?.id) {
        toast.success(res?.message);
        const result = await userLogin({
          email: values.email,
          password: values.password,
        });

        if (result?.data?.accessToken) {
          storeUserInfo({ accessToken: result?.data?.accessToken });
          router.push("/");
        }
      }
    } catch (err) {
      console.error("❌ Register Error:", err);
    }
  };

  // ✅ Handle photo change
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
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
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* LEFT SIDE - Branding */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: "bold",
                    color: "white",
                    mb: 2,
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                  }}
                >
                  QuickMeet
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="h4"
                  sx={{
                    color: "white",
                    mb: 3,
                    opacity: 0.9,
                    fontSize: { xs: "1.5rem", md: "2rem" },
                  }}
                >
                  Create your account
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{ color: "white", opacity: 0.8, lineHeight: 1.6 }}
                >
                  Join thousands of businesses already simplifying their
                  operations with QuickMeet. Get started now and experience the
                  difference.
                </Typography>
              </motion.div>

              <motion.div
                variants={containerVariants}
                className="mt-8 space-y-4"
              >
                {[
                  "Easy appointment scheduling",
                  "Role-based dashboards",
                  "Smart reminders",
                  "Performance analytics",
                  "Multi-role management",
                  "Secure & reliable",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-center gap-3"
                  >
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        backgroundColor: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Check sx={{ fontSize: 16, color: "#667eea" }} />
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{ color: "white", opacity: 0.9 }}
                    >
                      {feature}
                    </Typography>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT SIDE - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card
                sx={{
                  p: 4,
                  borderRadius: 4,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
                  background: "white",
                }}
              >
                <SAForm onSubmit={handleRegister}>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-4"
                  >
                    <motion.div variants={itemVariants}>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          mb: 3,
                          color: "text.primary",
                        }}
                      >
                        Create Your Account
                      </Typography>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <SAInput
                        name="name"
                        label="Full Name"
                        required
                        fullWidth
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <SAInput
                        name="email"
                        label="Email Address"
                        type="email"
                        required
                        fullWidth
                      />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div variants={itemVariants}>
                        <SAInput
                          name="password"
                          label="Password"
                          type="password"
                          required
                          fullWidth
                        />
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <SAInput
                          name="confirmPassword"
                          label="Confirm Password"
                          type="password"
                          required
                          fullWidth
                        />
                      </motion.div>
                    </div>

                    {/* Upload Photo */}
                    <motion.div
                      variants={itemVariants}
                      className="flex flex-col items-center gap-4 mt-4"
                    >
                      {photoPreview && (
                        <Avatar
                          src={photoPreview}
                          sx={{ width: 80, height: 80, mb: 1 }}
                        />
                      )}
                      <Button
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUpload />}
                        sx={{
                          textTransform: "none",
                          borderRadius: 2,
                          borderColor: "#667eea",
                          color: "#667eea",
                          "&:hover": {
                            backgroundColor: "#f3f0ff",
                            borderColor: "#764ba2",
                          },
                        }}
                      >
                        Upload Photo
                        <input
                          hidden
                          accept="image/*"
                          type="file"
                          onChange={handlePhotoChange}
                        />
                      </Button>
                    </motion.div>

                    <motion.div variants={itemVariants} className="text-center">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          size="large"
                          sx={{
                            py: 1.5,
                            borderRadius: 2,
                            background:
                              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            "&:hover": {
                              background:
                                "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
                              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                            },
                          }}
                        >
                          Create Account
                        </Button>
                      </motion.div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Typography
                        variant="body2"
                        sx={{
                          textAlign: "center",
                          color: "text.secondary",
                          mt: 2,
                        }}
                      >
                        Already have an account?{" "}
                        <Link
                          href="/login"
                          className="text-blue-600 font-medium hover:underline transition-all duration-200"
                        >
                          Sign In
                        </Link>
                      </Typography>
                    </motion.div>
                  </motion.div>
                </SAForm>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Box>
  );
};

export default Register;
