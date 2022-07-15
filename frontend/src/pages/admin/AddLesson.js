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
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { isPast } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

import { addNewLesson, getAllLessonTypes } from '../../helpers/utils';

function AddLesson() {
  const [newLessonData, setNewLessonData] = useState({ start: '', end: '' });

  const [errorMessages, setErrorMessages] = useState({
    type: [],
    start: [],
    end: [],
  });
  const [lessonTypes, setLessonTypes] = useState([]);

  const [sendStatus, setSendStatus] = useState('');
  const [sendError, setSendError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    getAllLessonTypes().then((result) => setLessonTypes(result.lessonTypes));
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
      start: [],
      end: [],
    });
  };

  const reportFormValidity = () => {
    resetErrorMessages();
    const inputNames = Object.keys(validators);
    const inputValidations = inputNames.map((inputName) => reportFieldValidityMulti(inputName));
    const isValid = inputValidations.every((inputValidation) => inputValidation);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formIsValid = reportFormValidity();
    if (formIsValid) {
      setSendStatus('pending');
      const result = await addNewLesson(newLessonData);
      if (result.status === 200) {
        setSendStatus('success');
      } else {
        setSendError(result.message);
        setSendStatus('error');
      }
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
        <form id="add-lesson-form" onSubmit={handleSubmit} noValidate>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Óra kezdete"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ flexGrow: 1 }}
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
                    sx={{ flexGrow: 1 }}
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
              error={!!errorMessages.type.length}
            >
              <InputLabel id="lesson-type-label">Óra típus</InputLabel>
              <Select
                labelId="lesson-type-label"
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
