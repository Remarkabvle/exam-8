import React, { useState, useEffect } from 'react';
import { useLoginAdminMutation } from '../../context/api/adminApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '../../context/slices/authSlice';
import { Box, Container, TextField, Button, Typography, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FaSignInAlt } from 'react-icons/fa';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black
    },
    secondary: {
      main: '#ffffff', // White
    },
  },
  typography: {
    h2: {
      fontWeight: 600,
      color: '#000000',
      marginBottom: '1rem',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '1rem',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          marginTop: '1rem',
        },
      },
    },
  },
});

const Login = () => {
  const [adminLogin, { data, isLoading, isSuccess }] = useLoginAdminMutation();
  const [username, setUsername] = useState('iskandar');
  const [password, setPassword] = useState('iskandar');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken(data?.payload?.token));
      toast.success('Login successful!');
      navigate('/admin/productManage');
    }
  }, [isSuccess, data, dispatch, navigate]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (username && password) {
      try {
        await adminLogin({ username, password }).unwrap();
      } catch (error) {
        toast.error('Login failed. Please try again.');
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '25vh' }}>
          <Typography variant="h2">Login</Typography>
          <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 1 }}>
            <TextField
              label="Username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isLoading}
              startIcon={<FaSignInAlt />}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
