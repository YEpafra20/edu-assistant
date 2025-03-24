import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Card,
  CardContent,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Stack,
  Tooltip,
  Badge,
  CircularProgress,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications,
  AccountCircle,
  School,
  Assignment,
  EmojiEvents,
  TrendingUp,
  AccessTime,
  Star,
  CalendarToday,
  Timer,
  Speed,
  Psychology,
  Group,
  ChevronRight,
  CheckCircle,
  Schedule,
  Book,
  Quiz,
  VideoLibrary,
  Article,
  Code,
  Description,
  Assessment,
  ExitToApp,
  MoreVert,
  Person,
  Settings,
  Logout,
  Dashboard,
  Lightbulb,
  Timeline,
} from '@mui/icons-material';
import CurrentModule from '../components/student/CurrentModule';
import LearningProgress from '../components/student/LearningProgress';

interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  nextLesson: string;
  dueDate: string;
  status: 'in-progress' | 'completed' | 'upcoming';
  type: 'video' | 'quiz' | 'assignment' | 'reading';
  duration: string;
  points: number;
}

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  type: 'quiz' | 'assignment' | 'project';
  status: 'pending' | 'submitted' | 'graded';
  points: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'achievement' | 'milestone' | 'certificate';
  points: number;
  icon?: React.ReactNode;
  progress?: number;
}

