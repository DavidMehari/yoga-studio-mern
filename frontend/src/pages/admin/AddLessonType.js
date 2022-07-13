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
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FormInput from '../../components/FormInput';
import { addNewLessonType, getAllInstructorNames } from '../../helpers/utils';

function AddLessonType() {
  const [newLessonTypeData, setNewLessonTypeData] = useState({});

  const [errorMessages, setErrorMessages] = useState({
    name: [],
    description: [],
    location: [],
    price: [],
    maxAttendants: [],
    instructor: [],
  });
  const [wasValidated, setWasValidated] = useState(false);
  const [instructors, setInstructors] = useState([]);

  const [sendStatus, setSendStatus] = useState('');
  const [sendError, setSendError] = useState('');

  const [featuredImage, setFeaturedImage] = useState();
  const [isImageSelected, setIsImageSelected] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getAllInstructorNames().then((result) => setInstructors(result.instructors));
  }, []);

  const isNotEmpty = (input = '') => {
    return input !== '';
  };

  const isNotNegative = (input) => {
    return input >= 0;
  };

  const validators = {
    name: [
      {
        fn: isNotEmpty,
        errorMessage: 'Nem lehet üres',
      },
    ],
    description: [
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
    price: [
      {
        fn: isNotEmpty,
        errorMessage: 'Nem lehet üres',
      },
      {
        fn: isNotNegative,
        errorMessage: 'Nem lehet negatív',
      },
    ],
    maxAttendants: [
      {
        fn: isNotEmpty,
        errorMessage: 'Nem lehet üres',
      },
      {
        fn: isNotNegative,
        errorMessage: 'Nem lehet negatív',
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
      const isValid = validatorFn(newLessonTypeData[inputName]);
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
      name: [],
      description: [],
      location: [],
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

      const result = await addNewLessonType(newLessonTypeData, featuredImage);
      if (result.status === 200) {
        setSendStatus('success');
      } else {
        setSendError(result.message);
        setSendStatus('error');
      }
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setNewLessonTypeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = ({ target }) => {
    setFeaturedImage(target.files[0]);
    setIsImageSelected(true);
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h2" align="center" component="h1" gutterBottom>
        Óratípus létrehozása
      </Typography>

      <Box>
        <form id="add-lessontype-form" onSubmit={handleSubmit} noValidate>
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            Kép feltöltése
            <input
              hidden
              accept="image/*"
              type="file"
              name="featuredImage"
              onChange={handleImageChange}
            />
          </Button>
          {isImageSelected ? (
            <div>
              <p>
                Filename:
                {' '}
                {featuredImage.name}
              </p>
              <p>
                Filetype:
                {' '}
                {featuredImage.type}
              </p>
              <p>
                Size in bytes:
                {' '}
                {featuredImage.size}
              </p>
              <p>
                lastModifiedDate:
                {' '}
                {featuredImage.lastModifiedDate.toLocaleDateString()}
              </p>
            </div>
          ) : (
            <p>Select a file to show details</p>
          )}
          <FormInput
            label="Óra neve"
            name="name"
            handleOnChange={(e) => handleChange(e)}
            type="text"
            value={newLessonTypeData.name}
            errorMessages={errorMessages.name}
            wasValidated={wasValidated}
          />
          <FormInput
            label="Óra leírása"
            name="description"
            handleOnChange={(e) => handleChange(e)}
            value={newLessonTypeData.description}
            errorMessages={errorMessages.location}
            wasValidated={wasValidated}
            multiline
            rows={4}
          />
          <FormInput
            label="Helyszín"
            name="location"
            handleOnChange={(e) => handleChange(e)}
            type="text"
            value={newLessonTypeData.location}
            errorMessages={errorMessages.location}
            wasValidated={wasValidated}
          />
          <FormInput
            label="Ár"
            name="price"
            handleOnChange={(e) => handleChange(e)}
            type="Number"
            value={newLessonTypeData.price}
            errorMessages={errorMessages.price}
            wasValidated={wasValidated}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">Ft</InputAdornment>
              ),
            }}
          />
          <FormInput
            label="Max résztvevők"
            name="maxAttendants"
            handleOnChange={(e) => handleChange(e)}
            type="Number"
            value={newLessonTypeData.maxAttendants}
            errorMessages={errorMessages.maxAttendants}
            wasValidated={wasValidated}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">Fő</InputAdornment>
              ),
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
                value={newLessonTypeData.instructor || ''}
                label="Oktató"
                onChange={(e) => handleChange(e)}
                name="instructor"
              >
                {instructors.map((instructor) => (
                  <MenuItem key={instructor._id} value={instructor._id}>
                    {instructor.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errorMessages.instructor.join(' ')}
              </FormHelperText>
            </FormControl>
          </Box>
          {sendStatus && sendStatus !== 'pending' && (
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
              {sendError || 'Óratípus sikeresen létrehozva'}
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
              Óratípus létrehozása
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default AddLessonType;
