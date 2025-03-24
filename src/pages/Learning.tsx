import React from 'react';
import { Box, Container, Typography, Paper, Grid, Card, CardContent, Button, List, ListItem, ListItemText, ListItemIcon, Chip } from '@mui/material';
import {
  School,
  Assignment,
  EmojiEvents,
  AccessTime,
  Star,
  Timer,
  TrendingUp,
  VideoLibrary,
  MenuBook,
  Quiz,
  Code,
} from '@mui/icons-material';

const Learning: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" gutterBottom>
          Learning Dashboard
        </Typography>

        <Grid container spacing={3}>
          {/* Current Course */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Current Course
              </Typography>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <School sx={{ fontSize: 40, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="h6">Advanced React Patterns</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Dr. Sarah Chen • 75% Complete
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Typography variant="subtitle1" gutterBottom>
                Course Content
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <VideoLibrary sx={{ color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Custom Hooks Deep Dive"
                    secondary={
                      <Box component="span">
                        Duration: 45 mins • Status: Completed
                      </Box>
                    }
                  />
                  <Chip label="Video" color="primary" size="small" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <MenuBook sx={{ color: 'success.main' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Performance Optimization"
                    secondary={
                      <Box component="span">
                        Duration: 30 mins • Status: In Progress
                      </Box>
                    }
                  />
                  <Chip label="Reading" color="success" size="small" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Quiz sx={{ color: 'warning.main' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="State Management Patterns"
                    secondary={
                      <Box component="span">
                        Duration: 20 mins • Status: Pending
                      </Box>
                    }
                  />
                  <Chip label="Quiz" color="warning" size="small" />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Learning Stats */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Learning Stats
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <AccessTime sx={{ color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Study Time"
                    secondary={
                      <Box component="span">
                        25 hours this week
                      </Box>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Star sx={{ color: 'warning.main' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Points Earned"
                    secondary={
                      <Box component="span">
                        450 points
                      </Box>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <TrendingUp sx={{ color: 'success.main' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Progress"
                    secondary={
                      <Box component="span">
                        75% overall completion
                      </Box>
                    }
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Learning; 