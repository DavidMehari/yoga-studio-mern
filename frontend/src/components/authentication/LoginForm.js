import { Alert, Box, Button } from '@mui/material';
import React from 'react';
import FormInput from '../FormInput';

function LoginForm({
  loginFormData,
  setLoginFormData,
  signInWithEmail,
  loginError,
  handleClose,
}) {
  function handleLoginSumbit(event) {
    event.preventDefault();
    signInWithEmail();
  }

  function handleLoginChange({ target: { name, value } }) {
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <form id="login-form" onSubmit={handleLoginSumbit} noValidate>
      {loginError && (
        <Alert severity="error">
          Bejelentkezési hiba:
          {' '}
          {loginError}
        </Alert>
      )}

      <FormInput
        label="Email cím*"
        name="email"
        handleOnChange={(e) => handleLoginChange(e)}
        type="email"
        value={loginFormData.email}
      />
      <FormInput
        label="Jelszó*"
        name="password"
        handleOnChange={(e) => handleLoginChange(e)}
        type="password"
        value={loginFormData.password}
      />
      <Box sx={{
        display: 'flex', justifyContent: 'center', mt: 3, gap: 1,
      }}
      >
        <Button variant="outlined" onClick={handleClose}>Mégse</Button>
        <Button variant="contained" type="submit">Bejelentkezés</Button>
      </Box>
    </form>
  );
}

export default LoginForm;
