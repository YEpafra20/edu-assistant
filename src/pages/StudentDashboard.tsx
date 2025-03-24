import React from 'react';
import { Box, Grid, Paper, Typography, LinearProgress } from '@mui/material';
import { Book, Assessment, Chat, Timeline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const learningModules = [
    {
      title: 'Current Module',
      progress: 75,
      icon: <Book sx={{ fontSize: 40 }} />,
      action: () => navigate('/learning'),
    },
    {
      title: 'Pending Assessments',
      progress: 30,
      icon: <Assessment sx={{ fontSize: 40 }} />,
      action: () => navigate('/assessments'),
    },
    {
      title: 'AI Assistant Chat',
      progress: 100,
      icon: <Chat sx={{ fontSize: 40 }} />,
      action: () => navigate('/chat'),
    },
    {
      title: 'Learning Progress',
      progress: 60,
      icon: <Timeline sx={{ fontSize: 40 }} />,
      action: () => navigate('/progress'),
    },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Student Dashboard
      </Typography>

      <Grid container spacing={3}>
        {learningModules.map((module, index) => (
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
              onClick={module.action}
            >
              {module.icon}
              <Typography variant="h6" sx={{ mt: 2 }}>
                {module.title}
              </Typography>
              <Box sx={{ width: '100%', mt: 2 }}>
                <LinearProgress variant="determinate" value={module.progress} />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Recommended Learning Path
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Typography color="text.secondary">
            Your personalized learning path will be generated based on your performance and goals
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default StudentDashboard; 