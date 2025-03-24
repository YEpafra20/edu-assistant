import React from 'react';
import { Box, Container, Typography, Paper, Grid, Card, CardContent, List, ListItem, ListItemText, ListItemIcon, LinearProgress, Chip } from '@mui/material';
import {
  EmojiEvents,
  School,
  TrendingUp,
  AccessTime,
  Star,
  Timer,
  Speed,
  Psychology,
  Group,
  Assignment,
  Quiz,
} from '@mui/icons-material';

const Progress: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" gutterBottom>
          Learning Progress
        </Typography>

        <Grid container spacing={3}>
          {/* Overall Progress */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Overall Progress
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <School sx={{ color: 'primary.main' }} />
                        <Box>
                          <Typography variant="h6">8/12</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Modules Completed
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Star sx={{ color: 'warning.main' }} />
                        <Box>
                          <Typography variant="h6">450</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Points Earned
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Timer sx={{ color: 'info.main' }} />
                        <Box>
                          <Typography variant="h6">25h</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Study Time
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TrendingUp sx={{ color: 'success.main' }} />
                        <Box>
                          <Typography variant="h6">75%</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Overall Progress
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Learning Metrics */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Learning Metrics
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Quiz sx={{ color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Quiz Performance"
                    secondary={
                      <Box component="span">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Box sx={{ flexGrow: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={85}
                              sx={{ height: 8, borderRadius: 4 }}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            85%
                          </Typography>
                        </Box>
                        Average score across all quizzes
                      </Box>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Assignment sx={{ color: 'success.main' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Assignment Completion"
                    secondary={
                      <Box component="span">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Box sx={{ flexGrow: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={80}
                              sx={{ height: 8, borderRadius: 4 }}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            80%
                          </Typography>
                        </Box>
                        Completed assignments on time
                      </Box>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Group sx={{ color: 'info.main' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Participation"
                    secondary={
                      <Box component="span">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Box sx={{ flexGrow: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={90}
                              sx={{ height: 8, borderRadius: 4 }}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            90%
                          </Typography>
                        </Box>
                        Active participation in discussions
                      </Box>
                    }
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Recent Achievements */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Recent Achievements
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <EmojiEvents sx={{ color: 'warning.main' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Perfect Quiz Score"
                    secondary={
                      <Box component="span">
                        Advanced React Patterns Quiz
                      </Box>
                    }
                  />
                  <Chip label="+50" color="success" size="small" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <School sx={{ color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Weekly Streak"
                    secondary={
                      <Box component="span">
                        7 days of consistent learning
                      </Box>
                    }
                  />
                  <Chip label="+100" color="success" size="small" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <TrendingUp sx={{ color: 'success.main' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Project Milestone"
                    secondary={
                      <Box component="span">
                        Completed first major project
                      </Box>
                    }
                  />
                  <Chip label="+200" color="success" size="small" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Progress; 