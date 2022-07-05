/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { LocalizationProvider } from '@mui/x-date-pickers';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
  isPast,
} from 'date-fns';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import FormInput from '../../components/FormInput';
import { addNewLesson, getAllInstructorNames, getAllLessonTypes } from '../../helpers/utils';

function AddLesson() {
  const [newLessonData, setNewLessonData] = useState({ start: '', end: '' });

  const [errorMessages, setErrorMessages] = useState({
    type: [],
    location: [],
    start: [],
    end: [],
    price: [],
    maxAttendants: [],
    instructor: [],
  });
  const [wasValidated, setWasValidated] = useState(false);
  const [lessonTypes, setLessonTypes] = useState([]);
  const [instructors, setInstructors] = useState([]);

  const [sendStatus, setSendStatus] = useState('');
  const [sendError, setSendError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    getAllLessonTypes().then((result) => setLessonTypes(result.lessonTypes));
    getAllInstructorNames().then((result) => setInstructors(result.instructors));
  }, []);

  const isNotEmpty = (input = '') => {
    return input !== '';
  };

  const isNotPast = (input) => {
    return !isPast(new Date(input));
  };

  const validators = {
    type: [
      {
        fn: isNotEmpty,
        errorMessage: 'Nem lehet üres',
      },
    ],
    location: [
      {
        fn: isNotEmpty,
        errorMessage: 'Nem lehet üres',
      },
    ],
    start: [
      {
        fn: isNotEmpty,
        errorMessage: 'Nem lehet üres',
      },
      {
        fn: isNotPast,
        errorMessage: 'A választott időpont már elmúlt',
      },
    ],
    end: [
      {
        fn: isNotEmpty,
        errorMessage: 'Nem lehet üres',
      },
      {
        fn: isNotPast,
        errorMessage: 'Nem lehet a mai napnál korábban',
      },
    ],
    price: [
      {
        fn: isNotEmpty,
        errorMessage: 'Nem lehet üres',
      },
    ],
    maxAttendants: [
      {
        fn: isNotEmpty,
        errorMessage: 'Nem lehet üres',
      },
    ],
    instructor: [
      {
        fn: isNotEmpty,
        errorMessage: 'Nem lehet üres',
      },
    ],
  };

  const reportFieldValidityMulti = (inputName) => {
    const validationReports = [];
    validators[inputName].forEach((validator) => {
      const validatorFn = validator.fn;
      const isValid = validatorFn(newLessonData[inputName]);
      const validatorErrorMessage = validator.errorMessage;
      setErrorMessages((prev) => ({
        ...prev,
        [inputName]: !isValid
          ? [...prev[inputName], validatorErrorMessage]
          : prev[inputName].filter(
            (element) => element !== validatorErrorMessage,
          ),
      }));
      validationReports.push(isValid);
    });
    return validationReports.every((inputValidation) => inputValidation);
  };

  const resetErrorMessages = () => {
    setErrorMessages({
      type: [],
      location: [],
      start: [],
      end: [],
      price: [],
      maxAttendants: [],
      instructor: [],
    });
  };

  const reportFormValidity = () => {
    resetErrorMessages();
    const inputNames = Object.keys(validators);
    const inputValidations = inputNames.map((inputName) => reportFieldValidityMulti(inputName));
    const isValid = inputValidations.every((inputValidation) => inputValidation);
    setWasValidated(true);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formIsValid = reportFormValidity();
    if (formIsValid) {
      setSendStatus('pending');
      setWasValidated(false);

      const result = await addNewLesson(newLessonData);
      if (result.status === 200) {
        setSendStatus('success');
      } else {
        setSendError(result.message);
        setSendStatus('error');
      }

      setWasValidated(false);
      setSendStatus('success');
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setNewLessonData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h2" align="center" component="h1" gutterBottom>
        Óra létrehozása
      </Typography>

      <Box>
        <form id="register-form" onSubmit={handleSubmit} noValidate>
          <FormInput
            label="Helyszín"
            name="location"
            handleOnChange={(e) => handleChange(e)}
            type="text"
            value={newLessonData.location}
            errorMessages={errorMessages.location}
            wasValidated={wasValidated}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Óra kezdete"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="dense"
                    error={!!errorMessages.start.length}
                    helperText={errorMessages.start.join(' ')}
                  />
                )}
                value={newLessonData.start}
                onChange={(value) => handleChange({ target: { value, name: 'start' } })}
                minDate={new Date()}
                minutesStep={15}
              />
              <DateTimePicker
                label="Óra vége"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="dense"
                    error={!!errorMessages.end.length}
                    helperText={errorMessages.end.join(' ')}
                  />
                )}
                value={newLessonData.end}
                onChange={(value) => handleChange({ target: { value, name: 'end' } })}
                minDateTime={
                newLessonData.start ? new Date(newLessonData.start) : new Date()
              }
                minutesStep={15}
              />
            </LocalizationProvider>
          </Box>

          <FormInput
            label="Ár"
            name="price"
            handleOnChange={(e) => handleChange(e)}
            type="Number"
            value={newLessonData.price}
            errorMessages={errorMessages.price}
            wasValidated={wasValidated}
            InputProps={{
              endAdornment: <InputAdornment position="start">Ft</InputAdornment>,
            }}
          />
          <FormInput
            label="Max résztvevők"
            name="maxAttendants"
            handleOnChange={(e) => handleChange(e)}
            type="Number"
            value={newLessonData.maxAttendants}
            errorMessages={errorMessages.maxAttendants}
            wasValidated={wasValidated}
            InputProps={{
              endAdornment: <InputAdornment position="start">Fő</InputAdornment>,
            }}
          />
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              flexWrap: 'wrap',
              my: 1,
            }}
          >
            <FormControl
              sx={{ minWidth: 250, flexGrow: 1 }}
              error={!!errorMessages.instructor.length}
            >
              <InputLabel id="demo-simple-select-label-1">Oktató</InputLabel>
              <Select
                labelId="demo-simple-select-label-1"
                id="instructor"
                value={newLessonData.instructor || ''}
                label="Oktató"
                onChange={(e) => handleChange(e)}
                name="instructor"
              >
                {instructors.map((instructor) => (
                  <MenuItem key={instructor._id} value={instructor._id}>{instructor.name}</MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errorMessages.instructor.join(' ')}
              </FormHelperText>
            </FormControl>

            <FormControl
              sx={{ minWidth: 250, flexGrow: 1 }}
              error={!!errorMessages.type.length}
            >
              <InputLabel id="demo-simple-select-label-2">Óra típus</InputLabel>
              <Select
                labelId="demo-simple-select-label-2"
                id="type"
                value={newLessonData.type || ''}
                label="Óra típus"
                onChange={(e) => handleChange(e)}
                name="type"
              >
                {lessonTypes.map((lessonType) => (
                  <MenuItem key={lessonType._id} value={lessonType._id}>{lessonType.name}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{errorMessages.type.join(' ')}</FormHelperText>
            </FormControl>
          </Box>
          {sendStatus && sendStatus !== 'pending'
            && (
            <Alert
              severity={sendStatus}
              sx={{ mb: 2 }}
              action={(
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setSendStatus('');
                    setSendError('');
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
                  )}
            >
              {sendError || 'Óra sikeresen létrehozva'}
            </Alert>
            )}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 3,
              gap: 1,
            }}
          >
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Mégse
            </Button>
            <Button variant="contained" type="submit" onClick={handleSubmit}>
              Óra létrehozása
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default AddLesson;
