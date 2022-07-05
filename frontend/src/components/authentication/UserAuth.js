import React from 'react';
import { Box, IconButton } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import UserAuthDialog from './UserAuthDialog';
import { useUserContext } from '../../contexts/UserContext';

function UserAuth() {
  const { setAuthDialogOpen } = useUserContext();

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <IconButton
          sx={{
            my: 2,
            color: 'white',
            fontWeight: 400,
          }}
          onClick={() => setAuthDialogOpen(true)}
          aria-label="Belépés"
        >
          <LoginIcon />
        </IconButton>
      </Box>
      <Box>
        <UserAuthDialog />
      </Box>
    </div>
  );
}

export default UserAuth;
