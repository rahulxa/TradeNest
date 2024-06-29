import React, { useState } from 'react';
import {
  TextField, Button, Container, Typography, Box, CssBaseline, Avatar, IconButton, InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function Signup() {

  const [showPassword, setShowPassword] = useState(false);
  const [signup, setSignup] = useState(false)

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSignup = (e) => {
    e.preventDefault();
    setSignup(true)
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setSignup(false)
  }

  return (
    <div className='container p-5 mb-5' style={{ marginTop: "130px" }}>
      {signup === true ? (
        <div className='row'>
          <div className='col-6' style={{ marginRight: "100px" }}>
            <img src='Media/Images/signup.png' />
          </div>
          <div className='col-5' style={{ marginTop: "-70px", }}>
            <Container component="main" maxWidth="xs">
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
                <Typography component="h1" variant="h5">
                  Signup
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus

                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="Email"
                    label="Email"
                    name="Email"
                    autoComplete="Email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"

                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Signup
                  </Button>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                    <Typography variant="body2" style={{ textDecoration: "underline", opacity: 0.7 }}>Already have an account?</Typography>
                    <Button
                      type="button"
                      size="small"
                      variant="contained"
                      sx={{ mt: 1 }}
                      onClick={(e) => handleLogin(e)}
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
          <div className='col-6' style={{ marginRight: "100px" }}>
            <img src='Media/Images/signup.png' />
          </div>
          <div className='col-5' style={{ marginTop: "-70px", }}>
            <Container component="main" maxWidth="xs">
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
                <Typography component="h1" variant="h5">
                  Login
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus

                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"

                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Login
                  </Button>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                    <Typography variant="body2" style={{ textDecoration: "underline", opacity: 0.7 }}>Do not have an account?</Typography>
                    <Button
                      type="button"
                      size="small"
                      variant="contained"
                      sx={{ mt: 1 }}
                      onClick={(e) => handleSignup(e)}
                    >
                      Signup now
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Container>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-12">
          <p className="text-muted mt-5" style={{ opacity: 0.7, textAlign: "center" }}>
            I authorise Zerodha to contact me even if my number is registered on DND.Please visit this article to know more.
          </p>
          <p className="text-muted mt-3" style={{ textAlign: "center", marginTop: "0px", opacity: 0.7 }}>
            If you are looking to open a HUF, Corporate, Partnership, or NRI account, you have to use the offline forms.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup




// <div className='container p-5 mb-5' style={{ marginTop: "130px" }}>
//       <div className='row'>
//         <div className='col-6' style={{ marginRight: "100px" }}>
//           <img src='Media/Images/signup.png' />
//         </div>
//         <div className='col-5' style={{ marginTop: "-70px", }}>
//           <Container component="main" maxWidth="xs">
//             <CssBaseline />
//             <Box
//               sx={{
//                 marginTop: 8,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//               }}
//             >
//               <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//                 <LockOutlinedIcon />
//               </Avatar>
//               <Typography component="h1" variant="h5">
//                 Login
//               </Typography>
//               <Box component="form" noValidate sx={{ mt: 1 }}>
//                 <TextField
//                   margin="normal"
//                   required
//                   fullWidth
//                   id="username"
//                   label="Username"
//                   name="username"
//                   autoComplete="username"
//                   autoFocus

//                 />
//                 <TextField
//                   margin="normal"
//                   required
//                   fullWidth
//                   name="password"
//                   label="Password"
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   autoComplete="current-password"

//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton
//                           aria-label="toggle password visibility"
//                           onClick={handleClickShowPassword}
//                         >
//                           {showPassword ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                       </InputAdornment>
//                     )
//                   }}
//                 />
//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   sx={{ mt: 3, mb: 2 }}
//                 >
//                   Login
//                 </Button>
//                 <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
//                   <Typography variant="body2">Do not have an account?</Typography>
//                   <Button
//                     type="button"
//                     size="small"
//                     variant="contained"
//                     sx={{ mt: 1 }}
//                     onClick={(e) => handleSignup(e)}
//                   >
//                     Signup now
//                   </Button>
//                 </Box>
//               </Box>
//             </Box>
//           </Container>
//         </div>
//       </div>
//     </div>