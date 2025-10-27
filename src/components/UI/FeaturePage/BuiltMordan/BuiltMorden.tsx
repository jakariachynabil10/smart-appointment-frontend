import { Box, Typography, Container } from "@mui/material";

const BuildMorden = () => {
  return (
    <Box
      sx={{
        my: { xs: 6, md: 10, lg: 15 },
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography
          fontWeight={700}
          fontSize={{ xs: 24, sm: 30, md: 36, lg: 42 }}
          className="text-gray-900 leading-snug"
        >
          Built on Modern, Reliable Technologies
        </Typography>
      </Container>
    </Box>
  );
};

export default BuildMorden;
