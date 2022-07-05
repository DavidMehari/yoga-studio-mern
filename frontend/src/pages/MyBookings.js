import { Box, Container, Typography } from '@mui/material';
import { startOfToday } from 'date-fns';
import React, { useEffect, useState } from 'react';
import BookingListItem from '../components/BookingListItem';
import { getMyBookings } from '../helpers/utils';

function MyBookings() {
  const [myBookings, setMyBookings] = useState([]);

  const refreshData = async () => {
    const result = await getMyBookings();

    if (result.status === 200) {
      const sortedBookings = []
        .concat(result.bookings)
        .sort((a, b) => new Date(a.lesson.start) - new Date(b.lesson.start))
        .filter((booking) => new Date(booking.lesson.start) > startOfToday());

      setMyBookings(() => sortedBookings);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Box component="div">
        <Typography
          variant="h2"
          fontWeight="200"
          align="center"
          component="div"
          gutterBottom
        >
          Foglalásaim
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {myBookings.map((booking) => (
            <BookingListItem
              key={booking._id}
              booking={booking}
              refreshData={refreshData}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default MyBookings;
