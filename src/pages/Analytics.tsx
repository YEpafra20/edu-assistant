import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  TrendingUp,
  Assessment,
  Group,
  EmojiEvents,
} from '@mui/icons-material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import CurrentModule, { CurrentModuleProps } from '../components/student/CurrentModule';
import LearningProgress, { LearningProgressProps } from '../components/student/LearningProgress';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const performanceData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
  datasets: [
    {
      label: 'Class Average',
      data: [75, 78, 82, 85, 88],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
    {
      label: 'Individual Performance',
      data: [70, 75, 80, 85, 90],
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Performance Over Time',
    },
  },
};

const metrics = [
  {
    title: 'Overall Progress',
    value: '85%',
    icon: <TrendingUp />,
    color: '#4CAF50',
  },
  {
    title: 'Completed Assessments',
    value: '12/15',
    icon: <Assessment />,
    color: '#2196F3',
  },
  {
    title: 'Class Participation',
    value: '92%',
    icon: <Group />,
    color: '#FF9800',
  },
  {
    title: 'Achievement Rate',
    value: '78%',
    icon: <EmojiEvents />,
    color: '#9C27B0',
  },
];

// CurrentModule data
const currentModuleData: CurrentModuleProps = {
  moduleTitle: 'Advanced Mathematics',
  moduleDescription: 'This module covers advanced mathematical concepts including calculus, linear algebra, and differential equations. Students will learn to solve complex problems and apply mathematical principles to real-world scenarios.',
  overallProgress: 65,
  instructor: 'Dr. Sarah Johnson',
  lastUpdated: 'March 20, 2024',
  contents: [
    {
      id: '1',
      title: 'Introduction to Calculus',
      type: 'video' as const,
      duration: '45 mins',
      status: 'completed' as const,
      progress: 100,
      difficulty: 'medium' as const,
      points: 10,
    },
    {
      id: '2',
      title: 'Limits and Continuity',
      type: 'reading' as const,
      duration: '30 mins',
      status: 'completed' as const,
      progress: 100,
      difficulty: 'easy' as const,
      points: 5,
    },
    {
      id: '3',
      title: 'Derivatives Quiz',
      type: 'quiz' as const,
      duration: '20 mins',
      status: 'in-progress' as const,
      progress: 60,
      difficulty: 'hard' as const,
      points: 15,
      dueDate: 'March 25, 2024',
    },
  ],
};

// LearningProgress data
const learningProgressData: LearningProgressProps = {
  metrics: [
    {
      label: 'Quiz Scores',
      value: 85,
      target: 100,
      unit: 'points',
      color: 'primary' as const,
      trend: 5,
    },
    {
      label: 'Assignment Completion',
      value: 12,
      target: 15,
      unit: 'assignments',
      color: 'success' as const,
      trend: 2,
    },
    {
      label: 'Study Hours',
      value: 25,
      target: 30,
      unit: 'hours',
      color: 'warning' as const,
      trend: -3,
    },
    {
      label: 'Participation',
      value: 90,
      target: 100,
      unit: '%',
      color: 'success' as const,
      trend: 0,
    },
  ],
  achievements: [
    {
      id: '1',
      title: 'Perfect Quiz Score',
      description: 'Achieved 100% in the Calculus Quiz',
      date: 'March 15, 2024',
      type: 'achievement' as const,
      points: 50,
    },
    {
      id: '2',
      title: 'Weekly Streak',
      description: 'Completed all assignments for 5 consecutive weeks',
      date: 'March 18, 2024',
      type: 'milestone' as const,
      points: 100,
    },
    {
      id: '3',
      title: 'Advanced Mathematics Certificate',
      description: 'Completed all modules in Advanced Mathematics',
      date: 'March 20, 2024',
      type: 'certificate' as const,
      points: 200,
    },
  ],
  studyTime: '25 hours',
  completedModules: 8,
  totalModules: 12,
  streak: 5,
  nextMilestone: 'Complete 3 more assignments to earn the "Consistent Learner" badge',
};

const Analytics = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Analytics Dashboard
      </Typography>

      <Grid container spacing={3}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  bgcolor: `${metric.color}20`,
                  p: 1,
                  borderRadius: 1,
                }}
              >
                {React.cloneElement(metric.icon, { sx: { color: metric.color } })}
              </Box>
              <Box>
                <Typography variant="h6">{metric.value}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {metric.title}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Paper sx={{ p: 3, height: '400px' }}>
            {isClient && <Line options={options} data={performanceData} />}
          </Paper>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <CurrentModule {...currentModuleData} />
          </Grid>
          <Grid item xs={12} md={4}>
            <LearningProgress {...learningProgressData} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics; 