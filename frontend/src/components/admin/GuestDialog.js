import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { green } from '@mui/material/colors';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { AvatarGroup, DialogContent, Typography } from '@mui/material';
import { TransitionUp } from '../../helpers/transitions';

function GuestDialog({
  guests, open, setOpen,
}) {
  const [guestsSorted, setGuestsSorted] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const sortDuplicates = (guestList) => {
    const counts = {};
    guestList.forEach((guest) => {
      counts[guest._id] = (counts[guest._id] || 0) + 1;
    });
    return counts;
  };

  useEffect(() => {
    setGuestsSorted(sortDuplicates(guests));
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={TransitionUp}
    >
      <DialogTitle>Vendéglista</DialogTitle>
      <List sx={{ pt: 0 }}>
        {Object.keys(guestsSorted).map((guestId) => (
          <ListItem key={guestId} button>
            <ListItemAvatar>
              <AvatarGroup total={guestsSorted[guestId]}>
                <Avatar
                  sx={{ bgcolor: green[400], color: green[400] }}
                  src={guests.find((guest) => guest._id === guestId).avatar}
                />
              </AvatarGroup>
            </ListItemAvatar>
            <ListItemText
              primary={guests.find((guest) => guest._id === guestId).name}
            />
          </ListItem>
        ))}
      </List>
      <DialogContent sx={{ display: 'flex', gap: 1, bgcolor: 'primary.main' }}>
        <Typography variant="subtitle1" fontWeight={500}>
          Összesen:
        </Typography>
        <Typography variant="subtitle1">
          {guests.length}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

export default GuestDialog;
