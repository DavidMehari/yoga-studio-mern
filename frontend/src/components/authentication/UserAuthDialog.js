/* global google */
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import {
  getDataFromToken, loginUser, loginWithGoogle, registerNewUser,
} from '../../helpers/utils';
import { useUserContext } from '../../contexts/UserContext';
import { TransitionUp } from '../../helpers/transitions';

const UserAuthDialog = () => {
  const [activeTab, setActiveTab] = useState(0);

  const { setActiveUser, authDialogOpen, setAuthDialogOpen } = useUserContext();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });
  const [registerFormData, setRegisterFormData] = useState({
    email: '',
    password: '',
    passwordAgain: '',
  });
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');

  const renderGoogleLogin = () => {
    google.accounts.id.renderButton(document.getElementById('signInBoxGoogle'), {
      theme: 'outline',
      size: 'large',
    });
  };

  const handleCallbackResponse = async (response) => {
    const userObject = getDataFromToken(response.credential);
    const result = await loginWithGoogle({
      name: userObject.name,
      email: userObject.email,
      avatar: userObject.picture,
      googleId: userObject.sub,
    });
    if (result.status === 200) {
      setActiveUser(getDataFromToken(result.token));
      localStorage.setItem('userToken', result.token);
      setAuthDialogOpen(false);
    } else {
      setLoginError(result.message);
    }
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    renderGoogleLogin();
  }, []);

  useEffect(() => {
    renderGoogleLogin();
  }, [authDialogOpen, activeTab]);

  async function signInWithEmail() {
    setLoginError('');
    const result = await loginUser(loginFormData);
    if (result.status === 200) {
      setActiveUser(getDataFromToken(result.token));
      localStorage.setItem('userToken', result.token);
      setAuthDialogOpen(false);
    } else {
      setLoginError(result.message);
    }
  }

  async function createUserWithEmail() {
    setRegisterError('');
    const result = await registerNewUser(registerFormData);
    if (result.status === 200) {
      setActiveUser(getDataFromToken(result.token));
      localStorage.setItem('userToken', result.token);
      setAuthDialogOpen(false);
    } else {
      setRegisterError(result.message);
    }
  }

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleClose = () => {
    setAuthDialogOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        maxWidth="sm"
        fullWidth
        open={authDialogOpen}
        TransitionComponent={TransitionUp}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ zIndex: 1350 }}
      >
        <DialogTitle>
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={activeTab} onChange={handleChange} centered>
              <Tab label="Belépés" />
              <Tab label="Regisztráció" />
            </Tabs>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          {activeTab === 0 && (
            <>
              <Typography
                sx={{ textAlign: 'center', marginY: '20px' }}
                variant="h4"
                gutterBottom
                component="div"
              >
                Belépés
              </Typography>
              <Box id="signInBoxGoogle" sx={{ width: 'fit-content', height: '44px', m: '0 auto' }} />
              <Typography
                sx={{ textAlign: 'center', marginTop: '20px' }}
                variant="p"
                gutterBottom
                component="div"
              >
                - VAGY -
              </Typography>
              <LoginForm
                loginFormData={loginFormData}
                setLoginFormData={setLoginFormData}
                signInWithEmail={() => signInWithEmail()}
                loginError={loginError}
                handleClose={handleClose}
              />

            </>
          )}
          {activeTab === 1 && (
            <>
              <Typography
                sx={{ textAlign: 'center', marginY: '20px' }}
                variant="h4"
                gutterBottom
                component="div"
              >
                Regisztráció
              </Typography>
              <RegisterForm
                registerFormData={registerFormData}
                setRegisterFormData={setRegisterFormData}
                registerError={registerError}
                createUserWithEmail={() => createUserWithEmail()}
                handleClose={handleClose}
              />
            </>
          )}
          <DialogContentText id="alert-dialog-slide-description" />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserAuthDialog;
