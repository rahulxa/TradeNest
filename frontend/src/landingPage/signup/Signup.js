import React, { useState } from 'react';
import {
  TextField, Button, Container, Typography, Box, CssBaseline, IconButton, InputAdornment, Grid, Paper, ThemeProvider, createTheme
} from '@mui/material';
import { Visibility, VisibilityOff, PersonOutline, EmailOutlined, LockOutlined } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import CryptoJS from 'crypto-js';

axios.defaults.withCredentials = true;

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

function Signup() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [signup, setSignup] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [message, setMessage] = useState('');
  const [info, setInfo] = useState("");

  const registerUser = async (formData) => {
    try {
      const response = await axios.post("http://localhost:3002/api/v1/users/create-account", formData);
      console.log("this is response", response);

      if (response.status === 200) {
        setMessage('Account created Successfully! Please Login to continue');
        reset();
        setSignup(false);
        setValue('username', formData.username);
        setValue('password', formData.password);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMessage('Username or email already taken. Please try a different one');
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  const loginUser = async (formData) => {
    try {
      const response = await axios.post("http://localhost:3002/api/v1/users/login", formData);
      if (response.data.statusCode === 200) {
        const userData = response.data.data;
        const accessToken = userData.accessToken;

        const secretKey = process.env.REACT_APP_SECRET_KEY;
        const encryptedToken = CryptoJS.AES.encrypt(accessToken, secretKey).toString();

        setMessage('');
        dispatch(login({ userData: response.data }));
        window.location.href = `http://localhost:3001/?token=${encodeURIComponent(encryptedToken)}`;
        reset();
        setInfo("");
      }
    } catch (error) {
      setInfo("Wrong username or password!");
    }
  };

  const toggleSignup = () => {
    setSignup(!signup);
    setMessage('');
    setInfo('');
    reset();
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md" sx={{ mt: 13, mb: 5 }}>
        <CssBaseline />
        <Grid container spacing={12} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/Media/Images/signup.png"
              alt="signup"
              sx={{
                width: '100%',
                height: 'auto',
                maxWidth: '500px',
                display: 'block',
                margin: 'auto',
                borderRadius: '20px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{
              borderRadius: '20px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              maxHeight: '600px',
            }}>
              <Box sx={{ p: 3 }}>
                <Typography component="h1" variant="h5" align="center" gutterBottom>
                  {signup ? 'Create Account' : 'Welcome Back!'}
                </Typography>
                <Typography variant="body2" align="center" color="textSecondary" paragraph>
                  {signup ? 'Join our community today!' : 'Sign in to your account'}
                </Typography>
                {message && (
                  <Typography variant="body2" color="success.main" align="center" sx={{ mt: 1 }}>
                    {message}
                  </Typography>
                )}
                <Box component="form" noValidate onSubmit={handleSubmit(signup ? registerUser : loginUser)} sx={{ mt: 2 }}>
                  <TextField
                    margin="dense"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    {...register('username', { required: true })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutline color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {signup && (
                    <TextField
                      margin="dense"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      {...register('email', { required: true })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailOutlined color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                  <TextField
                    margin="dense"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="current-password"
                    {...register('password', { required: true })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlined color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 1, borderRadius: '25px', height: '40px' }}
                  >
                    {signup ? 'Create Account' : 'Login'}
                  </Button>
                  <Box sx={{ mt: 1, textAlign: 'center' }}>
                    <Typography variant="body2" color="textSecondary">
                      {signup ? 'Already have an account?' : (info || 'Don\'t have an account?')}
                    </Typography>
                    <Button
                      type="button"
                      size="small"
                      variant="outlined"
                      sx={{ mt: 1, borderRadius: '20px' }}
                      onClick={toggleSignup}
                    >
                      {signup ? 'Login' : 'Create account now'}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Box sx={{ mt: 5, textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary" sx={{ opacity: 0.7, mb: 2 }}>
            I authorize Zerodha to contact me even if my number is registered on DND. Please visit this article to know more.
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ opacity: 0.7 }}>
            If you are looking to open a HUF, Corporate, Partnership, or NRI account, you have to use the offline forms.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Signup;