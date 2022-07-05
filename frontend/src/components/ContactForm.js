/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  Alert,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import isEmail from 'validator/lib/isEmail';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import FormInput from './FormInput';
import { sendContactMessage } from '../helpers/utils';

function ContactForm() {
  const [contactFormData, setContactFormData] = useState({});
  const [sendStatus, setSendStatus] = useState('');
  const [sendError, setSendError] = useState('');

  const [errorMessages, setErrorMessages] = useState({
    name: [],
    title: [],
    email: [],
    message: [],
  });
  const [wasValidated, setWasValidated] = useState(false);

  const isNotEmpty = (input = '') => {
    return input !== '';
  };

  const isValidEmail = (input = '') => {
    return isEmail(input);
  };

  const validators = {
    name: [
      {
        fn: isNotEmpty,
        errorMessage: 'Nem lehet üres',
      },
    ],
    title: [
      {
        fn: isNotEmpty,
        errorMessage: 'Nem lehet üres',
      },
    ],
    email: [
      {
        fn: isNotEmpty,
        errorMessage: 'Nem lehet üres',
      },
      {
        fn: isValidEmail,
        errorMessage: 'Hibás email cím',
      },
    ],
    message: [
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
      const isValid = validatorFn(contactFormData[inputName]);
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
      title: [],
      email: [],
      message: [],
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
    setSendError('');

    const formIsValid = reportFormValidity();
    if (formIsValid) {
      setSendStatus('pending');
      setWasValidated(false);

      const result = await sendContactMessage(contactFormData);
      if (result.status === 200) {
        setContactFormData({});
        setSendStatus('success');
      } else {
        setSendError(result.message);
        setSendStatus('error');
      }
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setContactFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box>
      <Typography variant="h4" component="h2" gutterBottom>
        Kapcsolat
      </Typography>

      <form id="contact-form" onSubmit={handleSubmit} noValidate>

        <FormInput
          label="Név"
          name="name"
          handleOnChange={(e) => handleChange(e)}
          type="text"
          value={contactFormData.name}
          errorMessages={errorMessages.name}
          wasValidated={wasValidated}
        />
        <FormInput
          label="Tárgy"
          name="title"
          handleOnChange={(e) => handleChange(e)}
          type="text"
          value={contactFormData.title}
          errorMessages={errorMessages.title}
          wasValidated={wasValidated}
        />
        <FormInput
          label="Email cím"
          name="email"
          handleOnChange={(e) => handleChange(e)}
          type="email"
          value={contactFormData.email}
          errorMessages={errorMessages.email}
          wasValidated={wasValidated}
        />
        <FormInput
          label="Üzenet"
          name="message"
          handleOnChange={(e) => handleChange(e)}
          value={contactFormData.message}
          errorMessages={errorMessages.message}
          wasValidated={wasValidated}
          multiline
          rows={5}
        />

        <Box
          sx={{
            display: 'flex',
            mt: 1,
            mb: 2,
            gap: 1,
          }}
        >
          <LoadingButton
            onClick={handleSubmit}
            endIcon={<SendIcon />}
            loading={sendStatus === 'pending'}
            loadingPosition="end"
            variant="contained"
          >
            Küldés
          </LoadingButton>
        </Box>
      </form>
      {sendStatus && sendStatus !== 'pending'
      && (
      <Alert
        severity={sendStatus}
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
        sx={{ mb: 2 }}
      >
        {sendError || 'Üzenet elküldve!'}
      </Alert>
      )}
    </Box>
  );
}

export default ContactForm;