const Student: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [notificationCount] = useState(3);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleCloseDialog = () => {
    setSelectedCourse(null);
  };

  // Sample data
  const currentModuleData = {
    moduleTitle: 'Advanced React Patterns',
    moduleDescription: 'Learn advanced React patterns and best practices for building scalable applications.',
    overallProgress: 75,
    instructor: 'Dr. Sarah Chen',
    lastUpdated: '2 hours ago',
    contents: [
      {
        id: '1',
        title: 'Custom Hooks Deep Dive',
        type: 'video' as const,
        duration: '45 mins',
        status: 'completed' as const,
        progress: 100,
        difficulty: 'hard' as const,
        points: 50,
      },
      {
        id: '2',
        title: 'Performance Optimization',
        type: 'reading' as const,
        duration: '30 mins',
        status: 'in-progress' as const,
        progress: 60,
        difficulty: 'medium' as const,
        points: 40,
      },
      {
        id: '3',
        title: 'State Management Patterns',
        type: 'quiz' as const,
        duration: '20 mins',
        status: 'locked' as const,
        progress: 0,
        difficulty: 'hard' as const,
        points: 30,
      },
    ],
  };

  const learningProgressData = {
    metrics: [
      {
        label: 'Quiz Scores',
        value: 85,
        target: 90,
        unit: '%',
        color: 'primary' as const,
        trend: 5,
        icon: <Quiz />,
        description: 'Average score across all quizzes',
      },
      {
        label: 'Assignment Completion',
        value: 12,
        target: 15,
        unit: 'assignments',
        color: 'success' as const,
        trend: 2,
        icon: <Assignment />,
        description: 'Completed assignments this month',
      },
      {
        label: 'Study Hours',
        value: 25,
        target: 30,
        unit: 'hours',
        color: 'warning' as const,
        trend: -3,
        icon: <AccessTime />,
        description: 'Weekly study time',
      },
      {
        label: 'Participation',
        value: 90,
        target: 100,
        unit: '%',
        color: 'primary' as const,
        trend: 0,
        icon: <Group />,
        description: 'Class participation rate',
      },
    ],
    achievements: [
      {
        id: '1',
        title: 'Perfect Quiz Score',
        description: 'Achieved 100% on Advanced React Patterns Quiz',
        date: '2024-02-15',
        type: 'achievement' as const,
        points: 50,
        progress: 100,
      },
      {
        id: '2',
        title: 'Weekly Streak',
        description: 'Completed 7 days of consistent learning',
        date: '2024-02-14',
        type: 'milestone' as const,
        points: 100,
        progress: 100,
      },
      {
        id: '3',
        title: 'Project Milestone',
        description: 'Completed first major project',
        date: '2024-02-13',
        type: 'certificate' as const,
        points: 200,
        progress: 100,
      },
    ],
    studyTime: '25 hours',
    completedModules: 8,
    totalModules: 12,
    streak: 7,
    nextMilestone: 'Complete 10 modules',
  };

  const enrolledCourses: Course[] = [
    {
      id: '1',
      title: 'Advanced React Patterns',
      instructor: 'Dr. Sarah Chen',
      progress: 75,
      nextLesson: 'State Management Patterns',
      dueDate: '2024-02-20',
      status: 'in-progress',
      type: 'video',
      duration: '45 mins',
      points: 50,
    },
    {
      id: '2',
      title: 'TypeScript Fundamentals',
      instructor: 'Prof. Michael Brown',
      progress: 60,
      nextLesson: 'Advanced Types',
      dueDate: '2024-02-22',
      status: 'in-progress',
      type: 'reading',
      duration: '30 mins',
      points: 40,
    },
    {
      id: '3',
      title: 'Cloud Architecture',
      instructor: 'Dr. Emily Davis',
      progress: 90,
      nextLesson: 'Final Project',
      dueDate: '2024-02-25',
      status: 'in-progress',
      type: 'quiz',
      duration: '20 mins',
      points: 30,
    },
  ];

  const upcomingAssignments: Assignment[] = [
    {
      id: '1',
      title: 'React Hooks Assignment',
      course: 'Advanced React Patterns',
      dueDate: '2024-02-20',
      type: 'assignment',
      status: 'pending',
      points: 100,
    },
    {
      id: '2',
      title: 'TypeScript Quiz',
      course: 'TypeScript Fundamentals',
      dueDate: '2024-02-22',
      type: 'quiz',
      status: 'pending',
      points: 50,
    },
    {
      id: '3',
      title: 'Cloud Architecture Project',
      course: 'Cloud Architecture',
      dueDate: '2024-02-25',
      type: 'project',
      status: 'pending',
      points: 200,
    },
  ];

  const recentAchievements: Achievement[] = [
    {
      id: '1',
      title: 'Perfect Quiz Score',
      description: 'Achieved 100% on Advanced React Patterns Quiz',
      date: '2024-02-15',
      type: 'achievement',
      points: 50,
      progress: 100,
    },
    {
      id: '2',
      title: 'Weekly Streak',
      description: 'Completed 7 days of consistent learning',
      date: '2024-02-14',
      type: 'milestone',
      points: 100,
      progress: 100,
    },
    {
      id: '3',
      title: 'Project Milestone',
      description: 'Completed first major project',
      date: '2024-02-13',
      type: 'certificate',
      points: 200,
      progress: 100,
    },
  ];

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <VideoLibrary />;
      case 'quiz':
        return <Quiz />;
      case 'reading':
        return <Article />;
      case 'assignment':
        return <Assignment />;
      default:
        return <Description />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'primary';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Dashboard sx={{ fontSize: 40, color: 'primary.main' }} />
            <Box>
              <Typography variant="h4" component="h1">
                Student Dashboard
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Welcome back, John Doe
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Tooltip title="Notifications">
              <IconButton>
                <Badge badgeContent={notificationCount} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Profile Menu">
              <IconButton onClick={handleMenuClick}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>JD</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <Person fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="Profile"
                  secondary="View and edit your profile"
                />
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="Settings"
                  secondary="Manage your preferences"
                />
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="Logout"
                  secondary="End your session"
                />
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Quick Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <CircularProgress
                    variant="determinate"
                    value={75}
                    size={80}
                    thickness={4}
                    sx={{ color: 'primary.main' }}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <School sx={{ fontSize: 30, color: 'primary.main' }} />
                  </Box>
                </Box>
                <Typography variant="h6" align="center">Enrolled Courses</Typography>
                <Typography variant="h4" color="primary">{enrolledCourses.length}</Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  {enrolledCourses.filter(c => c.status === 'in-progress').length} in progress
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <CircularProgress
                    variant="determinate"
                    value={40}
                    size={80}
                    thickness={4}
                    sx={{ color: 'warning.main' }}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Assignment sx={{ fontSize: 30, color: 'warning.main' }} />
                  </Box>
                </Box>
                <Typography variant="h6" align="center">Pending Tasks</Typography>
                <Typography variant="h4" color="warning.main">{upcomingAssignments.length}</Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Due this week
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <CircularProgress
                    variant="determinate"
                    value={90}
                    size={80}
                    thickness={4}
                    sx={{ color: 'success.main' }}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <EmojiEvents sx={{ fontSize: 30, color: 'success.main' }} />
                  </Box>
                </Box>
                <Typography variant="h6" align="center">Achievements</Typography>
                <Typography variant="h4" color="success.main">{recentAchievements.length}</Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Earned this month
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <CircularProgress
                    variant="determinate"
                    value={83}
                    size={80}
                    thickness={4}
                    sx={{ color: 'info.main' }}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Timer sx={{ fontSize: 30, color: 'info.main' }} />
                  </Box>
                </Box>
                <Typography variant="h6" align="center">Study Time</Typography>
                <Typography variant="h4" color="info.main">25h</Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  This week
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Current Module */}
          <Grid item xs={12} md={8}>
            <CurrentModule {...currentModuleData} />
          </Grid>

          {/* Learning Progress */}
          <Grid item xs={12} md={4}>
            <LearningProgress {...learningProgressData} />
          </Grid>

          {/* Enrolled Courses */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Enrolled Courses</Typography>
                <Button endIcon={<MoreVert />}>View All</Button>
              </Box>
              <List>
                {enrolledCourses.map((course) => (
                  <ListItem
                    key={course.id}
                    button
                    onClick={() => handleCourseClick(course)}
                  >
                    <ListItemIcon>
                      <School />
                    </ListItemIcon>
                    <ListItemText
                      primary={course.title}
                      secondary={
                        <Box component="span">
                          {course.instructor} • {course.progress}% Complete
                        </Box>
                      }
                    />
                    <Chip
                      label={course.status}
                      color={course.status === 'in-progress' ? 'primary' : 'success'}
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Upcoming Assignments */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Upcoming Assignments</Typography>
                <Button endIcon={<MoreVert />}>View All</Button>
              </Box>
              <List>
                {upcomingAssignments.map((assignment) => (
                  <ListItem key={assignment.id}>
                    <ListItemIcon>
                      <Assignment />
                    </ListItemIcon>
                    <ListItemText
                      primary={assignment.title}
                      secondary={
                        <Box component="span">
                          Due: {assignment.dueDate}
                        </Box>
                      }
                    />
                    <Chip
                      label={assignment.type}
                      color="primary"
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Recent Achievements */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Recent Achievements</Typography>
                <Button endIcon={<MoreVert />}>View All</Button>
              </Box>
              <List>
                {recentAchievements.map((achievement) => (
                  <ListItem key={achievement.id}>
                    <ListItemIcon>
                      <EmojiEvents />
                    </ListItemIcon>
                    <ListItemText
                      primary={achievement.title}
                      secondary={
                        <Box component="span">
                          {achievement.description}
                        </Box>
                      }
                    />
                    <Chip
                      label={`+${achievement.points}`}
                      color="success"
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>

        {/* Course Details Dialog */}
        <Dialog
          open={Boolean(selectedCourse)}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          {selectedCourse && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {getContentIcon(selectedCourse.type)}
                  <Box>
                    <Typography variant="h6">{selectedCourse.title}</Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {selectedCourse.instructor}
                    </Typography>
                  </Box>
                </Box>
              </DialogTitle>
              <DialogContent dividers>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Course Progress
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Box sx={{ flexGrow: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={selectedCourse.progress}
                            sx={{ height: 8, borderRadius: 4 }}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {selectedCourse.progress}%
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Stack spacing={2}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Schedule sx={{ color: 'primary.main' }} />
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Next Lesson
                            </Typography>
                            <Typography variant="body1">
                              {selectedCourse.nextLesson}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AccessTime sx={{ color: 'warning.main' }} />
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Due Date
                            </Typography>
                            <Typography variant="body1">
                              {selectedCourse.dueDate}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Timer sx={{ color: 'info.main' }} />
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Duration
                            </Typography>
                            <Typography variant="body1">
                              {selectedCourse.duration}
                            </Typography>
                          </Box>
                        </Box>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Stack spacing={2}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Star sx={{ color: 'warning.main' }} />
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Points Available
                            </Typography>
                            <Typography variant="body1">
                              {selectedCourse.points} points
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Assessment sx={{ color: 'success.main' }} />
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Status
                            </Typography>
                            <Chip
                              label={selectedCourse.status}
                              color={selectedCourse.status === 'in-progress' ? 'primary' : 'success'}
                              size="small"
                            />
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <VideoLibrary sx={{ color: 'primary.main' }} />
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Content Type
                            </Typography>
                            <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                              {selectedCourse.type}
                            </Typography>
                          </Box>
                        </Box>
                      </Stack>
                    </Paper>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ p: 2 }}>
                <Button onClick={handleCloseDialog} color="inherit">
                  Close
                </Button>
                <Button
                  variant="contained"
                  endIcon={<ChevronRight />}
                  onClick={handleCloseDialog}
                >
                  Continue Learning
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default Student; 