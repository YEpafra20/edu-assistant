import React from 'react';
import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import { Add, Assessment, Quiz, Analytics, Chat } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Create Assessment',
      icon: <Assessment sx={{ fontSize: 40 }} />,
      action: () => navigate('/assessments/create'),
    },
    {
      title: 'Generate Quiz',
      icon: <Quiz sx={{ fontSize: 40 }} />,
      action: () => navigate('/quiz/generate'),
    },
    {
      title: 'View Analytics',
      icon: <Analytics sx={{ fontSize: 40 }} />,
      action: () => navigate('/analytics'),
    },
    {
      title: 'Student Chat',
      icon: <Chat sx={{ fontSize: 40 }} />,
      action: () => navigate('/chat'),
    },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Teacher Dashboard
      </Typography>

      <Grid container spacing={3}>
        {quickActions.map((action, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                '&:hover': { bgcolor: 'action.hover' }
              }}
              onClick={action.action}
            >
              {action.icon}
              <Typography variant="h6" sx={{ mt: 2 }}>
                {action.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Recent Activity
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Typography color="text.secondary">
            No recent activity to display
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default TeacherDashboard; 