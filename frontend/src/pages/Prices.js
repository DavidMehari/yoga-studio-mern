import {
  Box, Container, Typography,
} from '@mui/material';

import React from 'react';
import PriceTable from '../components/PriceTable';

function Prices() {
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h2" align="center" component="div" gutterBottom>
          Áraink
        </Typography>
        <Box>
          <PriceTable />
        </Box>
      </Box>
    </Container>
  );
}

export default Prices;
