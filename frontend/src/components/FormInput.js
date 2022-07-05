/* eslint-disable react/jsx-props-no-spreading */
import { TextField } from '@mui/material';
import React from 'react';

function FormInput({
  label,
  name,
  type,
  handleOnChange,
  errorMessages = [],
  value = '',
  multiline = false,
  rows = 1,
  variant = 'outlined',
  InputProps = {},
}) {
  return (
    <div>
      <TextField
        margin="dense"
        fullWidth
        error={errorMessages.length !== 0}
        helperText={
          errorMessages.length === 1 ? (
            errorMessages[0]
          ) : (
            <>
              {errorMessages.map((errorMessage) => (
                <li key={errorMessage}>{errorMessage}</li>
              ))}
            </>
          )
        }
        id={name}
        label={label}
        variant={variant}
        value={value}
        onChange={handleOnChange}
        name={name}
        type={type}
        onWheel={(e) => e.target.blur()}
        multiline={multiline}
        rows={rows}
        InputProps={InputProps}
      />
    </div>
  );
}

export default FormInput;
