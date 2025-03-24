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
  Grid,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Chip,
  Button,
  Stack,
} from '@mui/material';
import {
  EmojiEvents,
  School,
  MilitaryTech,
  WorkspacePremium,
  TrendingUp,
  AccessTime,
  Star,
  CalendarToday,
  Timer,
  Speed,
  Psychology,
  Group,
} from '@mui/icons-material';

export interface ProgressMetric {
  label: string;
  value: number;
  target: number;
  unit: string;
  color: 'primary' | 'success' | 'error' | 'warning';
  trend?: number;
  icon?: React.ReactNode;
  description?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'achievement' | 'milestone' | 'certificate';
  points?: number;
  icon?: React.ReactNode;
  progress?: number;
}

export interface LearningProgressProps {
  metrics: ProgressMetric[];
  achievements: Achievement[];
  studyTime: string;
  completedModules: number;
  totalModules: number;
  streak: number;
  nextMilestone: string;
  weeklyGoal?: number;
  currentWeekProgress?: number;
  learningStyle?: string;
  focusAreas?: string[];
  recommendedActions?: string[];
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
  streak,
  nextMilestone,
  weeklyGoal,
  currentWeekProgress,
  learningStyle,
  focusAreas,
  recommendedActions,
}) => {
  const moduleProgress = (completedModules / totalModules) * 100;

  return (
    <Paper sx={{ p: 3 }}>
      {/* Quick Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTime sx={{ color: '#2196F3' }} />
                <Typography variant="h6">{studyTime}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Study Time This Week
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Star sx={{ color: '#FFD700' }} />
                <Typography variant="h6">{streak} days</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Learning Streak
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Weekly Progress */}
      {weeklyGoal && currentWeekProgress !== undefined && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Weekly Progress
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <LinearProgress
                variant="determinate"
                value={(currentWeekProgress / weeklyGoal) * 100}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              {currentWeekProgress}/{weeklyGoal} hours
            </Typography>
          </Box>
        </Box>
      )}

      {/* Learning Style */}
      {learningStyle && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Learning Style
          </Typography>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Psychology sx={{ color: '#9C27B0' }} />
                <Typography variant="body1">{learningStyle}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Focus Areas */}
      {focusAreas && focusAreas.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Focus Areas
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {focusAreas.map((area) => (
              <Chip
                key={area}
                label={area}
                color="primary"
                variant="outlined"
              />
            ))}
          </Stack>
        </Box>
      )}

      {/* Progress Metrics */}
      <Typography variant="h6" gutterBottom>
        Learning Progress
      </Typography>
      <Box sx={{ mb: 3 }}>
        {metrics.map((metric) => (
          <Box key={metric.label} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {metric.icon || <TrendingUp />}
                <Typography variant="body2" color="text.secondary">
                  {metric.label}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {metric.value} / {metric.target} {metric.unit}
                </Typography>
                {metric.trend && (
                  <Tooltip title={`${metric.trend > 0 ? '+' : ''}${metric.trend}% from last week`}>
                    <TrendingUp
                      sx={{
                        color: metric.trend > 0 ? '#4CAF50' : '#F44336',
                        fontSize: 16,
                      }}
                    />
                  </Tooltip>
                )}
              </Box>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(metric.value / metric.target) * 100}
              color={metric.color}
              sx={{ height: 8, borderRadius: 4 }}
            />
            {metric.description && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                {metric.description}
              </Typography>
            )}
          </Box>
        ))}
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
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Next milestone: {nextMilestone}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Recommended Actions */}
      {recommendedActions && recommendedActions.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Recommended Actions
          </Typography>
          <List>
            {recommendedActions.map((action, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <Speed sx={{ color: '#FF9800' }} />
                </ListItemIcon>
                <ListItemText primary={action} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Recent Achievements */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Recent Achievements
        </Typography>
        <List>
          {achievements.map((achievement) => (
            <ListItem key={achievement.id}>
              <ListItemIcon>
                {achievement.icon || getAchievementIcon(achievement.type)}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle2">
                      {achievement.title}
                    </Typography>
                    {achievement.points && (
                      <Chip
                        label={`+${achievement.points} points`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    )}
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {achievement.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {achievement.date}
                    </Typography>
                    {achievement.progress !== undefined && (
                      <Box sx={{ mt: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={achievement.progress}
                          sx={{ height: 4, borderRadius: 2 }}
                        />
                      </Box>
                    )}
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