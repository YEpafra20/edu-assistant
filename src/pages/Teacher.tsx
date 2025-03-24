import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Chip,
  LinearProgress,
  Avatar,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Book,
  Assignment,
  CalendarToday,
  EmojiEvents,
  School,
  Notifications,
  MoreVert,
  Add,
  CheckCircle,
  Schedule,
  Group,
  Chat,
  Assessment,
  People,
  Analytics,
} from '@mui/icons-material';
import AssessmentComponent from '../components/teacher/Assessment';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`teacher-tabpanel-${index}`}
      aria-labelledby={`teacher-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Teacher = () => {
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}>
            <School />
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1">
              Teacher Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Welcome back, Dr. Sarah Johnson
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton>
            <Notifications />
          </IconButton>
          <IconButton onClick={handleMenuClick}>
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Help Center</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Students
            </Typography>
            <Typography variant="h4" color="primary">
              120
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Courses
            </Typography>
            <Typography variant="h4" color="primary">
              4
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Pending Assignments
            </Typography>
            <Typography variant="h4" color="primary">
              15
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Average Grade
            </Typography>
            <Typography variant="h4" color="primary">
              85%
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Paper sx={{ width: '100%' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="teacher dashboard tabs"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab
            icon={<Assessment />}
            label="Assessments"
            id="teacher-tab-0"
            aria-controls="teacher-tabpanel-0"
          />
          <Tab
            icon={<People />}
            label="Students"
            id="teacher-tab-1"
            aria-controls="teacher-tabpanel-1"
          />
          <Tab
            icon={<Analytics />}
            label="Analytics"
            id="teacher-tab-2"
            aria-controls="teacher-tabpanel-2"
          />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <AssessmentComponent />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Student Management
          </Typography>
          {/* Student management content will go here */}
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Analytics Dashboard
          </Typography>
          {/* Analytics content will go here */}
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default Teacher; 