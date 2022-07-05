import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {
  Box, DialogTitle, FormControlLabel, IconButton, Stack, Switch, Typography,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { TransitionUp } from '../helpers/transitions';

function EditBookingDialog({
  open, setOpen, updateFn, booking,
}) {
  const [bookingToEdit, setBookingToEdit] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setBookingToEdit((prev) => (
      {
        ...prev,
        status: event.target.checked ? 'booked' : 'cancelled',
      }
    ));
  };

  const handleGuestNumChange = (operator) => {
    setBookingToEdit((prev) => (
      {
        ...prev,
        numOfGuests: (operator === '+' ? prev.numOfGuests + 1 : prev.numOfGuests - 1),
      }
    ));
  };

  useEffect(() => {
    setBookingToEdit({ status: booking.status, numOfGuests: booking.numOfGuests });
  }, [booking]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={TransitionUp}
      >
        <DialogTitle id="alert-dialog-title">
          Foglalás módosítás
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 1 }}>
            <FormControlLabel
              control={(
                <Switch
                  color="success"
                  checked={bookingToEdit.status === 'booked'}
                  onChange={handleChange}
                />
)}
              label={bookingToEdit.status === 'booked' ? 'Foglalva' : 'Lemondva'}
            />
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
                  <Typography variant="body1">{bookingToEdit.numOfGuests}</Typography>
                </Box>
                <IconButton
                  disabled={bookingToEdit.numOfGuests < 2}
                  aria-label="remove-guest"
                  color="primary"
                  onClick={() => handleGuestNumChange('-')}
                >
                  <RemoveIcon />
                </IconButton>
              </Stack>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Mégse</Button>
          <Button
            onClick={() => updateFn(booking._id, bookingToEdit)}
            startIcon={<CheckIcon />}
            autoFocus
            variant="contained"
            color="success"
          >
            Mentés
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditBookingDialog;
