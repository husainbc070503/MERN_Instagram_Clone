import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <Box>
      <CircularProgress
        color="primary"
        sx={{ position: "absolute", top: "50%", left: "50%" }}
      />
    </Box>
  );
};

export default Loader;
