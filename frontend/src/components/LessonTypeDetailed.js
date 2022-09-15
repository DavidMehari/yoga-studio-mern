import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionUp } from '../helpers/transitions';

function LessonTypeDetailed({
  lessonType,
  detailedLessonTypeOpen,
  setDetailedLessonTypeOpen,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    setDetailedLessonTypeOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={detailedLessonTypeOpen}
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
          {lessonType?.name}
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

          <Box
            component="img"
            sx={{
              width: '100%',
            }}
            // src={type?.featuredImage}
            src={`${process.env.REACT_APP_BACKEND_URI}/uploads/${lessonType?.featuredImage}`}
            alt="yoga detailed"
          />
          <Box sx={{ p: 1 }}>
            <Typography variant="h5">{lessonType?.name}</Typography>
            <DialogContentText>{lessonType?.description}</DialogContentText>
          </Box>

        </DialogContent>

      </Dialog>
    </div>
  );
}

export default LessonTypeDetailed;
