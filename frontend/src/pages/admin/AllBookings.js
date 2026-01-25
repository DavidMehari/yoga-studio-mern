import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import Filters from '../../components/admin/Filters';
import BookingListItem from '../../components/BookingListItem';
import { getAllBookings } from '../../helpers/utils';

function AllBookings() {
  const [allBookings, setAllBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);

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

  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / rowsPerPage));
  const pagedBookings = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredBookings.slice(start, start + rowsPerPage);
  }, [filteredBookings, page, rowsPerPage]);

  useEffect(() => {
    setPage(1);
  }, [filteredBookings, rowsPerPage]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
  };

  const startIndex = filteredBookings.length === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const endIndex = Math.min(page * rowsPerPage, filteredBookings.length);

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
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            px: 2,
            pb: 2,
            maxWidth: (theme) => theme.breakpoints.values.md,
            mx: 'auto',
            width: '100%',
          }}
        >
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            {filteredBookings.length === 0
              ? 'Nincs találat'
              : `${startIndex}-${endIndex} / ${filteredBookings.length}`}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="rows-per-page">Oldal méret</InputLabel>
              <Select
                labelId="rows-per-page"
                value={rowsPerPage}
                label="Oldal méret"
                onChange={handleRowsPerPageChange}
              >
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
            />
          </Box>
        </Box>

        <Box
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          {pagedBookings.map((booking) => (
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
