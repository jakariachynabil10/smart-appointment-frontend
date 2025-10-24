import { Button } from "@mui/material";
import React from "react";

const HomePage = () => {
  return (
    <>
      <h1>Home</h1>
      <p className="text-4xl text-red-500">Welcome to the home page!</p>
      <Button variant="contained">Hello world</Button>
    </>
  );
};

export default HomePage;
