import {
  Box, Container, Typography,
} from '@mui/material';

import React from 'react';
import PriceTableV2 from '../components/PriceTableV2';

function Prices() {
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h2" align="center" component="div" gutterBottom>
          Áraink
        </Typography>
        <Box>
          <PriceTableV2 />
        </Box>
      </Box>
    </Container>
  );
}

export default Prices;
