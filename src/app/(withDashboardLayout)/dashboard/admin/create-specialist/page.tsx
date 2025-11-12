/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import SAForm from "@/components/Forms/SAForm";
import SAInput from "@/components/Forms/SAInput";
import toast from "react-hot-toast";
import Link from "next/link";
import { useCreateSpecialistMutation } from "@/redux/api/specialsitApi";
import { modifyPayloads } from "@/utils/modifyPayloads";
import { useRouter } from "next/navigation";


const CreateSpecialist = () => {
   const router = useRouter();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // ✅ RTK Query mutation hook
  const [createSpecialist, { isLoading }] = useCreateSpecialistMutation();

  // 🧩 Form submit handler
  const handleCreateSpecialist = async (values: any) => {
    try {
      // Combine form values and file
      const payload = { ...values, file: photoFile };
      const data = modifyPayloads(payload);

    
      const res = await createSpecialist(data);
      router.refresh();
      toast.success("✅ Specialist created successfully!");
   

    } catch (error: any) {
      console.error("❌ Specialist creation failed:", error);
      toast.error(error?.data?.message || "Failed to create specialist");
    }
  };

  // 🖼 Handle photo upload preview
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        p: 3,
      }}
    >
      <Card sx={{ p: 4, maxWidth: 450, width: "100%", borderRadius: 3 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center", mb: 3 }}
        >
          Create Specialist
        </Typography>

        <SAForm onSubmit={handleCreateSpecialist}>
          <Box display="flex" flexDirection="column" gap={2}>
            <SAInput name="name" label="Full Name" required fullWidth />
            <SAInput name="email" label="Email Address" type="email" required fullWidth />
            <SAInput name="password" label="Password" type="password" required fullWidth />
            <SAInput name="specialty" label="Specialty" required fullWidth />

            {/* Upload Photo */}
            <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={2}>
              {photoPreview && (
                <Avatar src={photoPreview} sx={{ width: 90, height: 90 }} />
              )}
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUpload />}
              >
                Upload Photo
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handlePhotoChange}
                />
              </Button>
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              sx={{
                mt: 2,
                py: 1.3,
                borderRadius: 2,
                fontWeight: "bold",
              }}
            >
              {isLoading ? "Creating..." : "Create Specialist"}
            </Button>

            <Typography
              variant="body2"
              sx={{ textAlign: "center", mt: 2 }}
            >
              Want to view all specialists?{" "}
              <Link
                href="/dashboard/admin/users"
                className="text-blue-600 font-medium hover:underline"
              >
                Go to List
              </Link>
            </Typography>
          </Box>
        </SAForm>
      </Card>
    </Box>
  );
};

export default CreateSpecialist;
