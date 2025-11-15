/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Box,
  Card,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import SAForm from "@/components/Forms/SAForm";
import { useCreateServiceMutation } from "@/redux/api/serviceApi";
import toast from "react-hot-toast";
import SAInput from "@/components/Forms/SAInput";
import { useGetSingleUserQuery } from "@/redux/api/userApi";

const CreateService = () => {
  const [createService] = useCreateServiceMutation();
  const { data: currentUser, isLoading: isUserLoading } =
    useGetSingleUserQuery();

  const handleSubmit = async (values: any) => {
    try {
      const serviceData: any = {
        name: values.name,
        description: values.description,
        duration: values.duration,
        price: values.price,
        specialistId: currentUser?.id, // AUTO-FILLED
      };

      const res = await createService(serviceData).unwrap();
      toast.success("Service created successfully!");
      console.log(res);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create service");
    }
  };

  if (isUserLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
      sx={{ py: 6 }}
    >
      <Card
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 550,
          borderRadius: "20px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          mb={3}
          sx={{ fontWeight: 600, color: "#1565c0" }}
        >
          🩺 Create New Service
        </Typography>

        <SAForm onSubmit={handleSubmit}>
          <SAInput
            name="name"
            label="Service Name"
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <SAInput
            name="description"
            label="Description"
            fullWidth
            sx={{ mb: 2 }}
          />
          <SAInput
            name="duration"
            label="Duration (in minutes)"
            type="number"
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <SAInput
            name="price"
            label="Price (optional)"
            type="number"
            fullWidth
            sx={{ mb: 2 }}
          />

          {/* Auto-filled Specialist Field */}
          <SAInput
            name="specialistName"
            label="Specialist"
            fullWidth
            value={currentUser?.name}
            sx={{ mb: 3 }}
          />

          <Box display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<CloudUpload />}
              sx={{
                borderRadius: "12px",
                px: 4,
                py: 1.2,
                textTransform: "none",
                fontSize: "1rem",
                background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #1565c0 0%, #2196f3 100%)",
                },
              }}
            >
              Create Service
            </Button>
          </Box>
        </SAForm>
      </Card>
    </Box>
  );
};

export default CreateService;
