import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const QuizGenerator = () => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [questionCount, setQuestionCount] = useState(5);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  const handleGenerateQuiz = () => {
    // TODO: Implement AI quiz generation
    console.log('Generating quiz with:', { topic, difficulty, questionCount, tags });
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Generate Quiz
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter the topic for quiz generation"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Difficulty Level</InputLabel>
              <Select
                value={difficulty}
                label="Difficulty Level"
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="Number of Questions"
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              inputProps={{ min: 1, max: 20 }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <TextField
                fullWidth
                label="Add Tags"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Enter tags for better quiz generation"
              />
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleAddTag}
                disabled={!newTag}
              >
                Add
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleDeleteTag(tag)}
                  deleteIcon={<Delete />}
                />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={handleGenerateQuiz}
              disabled={!topic}
            >
              Generate Quiz
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default QuizGenerator; 