import { Box } from '@mui/material';
import React from 'react';

function Main({ children }) {
  return (
    <Box component="main">
      {children}
    </Box>
  );
}

export default Main;
