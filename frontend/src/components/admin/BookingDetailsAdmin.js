import {
  Box, CardContent, Chip, Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { formatInTimeZone } from 'date-fns-tz';
import React from 'react';
import SellIcon from '@mui/icons-material/Sell';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function BookingDetailsAdmin({ booking }) {
  const {
    lesson, numOfGuests, status, user,
  } = booking;
  const startDate = new Date(lesson?.start);
  const endDate = new Date(lesson?.end);

  return (
    <>
      {lesson
      && (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <CardContent sx={{ flex: '1 0 auto', p: 1, '&:last-child': { pb: 1 } }}>
            <Typography component="div" variant="subtitle2">
              Foglalva:
              {' '}
              {new Date(booking.createdAt).toLocaleString()}
              <Chip
                size="small"
                color={status === 'booked' ? 'success' : 'error'}
                label={status === 'booked' ? 'Foglalva' : 'Lemondva'}
              />
            </Typography>
            <Typography component="div" variant="h6">
              {user.name}
            </Typography>
            <Typography component="div" variant="body1" gutterBottom>
              {user.email}
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
              {`Ár: ${lesson.type.price}Ft`}
              {numOfGuests > 1 && ` / fő (Össz: ${lesson.type.price * numOfGuests}Ft)`}
            </Typography>
            <Box bgcolor={grey[200]}>

              <Typography component="div" variant="h6">
                {lesson?.type?.name}
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
                <Box
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
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 1,
                    lineHeight: 1,
                  }}
                >
                  <AccessTimeIcon fontSize="small" />
                  {`${formatInTimeZone(startDate, 'Europe/Budapest', 'HH:mm')} - ${formatInTimeZone(endDate, 'Europe/Budapest', 'HH:mm')}`}
                </Box>
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
                  lineHeight: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 1,
                    lineHeight: 1,
                  }}
                >

                  <SelfImprovementIcon fontSize="small" />
                  {`Oktató: ${lesson.type.instructor.name}`}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 1,
                    lineHeight: 1,
                  }}
                >

                  <LocationOnIcon fontSize="small" />
                  {lesson.type.location}
                </Box>
              </Typography>
            </Box>

          </CardContent>
        </Box>
      )}
    </>
  );
}

export default BookingDetailsAdmin;
