import React, { useState } from 'react';
import {
  TextField, Button, Container, Typography, Box, CssBaseline, Avatar, IconButton, InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import CryptoJS from 'crypto-js';

axios.defaults.withCredentials = true;

function Signup() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [signup, setSignup] = useState(false);
  const { register, handleSubmit, reset } = useForm(); // react form
  const [message, setMessage] = useState(''); // for displaying message
  const [userDetails, setUserDetails] = useState({}); // for autocomplete the login fields when user registers and tries to login
  const [info, setInfo] = useState("");
  const baseURL = process.env.REACT_APP_BACKEND_URL;


  const registerUser = async (formData) => {
    try {
      const response = await axios.post(`${baseURL}/api/v1/users/create-account`, formData);
      if (response.data.statusCode === 200) {
        setMessage('Account created Successfully! Please Login to continue');
        setUserDetails(formData);
        reset(); // reset the form fields
        setSignup(false); // Switch to login form
      }
    } catch (error) {
      // console.log(error.response.data.message)
      setMessage(error.response.data.message); // Display backend error message
    }
  };

  const loginUser = async (formData) => {
    try {
      const response = await axios.post(`${baseURL}/api/v1/users/login`, formData);
      console.log("logged in");
      if (response.data.statusCode === 200) {
        console.log("logged in")
        const userData = response.data.data;
        const accessToken = userData.accessToken;
        console.log("original access token frontend:", accessToken);

        //encryption
        const secretKey = process.env.REACT_APP_SECRET_KEY;
        const encryptedToken = CryptoJS.AES.encrypt(accessToken, secretKey).toString();
        console.log("encypted access token frontend:", encryptedToken)

        setMessage('');
        setUserDetails("")
        dispatch(login({ userData: response.data }));
        window.location.href = `http://localhost:3001/?token=${encodeURIComponent(encryptedToken)}`;
        reset();
        setInfo("")
      }
    } catch (error) {
      // console.log("this is the error:", error)
      setInfo("Wrong username or password!!"); // Display frontend error message
    }
  };


  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className='container p-5 mb-5' style={{ marginTop: '130px' }}>
      {signup ?
        (
          <div className='row'>
            <div className='col-6' style={{ marginRight: '100px' }}>
              <img src='Media/Images/signup.png' alt='signup' />
            </div>
            <div className='col-5' style={{ marginTop: '-70px' }}>
              <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component='h1' variant='h5'>
                    Create Account
                  </Typography>
                  <Box component='form' noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(registerUser)}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      id='username'
                      label='Username'
                      name='username'
                      autoComplete='username'
                      autoFocus
                      {...register('username', { required: true })}
                    />
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      id='Email'
                      label='Email'
                      name='Email'
                      autoComplete='Email'
                      {...register('email', { required: true })}
                    />
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      name='password'
                      label='Password'
                      type={showPassword ? 'text' : 'password'}
                      id='password'
                      autoComplete='current-password'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={handleClickShowPassword}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      {...register('password', { required: true })}
                    />
                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Create Account
                    </Button>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                      <Typography variant='body2' style={{ textDecoration: 'underline', opacity: 0.7 }}>
                        Already have an account?
                      </Typography>
                      <Button
                        type='button'
                        size='small'
                        variant='contained'
                        sx={{ mt: 1 }}
                        onClick={() => setSignup(false)}
                      >
                        Login
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Container>
            </div>
          </div>
        ) : (
          <div className='row'>
            <div className='col-6' style={{ marginRight: '100px' }}>
              <img src='Media/Images/signup.png' alt='login' />
            </div>
            <div className='col-5' style={{ marginTop: '-70px' }}>
              <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component='h1' variant='h5'>
                    Login
                  </Typography>
                  <Typography
                    variant='body1'
                    color='success' // Setting the color to green for success
                    style={{ fontSize: '0.875rem', marginTop: '8px' }} // Adjusting font size and margin
                  >
                    {message ? message : ""}
                  </Typography>
                  <Box component='form' noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(loginUser)}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      id='username'
                      label='Username'
                      name='username'
                      autoComplete='username'
                      autoFocus
                      defaultValue={userDetails.username || ''}
                      {...register('username', { required: true })}
                    />
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      name='password'
                      label='Password'
                      type={showPassword ? 'text' : 'password'}
                      id='password'
                      autoComplete='current-password'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={handleClickShowPassword}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      defaultValue={userDetails.password || ''}
                      {...register('password', { required: true })}
                    />
                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Login
                    </Button>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                      <Typography variant='body2' style={{ textDecoration: 'underline', opacity: 0.7 }}>
                        {info ? info : "Do not have an account?"}
                      </Typography>
                      <Button
                        type='button'
                        size='small'
                        variant='contained'
                        sx={{ mt: 1 }}
                        onClick={() => setSignup(true)}
                      >
                        Create account now
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Container>
            </div>
          </div>
        )}
      <div className='row'>
        <div className='col-12'>
          <p className='text-muted mt-5' style={{ opacity: 0.7, textAlign: 'center' }}>
            I authorise Zerodha to contact me even if my number is registered on DND. Please visit this article to know more.
          </p>
          <p className='text-muted mt-3' style={{ textAlign: 'center', marginTop: '0px', opacity: 0.7 }}>
            If you are looking to open a HUF, Corporate, Partnership, or NRI account, you have to use the offline forms.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
