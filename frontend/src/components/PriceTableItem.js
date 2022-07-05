import React from 'react';
import {
  Box, Card, CardContent, CardMedia, Typography,
} from '@mui/material';

function PriceTableItem({ ticket }) {
  return (
    <Box display="flex" justifyContent="center">
      <Card
        variant="outlined"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          mb: 1,
          maxWidth: 600,
          width: '100%',
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 200, aspectRatio: '16/10', flexGrow: 1 }}
          image="https://media.istockphoto.com/photos/women-in-meditation-while-practicing-yoga-in-a-training-room-happy-picture-id1166417394?k=20&m=1166417394&s=612x612&w=0&h=LK4GrdXUX-I6dfrHsfAzStFOaS1zyRUMuNIx7kD7JtM="
          alt="logo-for-tickets"
        />
        <CardContent
          sx={{
            color: 'text.secondary',
            flex: '1 0 auto',
            flexDirection: 'column',
            p: 1,
            '&:last-child': { pb: 1 },
          }}
        >
          <Typography variant="h5">
            {ticket.name}
          </Typography>
          <Typography variant="subtitle1">
            <Box fontWeight={500} display="inline">
              Ára:
            </Box>
            {' '}
            {ticket.price}
          </Typography>
          <Typography variant="subtitle1">
            <Box fontWeight={500} display="inline">
              Részletek:
            </Box>
            {' '}
            {ticket.description}
          </Typography>
          <Typography
            variant="subtitle1"
            textTransform="capitalize"
          >
            <Box fontWeight={500} display="inline">
              Érvényesség:
            </Box>
            {' '}
            {ticket.validity}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default PriceTableItem;
