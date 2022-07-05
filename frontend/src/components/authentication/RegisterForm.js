import React, { useState } from 'react';
import { Alert, Box, Button } from '@mui/material';
import isEmail from 'validator/lib/isEmail';
import FormInput from '../FormInput';

function RegisterForm({
  registerFormData,
  setRegisterFormData,
  registerError,
  createUserWithEmail,
  handleClose,
}) {
  const [errorMessages, setErrorMessages] = useState({
    name: [],
    email: [],
    password: [],
    passwordAgain: [],
  });
  const [wasValidated, setWasValidated] = useState(false);

  function isNotEmpty(input = '') {
    return input !== '';
  }

  const isValidEmail = (input = '') => {
    return isEmail(input);
  };

  function isLongerThan7(password) {
    return password ? password.length > 7 : false;
  }

  function isSameAsPasswordReg(passwordAgain) {
    return passwordAgain ? passwordAgain === registerFormData.password : false;
  }

  const validators = {
    name: [
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
    password: [
      {
        fn: isLongerThan7,
        errorMessage: 'Nem elég hosszú',
      },
    ],
    passwordAgain: [
      {
        fn: isSameAsPasswordReg,
        errorMessage: 'A két jelszó nem egyezik',
      },
    ],
  };

  function reportFieldValidityMulti(inputName) {
    const validationReports = [];
    validators[inputName].forEach((validator) => {
      const validatorFn = validator.fn;
      const isValid = validatorFn(registerFormData[inputName]);
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
  }

  function resetErrorMessages() {
    setErrorMessages({
      name: [],
      email: [],
      password: [],
      passwordAgain: [],
    });
  }

  function reportFormValidity() {
    resetErrorMessages();
    const inputNames = Object.keys(validators);
    const inputValidations = inputNames.map((inputName) => reportFieldValidityMulti(inputName));
    const isValid = inputValidations.every((inputValidation) => inputValidation);
    setWasValidated(true);
    return isValid;
  }

  function registerUser() {
    const formIsValid = reportFormValidity();
    if (formIsValid) {
      setWasValidated(false);
      createUserWithEmail();
    }
  }

  function handleRegisterSumbit(event) {
    event.preventDefault();
    registerUser();
  }

  function handleRegisterChange({ target: { name, value } }) {
    setRegisterFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <form id="register-form" onSubmit={handleRegisterSumbit} noValidate>
      {registerError && (
        <Alert severity="error">
          Hiba a regisztráció során:
          {' '}
          {registerError}
        </Alert>
      )}
      <FormInput
        label="Név*"
        name="name"
        handleOnChange={(e) => handleRegisterChange(e)}
        type="text"
        value={registerFormData.name}
        errorMessages={errorMessages.name}
        wasValidated={wasValidated}
      />
      <FormInput
        label="Email cím*"
        name="email"
        handleOnChange={(e) => handleRegisterChange(e)}
        type="email"
        value={registerFormData.email}
        errorMessages={errorMessages.email}
        wasValidated={wasValidated}
      />
      <FormInput
        label="Jelszó*"
        name="password"
        handleOnChange={(e) => handleRegisterChange(e)}
        type="password"
        value={registerFormData.password}
        errorMessages={errorMessages.password}
        wasValidated={wasValidated}
      />
      <FormInput
        label="Jelszó újra*"
        name="passwordAgain"
        handleOnChange={(e) => handleRegisterChange(e)}
        type="password"
        value={registerFormData.passwordAgain}
        errorMessages={errorMessages.passwordAgain}
        wasValidated={wasValidated}
      />
      <Box sx={{
        display: 'flex', justifyContent: 'center', mt: 3, gap: 1,
      }}
      >
        <Button variant="outlined" onClick={handleClose}>Mégse</Button>
        <Button variant="contained" type="submit">Regisztráció</Button>
      </Box>
    </form>
  );
}

export default RegisterForm;
