import React from 'react';
import {
  Box,
  Paper,
  Typography,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Chip,
  IconButton,
  Tooltip,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  PlayCircle,
  Quiz,
  Assignment,
  MenuBook,
  Lock,
  CheckCircle,
  RadioButtonUnchecked,
  AccessTime,
  Star,
  EmojiEvents,
  School,
  Timer,
  TrendingUp,
} from '@mui/icons-material';

export interface ModuleContent {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'assignment' | 'reading';
  duration?: string;
  status: 'completed' | 'in-progress' | 'locked';
  progress: number;
  points?: number;
  dueDate?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  estimatedTime?: string;
  lastAccessed?: string;
}

export interface CurrentModuleProps {
  moduleTitle: string;
  moduleDescription: string;
  overallProgress: number;
  contents: ModuleContent[];
  instructor: string;
  lastUpdated: string;
  totalPoints?: number;
  earnedPoints?: number;
  timeSpent?: string;
  nextDueDate?: string;
}

const getContentIcon = (type: ModuleContent['type']) => {
  switch (type) {
    case 'video':
      return <PlayCircle sx={{ color: '#2196F3' }} />;
    case 'quiz':
      return <Quiz sx={{ color: '#4CAF50' }} />;
    case 'assignment':
      return <Assignment sx={{ color: '#FF9800' }} />;
    case 'reading':
      return <MenuBook sx={{ color: '#9C27B0' }} />;
    default:
      return <MenuBook />;
  }
};

const getStatusIcon = (status: ModuleContent['status']) => {
  switch (status) {
    case 'completed':
      return <CheckCircle sx={{ color: '#4CAF50' }} />;
    case 'in-progress':
      return <RadioButtonUnchecked sx={{ color: '#FF9800' }} />;
    case 'locked':
      return <Lock sx={{ color: '#9E9E9E' }} />;
    default:
      return <RadioButtonUnchecked />;
  }
};

const getStatusColor = (status: ModuleContent['status']): 'success' | 'warning' | 'info' => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'in-progress':
      return 'warning';
    case 'locked':
      return 'info';
    default:
      return 'info';
  }
};

const getDifficultyColor = (difficulty?: ModuleContent['difficulty']) => {
  switch (difficulty) {
    case 'easy':
      return '#4CAF50';
    case 'medium':
      return '#FF9800';
    case 'hard':
      return '#F44336';
    default:
      return '#9E9E9E';
  }
};

const CurrentModule: React.FC<CurrentModuleProps> = ({
  moduleTitle,
  moduleDescription,
  overallProgress,
  contents,
  instructor,
  lastUpdated,
  totalPoints,
  earnedPoints,
  timeSpent,
  nextDueDate,
}) => {
  return (
    <Paper sx={{ p: 3 }}>
      {/* Module Header */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>
              {moduleTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {moduleDescription}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ flexGrow: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={overallProgress}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {overallProgress}%
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
          <Chip
            icon={<AccessTime />}
            label={`Last updated: ${lastUpdated}`}
            size="small"
            variant="outlined"
          />
          <Chip
            icon={<Star />}
            label={`Instructor: ${instructor}`}
            size="small"
            variant="outlined"
          />
          {timeSpent && (
            <Chip
              icon={<Timer />}
              label={`Time spent: ${timeSpent}`}
              size="small"
              variant="outlined"
            />
          )}
          {nextDueDate && (
            <Chip
              icon={<AccessTime />}
              label={`Next due: ${nextDueDate}`}
              size="small"
              color="warning"
              variant="outlined"
            />
          )}
        </Box>
      </Box>

      {/* Module Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <School sx={{ color: '#2196F3' }} />
                <Typography variant="h6">{contents.length}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Total Contents
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmojiEvents sx={{ color: '#FFD700' }} />
                <Typography variant="h6">
                  {contents.filter(c => c.status === 'completed').length}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Completed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {totalPoints && earnedPoints && (
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Star sx={{ color: '#FF9800' }} />
                  <Typography variant="h6">{earnedPoints}/{totalPoints}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Points Earned
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp sx={{ color: '#4CAF50' }} />
                <Typography variant="h6">{overallProgress}%</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Overall Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Module Contents */}
      <List>
        {contents.map((content) => (
          <ListItem
            key={content.id}
            disablePadding
            sx={{
              mb: 2,
              borderRadius: 1,
              bgcolor: content.status === 'locked' ? 'action.hover' : 'transparent',
            }}
          >
            <ListItemButton
              disabled={content.status === 'locked'}
              sx={{ borderRadius: 1 }}
            >
              <ListItemIcon>
                {getContentIcon(content.type)}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1">
                      {content.title}
                    </Typography>
                    {content.difficulty && (
                      <Chip
                        label={content.difficulty}
                        size="small"
                        sx={{
                          bgcolor: getDifficultyColor(content.difficulty),
                          color: 'white',
                        }}
                      />
                    )}
                  </Box>
                }
                secondary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                    {content.duration && (
                      <Typography variant="caption" color="text.secondary">
                        {content.duration}
                      </Typography>
                    )}
                    {content.points && (
                      <Typography variant="caption" color="text.secondary">
                        {content.points} points
                      </Typography>
                    )}
                    {content.dueDate && (
                      <Typography variant="caption" color="text.secondary">
                        Due: {content.dueDate}
                      </Typography>
                    )}
                    {content.lastAccessed && (
                      <Typography variant="caption" color="text.secondary">
                        Last accessed: {content.lastAccessed}
                      </Typography>
                    )}
                  </Box>
                }
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ width: 100 }}>
                  <LinearProgress
                    variant="determinate"
                    value={content.progress}
                    color={getStatusColor(content.status)}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </Box>
                <Tooltip title={content.status}>
                  <IconButton size="small">
                    {getStatusIcon(content.status)}
                  </IconButton>
                </Tooltip>
                {content.status !== 'locked' && (
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<PlayCircle />}
                  >
                    {content.status === 'completed' ? 'Review' : 'Start'}
                  </Button>
                )}
              </Box>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default CurrentModule; 