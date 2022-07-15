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
import React, { useState } from 'react';
import { formatInTimeZone } from 'date-fns-tz';
import { useNavigate } from 'react-router-dom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AlertDialog from '../AlertDialog';
import { useUserContext } from '../../contexts/UserContext';
import { deleteLesson } from '../../helpers/utils';
import GuestDialog from './GuestDialog';

function LessonItemAdmin({ lesson, refreshData }) {
  const {
    start,
    end,
    guests,
    type,
  } = lesson;
  const startDate = new Date(start);
  const endDate = new Date(end);

  const { activeUser } = useUserContext();
  const navigate = useNavigate();

  const [openDeleteDialog, setDeleteDialogOpen] = useState(false);
  const [guestDialogOpen, setGuestDialogOpen] = useState(false);

  const handleClickDelete = () => {
    setDeleteDialogOpen(true);
  };

  const handleClickGuestlist = () => {
    setGuestDialogOpen(true);
  };

  const handleLessonDelete = async (lessonId) => {
    const result = await deleteLesson(lessonId);
    if (result.status === 200) {
      setDeleteDialogOpen(false);
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
        }}
      >
        <CardActionArea
          sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}
        >
          <CardMedia
            component="img"
            sx={{ width: 200, aspectRatio: '16/10', flexGrow: 1 }}
            image={`${process.env.REACT_APP_BACKEND_URI}/uploads/${lesson?.type.featuredImage}`}
            alt={lesson?.type.name}
          />

          <CardContent
            sx={{
              flex: '1 0 auto',
              flexDirection: 'column',
              p: 1,
              '&:last-child': { pb: 1 },
            }}
          >
            <Chip
              size="small"
              color={guests.length < type.maxAttendants ? 'success' : 'error'}
              label={
                guests.length < type.maxAttendants ? `${type.maxAttendants - guests.length} hely van még` : 'Betelt'
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
            <Typography component="div" variant="h5">
              {type.name}
            </Typography>
            <Typography component="div" variant="body1">
              {startDate.toLocaleString('hu-HU', {
                timeZone: 'Europe/Budapest',
              })}
            </Typography>
            <Typography
              variant="subtitle"
              color="text.secondary"
              component="div"
              textTransform="capitalize"
            >
              {`Oktató: ${type.instructor.name}`}
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
              onClick={handleClickDelete}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              color="info"
              aria-label="guestlist"
              onClick={handleClickGuestlist}
            >
              <PeopleAltIcon />
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
        open={openDeleteDialog}
        setOpen={setDeleteDialogOpen}
        idToDelete={lesson._id}
        dialogTitle="Biztosan törlöd?"
        dialogContentText="Az óra véglegesen törlése kerül"
        actionBtnText="Törlés"
      />
      <GuestDialog
        guests={lesson.guests}
        onClose={onclose}
        open={guestDialogOpen}
        setOpen={setGuestDialogOpen}
      />
    </Box>
  );
}

export default LessonItemAdmin;
