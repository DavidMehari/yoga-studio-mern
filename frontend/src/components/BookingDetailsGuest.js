import {
  Box, CardContent, Chip, Typography,
} from '@mui/material';
import { formatInTimeZone } from 'date-fns-tz';
import React from 'react';
import SellIcon from '@mui/icons-material/Sell';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function BookingDetailsGuest({ booking }) {
  const {
    lesson, numOfGuests, status,
  } = booking;
  const startDate = new Date(lesson.start);
  const endDate = new Date(lesson.end);

  return (
    <>
      {lesson
    && (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: '1 0 auto', p: 1, '&:last-child': { pb: 1 } }}>
        <Typography component="div" variant="h5">
          {lesson.type.name}
          <Chip
            size="small"
            color={status === 'booked' ? 'success' : 'error'}
            label={status === 'booked' ? 'Foglalva' : 'Lemondva'}
          />
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          component="div"
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
            lineHeight: 1,
          }}
        >
          <CalendarMonthIcon fontSize="small" />
          {`${startDate.toLocaleDateString('hu-HU', { timeZone: 'Europe/Budapest' })}` }
          <AccessTimeIcon fontSize="small" />
          {`${formatInTimeZone(startDate, 'Europe/Budapest', 'HH:mm')} - ${formatInTimeZone(endDate, 'Europe/Budapest', 'HH:mm')}`}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          component="div"
          textTransform="capitalize"
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
            lineHeight: 1,
          }}
        >
          <SelfImprovementIcon fontSize="small" />
          {`Oktató: ${lesson.instructor.name}`}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          component="div"
          textTransform="capitalize"
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
            lineHeight: 1,
          }}
        >
          <LocationOnIcon fontSize="small" />
          {lesson.location}
        </Typography>

        <Typography
          variant="subtitle1"
          color="text.secondary"
          component="div"
          textTransform="capitalize"
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
            lineHeight: 1,
          }}
        >
          <GroupIcon fontSize="small" />
          {`${numOfGuests} fő`}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          component="div"
          textTransform="capitalize"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            lineHeight: 1,
          }}
        >
          <SellIcon fontSize="small" />
          {`Price: ${lesson.price}Ft`}
          {numOfGuests > 1 && ` / fő (Össz: ${lesson.price * numOfGuests}Ft)`}
        </Typography>
      </CardContent>
    </Box>
    )}
    </>
  );
}

export default BookingDetailsGuest;
