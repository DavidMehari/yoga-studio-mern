import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionUp } from '../helpers/transitions';

export default function AlertDialog({
  open, setOpen, delteFn, idToDelete, dialogTitle, dialogContentText, actionBtnText,
}) {
  const handleClose = () => {
    setOpen(false);
  };

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
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogContentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Mégse</Button>
          <Button onClick={() => delteFn(idToDelete)} startIcon={<DeleteIcon />} autoFocus variant="contained" color="error">
            {actionBtnText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
