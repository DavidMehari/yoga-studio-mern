import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import React from 'react';
import { formatInTimeZone } from 'date-fns-tz';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import AlertDialog from './AlertDialog';
import { deleteLesson } from '../helpers/utils';

function LessonItem({ lesson, openLessonDetails, refreshData }) {
  const {
    start,
    end,
    maxAttendants,
    instructor: { name: instructorName },
    guests,
  } = lesson;
  const startDate = new Date(start);
  const endDate = new Date(end);

  const { activeUser } = useUserContext();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleLessonDelete = async (lessonId) => {
    const result = await deleteLesson(lessonId);
    if (result.status === 200) {
      setOpen(false);
      refreshData();
    }
  };

  return (
    <Box>
      <Card
        variant="outlined"
        sx={{
          display: 'flex',
          mb: 1,
          maxWidth: 600,
          width: '100%',
          mx: 'auto',
        }}
      >
        <CardActionArea
          onClick={() => openLessonDetails(lesson)}
          sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}
        >
          <CardMedia
            component="img"
            sx={{
              width: 200, aspectRatio: '16/10', flexGrow: 1, minWidth: '50%',
            }}
            image={lesson?.type.featuredImage}
            alt={lesson?.type.name}
          />

          <CardContent
            sx={{
              minWidth: '48%',
              flex: '1 0 auto',
              flexDirection: 'column',
              p: 1,
              '&:last-child': { pb: 1 },
            }}
          >
            <Chip
              size="small"
              color={guests.length < maxAttendants ? 'success' : 'error'}
              label={
                  guests.length < maxAttendants ? `${maxAttendants - guests.length} hely van még` : 'Betelt'
                  }
            />
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
              <AccessTimeIcon fontSize="small" />
              {`${formatInTimeZone(
                startDate,
                'Europe/Budapest',
                'HH:mm',
              )} - ${formatInTimeZone(endDate, 'Europe/Budapest', 'HH:mm')}`}
            </Typography>
            <Typography component="div" variant="h5" sx={{ wordWrap: 'break-word' }}>
              {lesson?.type.name}
            </Typography>
            <Typography component="div" variant="body1">
              {startDate.toLocaleDateString('hu-HU', {
                timeZone: 'Europe/Budapest',
              })}
            </Typography>
            <Typography
              variant="subtitle"
              color="text.secondary"
              component="div"
              textTransform="capitalize"
            >
              {`Oktató: ${instructorName}`}
            </Typography>
          </CardContent>
        </CardActionArea>
        {activeUser?.role === 'admin' && (
          <CardActions
            disableSpacing
            sx={{
              justifyContent: 'space-around',
              flexDirection: 'column',
              p: 0,
            }}
          >
            <IconButton
              color="error"
              aria-label="delete lesson"
              onClick={handleClickOpen}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              aria-label="edit lesson"
              onClick={() => navigate(`/admin/edit-lesson/${lesson._id}`)}
            >
              <EditIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>
      <AlertDialog
        delteFn={handleLessonDelete}
        open={open}
        setOpen={setOpen}
        idToDelete={lesson._id}
        dialogTitle="Biztosan törlöd?"
        dialogContentText="Az óra véglegesen törlése kerül"
        actionBtnText="Törlés"
      />
    </Box>
  );
}

export default LessonItem;
