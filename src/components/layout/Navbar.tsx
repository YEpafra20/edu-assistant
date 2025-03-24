import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { School, Assessment, Chat, Analytics } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Edu Assistant
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" startIcon={<School />} onClick={() => navigate('/')}>
            Home
          </Button>
          <Button color="inherit" startIcon={<Assessment />} onClick={() => navigate('/assessments')}>
            Assessments
          </Button>
          <Button color="inherit" startIcon={<Chat />} onClick={() => navigate('/chat')}>
            Chat
          </Button>
          <Button color="inherit" startIcon={<Analytics />} onClick={() => navigate('/analytics')}>
            Analytics
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 