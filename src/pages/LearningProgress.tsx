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
  Divider,
} from '@mui/material';
import {
  EmojiEvents,
  School,
  MilitaryTech,
  WorkspacePremium,
} from '@mui/icons-material';

export interface ProgressMetric {
  label: string;
  value: number;
  target: number;
  unit: string;
  color: 'primary' | 'success' | 'error' | 'warning';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'achievement' | 'milestone' | 'certificate';
}

export interface LearningProgressProps {
  metrics: ProgressMetric[];
  achievements: Achievement[];
  studyTime: string;
  completedModules: number;
  totalModules: number;
}

const getAchievementIcon = (type: Achievement['type']) => {
  switch (type) {
    case 'achievement':
      return <EmojiEvents sx={{ color: '#FFD700' }} />;
    case 'milestone':
      return <School sx={{ color: '#4CAF50' }} />;
    case 'certificate':
      return <WorkspacePremium sx={{ color: '#2196F3' }} />;
    default:
      return <EmojiEvents sx={{ color: '#FFD700' }} />;
  }
};

const LearningProgress: React.FC<LearningProgressProps> = ({
  metrics,
  achievements,
  studyTime,
  completedModules,
  totalModules,
}) => {
  const moduleProgress = (completedModules / totalModules) * 100;

  return (
    <Paper sx={{ p: 3 }}>
      {/* Progress Metrics */}
      <Typography variant="h6" gutterBottom>
        Learning Progress
      </Typography>
      <Box sx={{ mb: 3 }}>
        {metrics.map((metric) => (
          <Box key={metric.label} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {metric.label}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {metric.value} / {metric.target} {metric.unit}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(metric.value / metric.target) * 100}
              color={metric.color}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Study Time */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Study Time
        </Typography>
        <Typography variant="h4" color="primary">
          {studyTime}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Module Completion */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Module Completion
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <LinearProgress
              variant="determinate"
              value={moduleProgress}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            {completedModules}/{totalModules}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Recent Achievements */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Recent Achievements
        </Typography>
        <List>
          {achievements.map((achievement) => (
            <ListItem key={achievement.id}>
              <ListItemIcon>
                {getAchievementIcon(achievement.type)}
              </ListItemIcon>
              <ListItemText
                primary={achievement.title}
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {achievement.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {achievement.date}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default LearningProgress; 