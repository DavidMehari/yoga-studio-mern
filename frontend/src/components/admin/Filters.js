/* eslint-disable no-case-declarations */
/* eslint-disable max-len */
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAllInstructorNames, getAllLessonTypes } from '../../helpers/utils';

function Filters({
  bookings,
  refreshData,
  filteredBookings,
  setFilteredBookings,
}) {
  const [lessonTypes, setLessonTypes] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [activeSort, setActiveSort] = useState('bookedOn');

  const handleSortChange = (event, newSort) => {
    if (newSort !== null) {
      setActiveSort(newSort);
    }
  };

  useEffect(() => {
    getAllLessonTypes().then((result) => setLessonTypes(result.lessonTypes));
    getAllInstructorNames().then((result) => setInstructors(result.instructors));
  }, []);

  const handleChange = async ({ target: { name, value } }) => {
    await refreshData();
    setFilterValue(value);
    setActiveFilter(name);
  };

  const runFilterFn = () => {
    switch (activeFilter) {
      case 'instructor':
        setFilteredBookings(() => bookings.filter(
          (booking) => booking.lesson.instructor._id === filterValue,
        ));
        break;
      case 'type':
        setFilteredBookings(() => (
          bookings.filter((booking) => booking.lesson.type._id === filterValue)));
        break;
      case 'isBooked':
        break;

      default:
        break;
    }
  };

  const runSortFn = () => {
    let sortedBookings;
    switch (activeSort) {
      case 'date':
        sortedBookings = [].concat(filteredBookings).sort((a, b) => new Date(a.lesson.start) - new Date(b.lesson.start));
        setFilteredBookings(() => sortedBookings);
        break;
      case 'guestName':
        sortedBookings = [].concat(filteredBookings).sort((a, b) => a.user.name.localeCompare(b.user.name));
        setFilteredBookings(() => sortedBookings);
        break;
      case 'bookedOn':
        sortedBookings = [].concat(filteredBookings).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setFilteredBookings(() => sortedBookings);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (filterValue === 'All') {
      setActiveFilter('');
    } else {
      runFilterFn();
    }
    setActiveSort('bookedOn');
  }, [filterValue, activeFilter]);

  useEffect(() => {
    runSortFn();
  }, [activeSort]);

  return (
    <Box sx={{
      display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap',
    }}
    >
      <FormControl size="small" sx={{ minWidth: 250 }}>
        <InputLabel id="demo-simple-select-label-1">Oktató</InputLabel>
        <Select
          labelId="demo-simple-select-label-1"
          id="instructor"
          value={activeFilter === 'instructor' ? filterValue : 'All'}
          label="Oktató"
          onChange={(e) => handleChange(e)}
          name="instructor"
        >
          <MenuItem value="All">Összes</MenuItem>
          {instructors.map((instructor) => (
            <MenuItem key={instructor._id} value={instructor._id}>
              {instructor.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 250 }}>
        <InputLabel id="demo-simple-select-label-2">Óra típus</InputLabel>
        <Select
          labelId="demo-simple-select-label-2"
          id="type"
          value={activeFilter === 'type' ? filterValue : 'All'}
          label="Óra típus"
          onChange={(e) => handleChange(e)}
          name="type"
        >
          <MenuItem value="All">Összes</MenuItem>
          {lessonTypes.map((lessonType) => (
            <MenuItem key={lessonType._id} value={lessonType._id}>
              {lessonType.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ToggleButtonGroup
        color="primary"
        value={activeSort}
        exclusive
        onChange={handleSortChange}
        size="small"
      >
        <ToggleButton value="date">Óra kezdete</ToggleButton>
        <ToggleButton value="guestName">Vendég neve</ToggleButton>
        <ToggleButton value="bookedOn">Foglalás leadása</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

export default Filters;
