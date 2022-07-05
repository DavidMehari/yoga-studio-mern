import {
  Card,
  CardActionArea,
  CardActions,
  IconButton,
} from '@mui/material';

import React, { useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AlertDialog from './AlertDialog';
import { cancelBooking, editBooking } from '../helpers/utils';
import EditBookingDialog from './EditBookingDialog';
import BookingDetailsGuest from './BookingDetailsGuest';
import { useUserContext } from '../contexts/UserContext';
import BookingDetailsAdmin from './admin/BookingDetailsAdmin';

function BookingListItem({ booking, refreshData }) {
  const { status } = booking;

  const { activeUser } = useUserContext();

  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleOpenCancelDialog = () => {
    setOpenCancelDialog(true);
  };

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCancelBooking = async (bookingId) => {
    const result = await cancelBooking(bookingId);
    if (result.status === 200) {
      setOpenCancelDialog(false);
      refreshData();
    }
  };

  const handleEditBooking = async (bookingId, bookingData) => {
    const result = await editBooking(bookingId, bookingData);
    if (result.status === 200) {
      setOpenEditDialog(false);
      refreshData();
    }
  };

  return (
    <>
      {booking?.lesson
      && (
      <Card
        variant="outlined"
        sx={{
          display: 'flex',
          mb: 1,
          maxWidth: 600,
          width: '100%',
        }}
      >
        <CardActionArea sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          {activeUser.role === 'admin'
            ? <BookingDetailsAdmin booking={booking} />
            : <BookingDetailsGuest booking={booking} />}
        </CardActionArea>
        <CardActions
          disableSpacing
          sx={{
            justifyContent: 'space-around',
            flexDirection: 'column',
            p: 0,
          }}
        >
          {status === 'booked' && (
          <IconButton
            color="error"
            aria-label="delete booking"
            onClick={handleOpenCancelDialog}
          >
            <DeleteIcon />
          </IconButton>
          )}
          <IconButton
            aria-label="edit lesson"
            onClick={handleOpenEditDialog}
          >
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>
      )}
      <AlertDialog
        delteFn={handleCancelBooking}
        open={openCancelDialog}
        setOpen={setOpenCancelDialog}
        idToDelete={booking._id}
        dialogTitle="Foglalás lemondása"
        dialogContentText="Biztosan le szeretnéd mondania foglalásod?"
        actionBtnText="Lemondás"
      />
      <EditBookingDialog
        updateFn={handleEditBooking}
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        idToEdit={booking._id}
        booking={booking}
      />
    </>
  );
}

export default BookingListItem;
