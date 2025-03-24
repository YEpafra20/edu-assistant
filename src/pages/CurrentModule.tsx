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
} from '@mui/material';
import {
  PlayCircle,
  Quiz,
  Assignment,
  MenuBook,
  Lock,
  CheckCircle,
  RadioButtonUnchecked,
} from '@mui/icons-material';

export interface ModuleContent {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'assignment' | 'reading';
  duration: string;
  status: 'completed' | 'in-progress' | 'locked';
  progress: number;
}

export interface CurrentModuleProps {
  moduleTitle: string;
  moduleDescription: string;
  overallProgress: number;
  contents: ModuleContent[];
}

const getContentIcon = (type: ModuleContent['type']) => {
  switch (type) {
    case 'video':
      return <PlayCircle color="primary" />;
    case 'quiz':
      return <Quiz color="primary" />;
    case 'assignment':
      return <Assignment color="primary" />;
    case 'reading':
      return <MenuBook color="primary" />;
    default:
      return <MenuBook color="primary" />;
  }
};

const getStatusIcon = (status: ModuleContent['status']) => {
  switch (status) {
    case 'completed':
      return <CheckCircle color="success" />;
    case 'in-progress':
      return <RadioButtonUnchecked color="primary" />;
    case 'locked':
      return <Lock color="disabled" />;
    default:
      return <RadioButtonUnchecked color="primary" />;
  }
};

const getStatusColor = (status: ModuleContent['status']) => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'in-progress':
      return 'primary';
    case 'locked':
      return 'default';
    default:
      return 'primary';
  }
};

const CurrentModule: React.FC<CurrentModuleProps> = ({
  moduleTitle,
  moduleDescription,
  overallProgress,
  contents,
}) => {
  return (
    <Paper sx={{ p: 3 }}>
      {/* Module Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          {moduleTitle}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {moduleDescription}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <LinearProgress
              variant="determinate"
              value={overallProgress}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            {overallProgress}% Complete
          </Typography>
        </Box>
      </Box>

      {/* Module Contents */}
      <List>
        {contents.map((content) => (
          <ListItem
            key={content.id}
            disablePadding
            sx={{
              mb: 1,
              opacity: content.status === 'locked' ? 0.7 : 1,
            }}
          >
            <ListItemButton
              disabled={content.status === 'locked'}
              sx={{
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: content.status === 'locked' ? 'transparent' : 'action.hover',
                },
              }}
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
                    <Chip
                      label={content.duration}
                      size="small"
                      color="default"
                      variant="outlined"
                    />
                  </Box>
                }
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={content.progress}
                          sx={{ height: 4, borderRadius: 2 }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {content.progress}%
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      {getStatusIcon(content.status)}
                      <Typography variant="body2" color="text.secondary">
                        {content.status.charAt(0).toUpperCase() + content.status.slice(1)}
                      </Typography>
                    </Box>
                  </Box>
                }
              />
              <Tooltip title={content.status === 'locked' ? 'Content locked' : 'Start learning'}>
                <IconButton
                  edge="end"
                  disabled={content.status === 'locked'}
                  color={getStatusColor(content.status)}
                >
                  {content.status === 'locked' ? <Lock /> : <PlayCircle />}
                </IconButton>
              </Tooltip>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default CurrentModule; 