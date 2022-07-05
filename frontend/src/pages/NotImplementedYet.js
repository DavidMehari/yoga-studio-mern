import {
  Box, Button, Container, Typography,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function NotImplementedYet() {
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography
        variant="h2"
        fontWeight="200"
        align="center"
        component="h1"
        gutterBottom
      >
        404
      </Typography>
      <Typography
        variant="h3"
        fontWeight="200"
        align="center"
        component="h1"
        gutterBottom
      >
        A keresett oldal nem található.
      </Typography>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Button to="/" component={Link} variant="contained" startIcon={<ArrowBackIosIcon />}>
          Vissza a főoldalra
        </Button>
      </Box>
    </Container>
  );
}
