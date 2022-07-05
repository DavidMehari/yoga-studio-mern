import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {
  Alert,
  Avatar,
  Box,
  Grid,
  IconButton,
  Slide,
  Stack,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SellIcon from '@mui/icons-material/Sell';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';

import { differenceInMinutes } from 'date-fns';
import { useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LoadingButton from '@mui/lab/LoadingButton';
import { formatInTimeZone } from 'date-fns-tz';
import { TransitionUp } from '../helpers/transitions';
import { bookLesson, isEmptyObj } from '../helpers/utils';
import { useUserContext } from '../contexts/UserContext';

function LessonItemDetailed({
  lesson,
  detailedLessonOpen,
  setDetailedLessonOpen,
  refreshData,
}) {
  const {
    start,
    end,
    price,
    location,
    instructor,
    type,
    maxAttendants,
    guests,
  } = lesson;
  const startDate = new Date(start);
  const endDate = new Date(end);

  const { activeUser, setAuthDialogOpen } = useUserContext();

  const [numOfGuests, setNumOfGuests] = useState(1);
  const [bookingStatus, setBookingStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    setDetailedLessonOpen(false);
    setNumOfGuests(1);
    setBookingStatus('');
    setErrorMessage('');
  };

  const handleGuestNumChange = (operator) => {
    setNumOfGuests((prev) => (operator === '+' ? prev + 1 : prev - 1));
    setBookingStatus('');
    setErrorMessage('');
  };

  const handleBookLesson = async () => {
    setBookingStatus('pending');
    const result = await bookLesson(
      activeUser?.userId,
      lesson._id,
      numOfGuests,
    );
    if (result.status === 200) {
      setBookingStatus('success');
      refreshData();
    } else {
      setBookingStatus('error');
      setErrorMessage(result.message);
    }
  };

  const myRef = useRef(null);

  const executeScroll = () => myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={detailedLessonOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        TransitionComponent={TransitionUp}
        scroll="body"
        sx={{ ml: { sm: 0, md: 2 } }}
      >
        <DialogTitle
          id="responsive-dialog-title"
          align="center"
          textTransform="uppercase"
        >
          {type?.name}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ px: 0 }}>
          <Box sx={{ py: 1, px: 2 }}>
            <Grid container spacing={1} columns={6}>
              <Grid item xs={3} sm={2}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                  }}
                >
                  <Avatar>
                    <CalendarMonthIcon />
                  </Avatar>
                  <Box sx={{ display: 'block' }}>
                    <Typography sx={{ fontWeight: 'medium' }}>Dátum</Typography>
                    <Typography variant="body2">
                      {!isEmptyObj(lesson)
                        && startDate.toLocaleDateString('hu-HU', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          timeZone: 'Europe/Budapest',
                        })}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={3} sm={2}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                  }}
                >
                  <Avatar>
                    <AccessTimeIcon />
                  </Avatar>
                  <Box sx={{ display: 'block' }}>
                    <Typography sx={{ fontWeight: 'medium' }}>
                      Időpont
                    </Typography>
                    <Typography variant="body2">
                      {!isEmptyObj(lesson)
                        && `${formatInTimeZone(
                          startDate,
                          'Europe/Budapest',
                          'HH:mm',
                        )} - ${formatInTimeZone(
                          endDate,
                          'Europe/Budapest',
                          'HH:mm',
                        )}`}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={3} sm={2}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                  }}
                >
                  <Avatar>
                    <SellIcon />
                  </Avatar>
                  <Box sx={{ display: 'block' }}>
                    <Typography sx={{ fontWeight: 'medium' }}>Ár</Typography>
                    <Typography variant="body2">{`${price}Ft`}</Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={3} sm={2}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                  }}
                >
                  <Avatar>
                    <LocationOnIcon />
                  </Avatar>
                  <Box sx={{ display: 'block' }}>
                    <Typography sx={{ fontWeight: 'medium' }}>
                      Location
                    </Typography>
                    <Typography variant="body2">{location}</Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={3} sm={2}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                  }}
                >
                  <Avatar>
                    <SelfImprovementIcon />
                  </Avatar>
                  <Box sx={{ display: 'block' }}>
                    <Typography sx={{ fontWeight: 'medium' }}>
                      Oktató
                    </Typography>
                    <Typography variant="body2">{instructor?.name}</Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={3} sm={2}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                  }}
                >
                  <Avatar>
                    <TimerOutlinedIcon />
                  </Avatar>
                  <Box sx={{ display: 'block' }}>
                    <Typography sx={{ fontWeight: 'medium' }}>
                      Időtartam
                    </Typography>
                    <Typography variant="body2">
                      {!isEmptyObj(lesson)
                        && `${differenceInMinutes(endDate, startDate)} perc`}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box textAlign="center" m={1}>
            <Stack>
              <Button
                variant="contained"
                size="large"
                onClick={executeScroll}
                disabled={guests?.length >= maxAttendants}
              >
                {guests?.length >= maxAttendants ? 'Betelt' : 'Foglalás'}
              </Button>
            </Stack>
          </Box>

          <Box
            component="img"
            sx={{
              width: '100%',
            }}
            src={type?.featuredImage}
            alt="yoga detailed"
          />
          <Box sx={{ p: 1 }}>
            <Typography variant="h5">{type?.name}</Typography>
            <DialogContentText>{type?.description}</DialogContentText>
          </Box>
          {guests?.length < maxAttendants ? (
            <Box>
              {!activeUser ? (
                <Box
                  sx={{
                    p: 1,
                    bgcolor: 'primary.main',
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}
                >
                  <Typography sx={{ color: 'white' }}>
                    Foglalás leadásához kérlek jelentkezz be
                  </Typography>
                  <Button
                    sx={{
                      my: 2,
                      color: 'white',
                      display: 'block',
                      fontWeight: 400,
                    }}
                    onClick={() => setAuthDialogOpen(true)}
                  >
                    Login
                  </Button>
                </Box>
              ) : (
                <Box sx={{ p: 1 }}>
                  <Typography variant="h5">Foglalás</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      my: 2,
                      gap: 4,
                    }}
                  >
                    <Typography variant="body1">Hány főre foglalsz</Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <IconButton
                        aria-label="add-guest"
                        color="primary"
                        onClick={() => handleGuestNumChange('+')}
                      >
                        <AddIcon />
                      </IconButton>
                      <Box component="span" sx={{ p: 1 }}>
                        <Typography variant="body1">{numOfGuests}</Typography>
                      </Box>
                      <IconButton
                        disabled={numOfGuests < 2}
                        aria-label="remove-guest"
                        color="primary"
                        onClick={() => handleGuestNumChange('-')}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Stack>
                  </Box>
                </Box>
              )}
            </Box>
          ) : (
            <Box>
              <Alert severity="error" sx={{ m: 1 }}>
                Az óra betelt
              </Alert>
            </Box>
          )}
        </DialogContent>

        {bookingStatus && bookingStatus !== 'pending' && (
          <Box sx={{ p: 1 }}>
            <Slide
              direction="left"
              in={bookingStatus && bookingStatus !== 'pending'}
            >
              <Alert
                severity={bookingStatus}
                action={(
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setBookingStatus('');
                      setErrorMessage('');
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                )}
                sx={{ mb: 2 }}
              >
                {errorMessage || 'Booking Successfull'}
              </Alert>
            </Slide>
          </Box>
        )}

        <Box
          ref={myRef}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            my: 2,
            gap: 1,
          }}
        >
          <LoadingButton
            loading={bookingStatus === 'pending'}
            loadingPosition="start"
            startIcon={<CalendarMonthIcon />}
            variant="contained"
            onClick={handleBookLesson}
            disabled={!!bookingStatus || guests?.length >= maxAttendants || !activeUser}
          >
            Foglalás
          </LoadingButton>
          <Button onClick={handleClose}>Mégse</Button>
        </Box>
      </Dialog>
    </div>
  );
}

export default LessonItemDetailed;
