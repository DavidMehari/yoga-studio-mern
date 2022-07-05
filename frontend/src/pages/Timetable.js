import {
  Box, Container, Grid, Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import {
  CalendarPicker,
  LocalizationProvider,
  PickersDay,
} from '@mui/x-date-pickers';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { isSameDay } from 'date-fns';
import huLocale from 'date-fns/locale/hu';
import LessonItem from '../components/LessonItem';
import { getAllLessons } from '../helpers/utils';
import LessonItemDetailed from '../components/LessonItemDetailed';

function Timetable() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allLessons, setAllLessons] = useState([]);
  const [filteredLessons, setFilteredLessons] = useState([]);
  const [detailedLessonOpen, setDetailedLessonOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState({});

  const refreshData = async () => {
    const result = await getAllLessons();
    if (result.status === 200) setAllLessons(result.lessons);
  };

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    setSelectedDate(new Date(selectedDate));
  }, [allLessons]);

  const openLessonDetails = (lesson) => {
    setDetailedLessonOpen(true);
    setSelectedLesson(lesson);
  };

  const filterByDay = (date) => {
    return allLessons.filter((lesson) => isSameDay(date, new Date(lesson.start)));
  };

  useEffect(() => {
    setFilteredLessons(filterByDay(selectedDate));
  }, [selectedDate]);

  const disableWeekends = (date) => {
    return date.getDay() === 0 || date.getDay() === 6;
  };

  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    return (
      <PickersDay
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...pickersDayProps}
        selected={date.getTime() === selectedDate.getTime()}
      />
    );
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Box component="div" display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h2" align="center" component="div" gutterBottom>
          Órarend
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={huLocale}>
              <CalendarPicker
                onChange={(e) => setSelectedDate(e)}
                minDate={new Date()}
                renderDay={renderWeekPickerDay}
                shouldDisableDate={disableWeekends}
              />
            </LocalizationProvider>
            <Typography variant="body1" align="center" component="div">
              Választott dátum
            </Typography>
            <Typography variant="h5" align="center" component="div">
              {selectedDate.toLocaleDateString('hu-HU', {
                timeZone: 'Europe/Budapest',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
              })}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>

            <Box
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              {filteredLessons.map((lesson) => (
                <LessonItem
                  key={lesson._id}
                  lesson={lesson}
                  openLessonDetails={openLessonDetails}
                  refreshData={refreshData}
                />
              ))}
            </Box>
          </Grid>

        </Grid>
        <Box maxWidth="90%">
          <LessonItemDetailed
            lesson={selectedLesson}
            detailedLessonOpen={detailedLessonOpen}
            setDetailedLessonOpen={setDetailedLessonOpen}
            refreshData={refreshData}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default Timetable;
