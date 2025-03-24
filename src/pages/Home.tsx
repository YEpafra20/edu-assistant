import React from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { School, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Welcome to Edu Assistant
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary">
        Your AI-Powered Virtual Teaching Assistant
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': { bgcolor: 'action.hover' }
            }}
            onClick={() => navigate('/teacher')}
          >
            <School sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h5" component="h3" gutterBottom>
              I'm a Teacher
            </Typography>
            <Typography align="center" color="text.secondary">
              Access tools for creating assessments, generating quizzes, and tracking student progress
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': { bgcolor: 'action.hover' }
            }}
            onClick={() => navigate('/student')}
          >
            <Person sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h5" component="h3" gutterBottom>
              I'm a Student
            </Typography>
            <Typography align="center" color="text.secondary">
              Access personalized learning materials, take assessments, and get instant feedback
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home; 