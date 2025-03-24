import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Rating,
} from '@mui/material';
import { CheckCircle, Cancel, Star } from '@mui/icons-material';

interface AssessmentItem {
  id: number;
  question: string;
  answer: string;
  grade: number;
  feedback: string;
}

const Assessment = () => {
  const [assessments, setAssessments] = useState<AssessmentItem[]>([
    {
      id: 1,
      question: "What is the capital of France?",
      answer: "Paris",
      grade: 5,
      feedback: "Correct answer! Well done!",
    },
    {
      id: 2,
      question: "Solve the equation: 2x + 5 = 13",
      answer: "x = 4",
      grade: 4,
      feedback: "Good work! Consider showing your steps next time.",
    },
  ]);

  const [newFeedback, setNewFeedback] = useState('');

  const handleGradeChange = (id: number, newGrade: number) => {
    setAssessments(assessments.map(assessment =>
      assessment.id === id ? { ...assessment, grade: newGrade } : assessment
    ));
  };

  const handleFeedbackChange = (id: number, feedback: string) => {
    setAssessments(assessments.map(assessment =>
      assessment.id === id ? { ...assessment, feedback } : assessment
    ));
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Assessment Management
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Student Submissions
            </Typography>
            <List>
              {assessments.map((assessment) => (
                <ListItem key={assessment.id} divider>
                  <ListItemText
                    primary={assessment.question}
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Answer: {assessment.answer}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Rating
                            value={assessment.grade}
                            onChange={(_, newValue) => handleGradeChange(assessment.id, newValue || 0)}
                            precision={1}
                            emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                          />
                        </Box>
                        <TextField
                          fullWidth
                          multiline
                          rows={2}
                          variant="outlined"
                          size="small"
                          value={assessment.feedback}
                          onChange={(e) => handleFeedbackChange(assessment.id, e.target.value)}
                          placeholder="Add feedback..."
                          sx={{ mt: 1 }}
                        />
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    {assessment.grade >= 4 ? (
                      <Chip
                        icon={<CheckCircle />}
                        label="Passed"
                        color="success"
                        variant="outlined"
                      />
                    ) : (
                      <Chip
                        icon={<Cancel />}
                        label="Failed"
                        color="error"
                        variant="outlined"
                      />
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Assessment Statistics
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                Total Submissions: {assessments.length}
              </Typography>
              <Typography variant="body1">
                Average Grade: {(assessments.reduce((acc, curr) => acc + curr.grade, 0) / assessments.length).toFixed(1)}
              </Typography>
              <Typography variant="body1">
                Pass Rate: {((assessments.filter(a => a.grade >= 4).length / assessments.length) * 100).toFixed(1)}%
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Assessment; 