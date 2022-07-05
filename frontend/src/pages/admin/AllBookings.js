import { Box, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Filters from '../../components/admin/Filters';
import BookingListItem from '../../components/BookingListItem';
import { getAllBookings } from '../../helpers/utils';

function AllBookings() {
  const [allBookings, setAllBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);

  const refreshData = async () => {
    const result = await getAllBookings();
    if (result.status === 200) {
      setAllBookings(result.bookings);
      setFilteredBookings(result.bookings);
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
          Foglalások
        </Typography>

        <Box sx={{ p: 2 }}>
          <Filters
            bookings={allBookings}
            setBookings={setAllBookings}
            filteredBookings={filteredBookings}
            setFilteredBookings={setFilteredBookings}
            refreshData={refreshData}
          />
        </Box>

        <Box
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          {filteredBookings.map((booking) => (
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

export default AllBookings;
