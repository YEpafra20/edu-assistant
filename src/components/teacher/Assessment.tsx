import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
  Card,
  CardContent,
  CardActions,
  Menu,
  SelectChangeEvent,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Add,
  Delete,
  Edit,
  Save,
  Close,
  Timer,
  Assessment,
  Visibility,
  VisibilityOff,
  DragIndicator,
  MoreVert,
  Assignment,
} from '@mui/icons-material';

interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
  points: number;
  required: boolean;
}

interface AssessmentData {
  id: string;
  title: string;
  description: string;
  course: string;
  duration: number;
  dueDate: string;
  questions: Question[];
  settings: {
    allowLateSubmission: boolean;
    showResults: boolean;
    randomizeQuestions: boolean;
    timeLimit: boolean;
  };
  type: 'quiz' | 'assignment' | 'project';
  status: 'draft' | 'published' | 'completed';
  courseId: string;
}

const AssessmentComponent: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentData | null>(null);
  const [assessments, setAssessments] = useState<AssessmentData[]>([
    {
      id: '1',
      title: 'React Fundamentals Quiz',
      description: 'Test your knowledge of React basics',
      course: 'mathematics',
      duration: 60,
      dueDate: '2024-03-30',
      questions: [],
      settings: {
        allowLateSubmission: false,
        showResults: true,
        randomizeQuestions: false,
        timeLimit: true,
      },
      type: 'quiz',
      status: 'published',
      courseId: '1',
    },
    {
      id: '2',
      title: 'Project Phase 1',
      description: 'Complete the first phase of your project',
      course: 'mathematics',
      duration: 60,
      dueDate: '2024-04-05',
      questions: [],
      settings: {
        allowLateSubmission: false,
        showResults: true,
        randomizeQuestions: false,
        timeLimit: true,
      },
      type: 'project',
      status: 'draft',
      courseId: '1',
    },
  ]);

  const [formData, setFormData] = useState<Partial<AssessmentData>>({
    title: '',
    description: '',
    course: 'mathematics',
    duration: 60,
    dueDate: '',
    type: 'assignment',
    status: 'draft',
    courseId: '1',
    settings: {
      allowLateSubmission: false,
      showResults: false,
      randomizeQuestions: false,
      timeLimit: false,
    },
  });

  const [activeTab, setActiveTab] = useState(0);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [questionType, setQuestionType] = useState<Question['type']>('multiple-choice');

  const handleOpenDialog = (assessment?: AssessmentData) => {
    if (assessment) {
      setFormData(assessment);
      setSelectedAssessment(assessment);
    } else {
      setFormData({
        title: '',
        description: '',
        course: 'mathematics',
        duration: 60,
        dueDate: '',
        type: 'assignment',
        status: 'draft',
        courseId: '1',
        settings: {
          allowLateSubmission: false,
          showResults: false,
          randomizeQuestions: false,
          timeLimit: false,
        },
      });
      setSelectedAssessment(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAssessment(null);
    setFormData({
      title: '',
      description: '',
      course: 'mathematics',
      duration: 60,
      dueDate: '',
      type: 'assignment',
      status: 'draft',
      courseId: '1',
      settings: {
        allowLateSubmission: false,
        showResults: false,
        randomizeQuestions: false,
        timeLimit: false,
      },
    });
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, assessment: AssessmentData) => {
    setAnchorEl(event.currentTarget);
    setSelectedAssessment(assessment);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAssessment(null);
  };

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (selectedAssessment) {
      // Update existing assessment
      setAssessments((prev) =>
        prev.map((assessment) =>
          assessment.id === selectedAssessment.id
            ? { ...assessment, ...formData }
            : assessment
        )
      );
    } else {
      // Create new assessment
      const newAssessment: AssessmentData = {
        ...formData as AssessmentData,
        id: Date.now().toString(),
      };
      setAssessments((prev) => [...prev, newAssessment]);
    }
    handleCloseDialog();
  };

  const handleDelete = () => {
    if (selectedAssessment) {
      setAssessments((prev) =>
        prev.filter((assessment) => assessment.id !== selectedAssessment.id)
      );
    }
    handleMenuClose();
  };

  const getStatusColor = (status: AssessmentData['status']) => {
    switch (status) {
      case 'published':
        return 'success';
      case 'draft':
        return 'warning';
      case 'completed':
        return 'info';
      default:
        return 'default';
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type: questionType,
      question: '',
      options: questionType === 'multiple-choice' ? ['', '', '', ''] : undefined,
      points: 1,
      required: true,
    };
    setFormData((prev) => ({
      ...prev,
      questions: [...(prev.questions || []), newQuestion],
    }));
    setEditingQuestion(newQuestion);
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setQuestionType(question.type);
  };

  const handleDeleteQuestion = (questionId: string) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions?.filter((q) => q.id !== questionId) || [],
    }));
  };

  const handleSaveQuestion = () => {
    if (editingQuestion) {
      setFormData((prev) => ({
        ...prev,
        questions: prev.questions?.map((q) =>
          q.id === editingQuestion.id ? editingQuestion : q
        ) || [],
      }));
    }
    setEditingQuestion(null);
  };

  const renderQuestionForm = () => (
    <Box sx={{ mt: 2 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Question Type</InputLabel>
        <Select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value as Question['type'])}
          label="Question Type"
        >
          <MenuItem value="multiple-choice">Multiple Choice</MenuItem>
          <MenuItem value="true-false">True/False</MenuItem>
          <MenuItem value="short-answer">Short Answer</MenuItem>
          <MenuItem value="essay">Essay</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Question"
        multiline
        rows={3}
        value={editingQuestion?.question || ''}
        onChange={(e) =>
          setEditingQuestion((prev) => ({ ...prev!, question: e.target.value }))
        }
        sx={{ mb: 2 }}
      />

      {questionType === 'multiple-choice' && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Options
          </Typography>
          {(editingQuestion?.options || ['', '', '', '']).map((option, index) => (
            <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <TextField
                fullWidth
                label={`Option ${index + 1}`}
                value={option}
                onChange={(e) => {
                  const newOptions = [...(editingQuestion?.options || [])];
                  newOptions[index] = e.target.value;
                  setEditingQuestion((prev) => ({ ...prev!, options: newOptions }));
                }}
              />
              <IconButton
                color="error"
                onClick={() => {
                  const newOptions = (editingQuestion?.options || []).filter(
                    (_, i) => i !== index
                  );
                  setEditingQuestion((prev) => ({ ...prev!, options: newOptions }));
                }}
              >
                <Delete />
              </IconButton>
            </Box>
          ))}
          <Button
            startIcon={<Add />}
            onClick={() => {
              setEditingQuestion((prev) => ({
                ...prev!,
                options: [...(prev?.options || []), ''],
              }));
            }}
          >
            Add Option
          </Button>
        </Box>
      )}

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Points"
          type="number"
          value={editingQuestion?.points || 1}
          onChange={(e) =>
            setEditingQuestion((prev) => ({
              ...prev!,
              points: parseInt(e.target.value),
            }))
          }
        />
        <FormControlLabel
          control={
            <Switch
              checked={editingQuestion?.required || true}
              onChange={(e) =>
                setEditingQuestion((prev) => ({
                  ...prev!,
                  required: e.target.checked,
                }))
              }
            />
          }
          label="Required"
        />
      </Box>
    </Box>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">Assessments</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Create Assessment
        </Button>
      </Box>

      <Grid container spacing={3}>
        {assessments.map((assessment) => (
          <Grid item xs={12} md={6} key={assessment.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {assessment.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {assessment.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Chip
                        label={assessment.type}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Chip
                        label={assessment.status}
                        size="small"
                        color={getStatusColor(assessment.status)}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Due: {new Date(assessment.dueDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <IconButton onClick={(e) => handleMenuClick(e, assessment)}>
                    <MoreVert />
                  </IconButton>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<Assignment />}
                  onClick={() => handleOpenDialog(assessment)}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedAssessment ? 'Edit Assessment' : 'Create New Assessment'}
        </DialogTitle>
        <DialogContent>
          <Tabs value={activeTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tab label="Basic Info" />
            <Tab label="Questions" />
            <Tab label="Settings" />
          </Tabs>

          <Box sx={{ mt: 2 }}>
            {activeTab === 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTextFieldChange(e)}
                  fullWidth
                />
                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleTextFieldChange(e)}
                  multiline
                  rows={3}
                  fullWidth
                />
                <TextField
                  label="Due Date"
                  name="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTextFieldChange(e)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    name="type"
                    value={formData.type}
                    label="Type"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="quiz">Quiz</MenuItem>
                    <MenuItem value="assignment">Assignment</MenuItem>
                    <MenuItem value="project">Project</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={formData.status}
                    label="Status"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="published">Published</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}

            {activeTab === 1 && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Questions</Typography>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleAddQuestion}
                  >
                    Add Question
                  </Button>
                </Box>

                {editingQuestion ? (
                  <Box>
                    {renderQuestionForm()}
                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                      <Button
                        variant="contained"
                        onClick={handleSaveQuestion}
                        startIcon={<Save />}
                      >
                        Save Question
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setEditingQuestion(null)}
                        startIcon={<Close />}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <List>
                    {formData.questions?.map((question, index) => (
                      <React.Fragment key={question.id}>
                        <ListItem>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <DragIndicator color="action" />
                                <Typography variant="subtitle1">
                                  Question {index + 1}
                                </Typography>
                                <Chip
                                  label={question.type}
                                  size="small"
                                  color="primary"
                                  sx={{ ml: 1 }}
                                />
                              </Box>
                            }
                            secondary={
                              <Box>
                                <Typography variant="body2">{question.question}</Typography>
                                {question.type === 'multiple-choice' && (
                                  <Box sx={{ mt: 1 }}>
                                    {question.options?.map((option, i) => (
                                      <Typography key={i} variant="body2" color="text.secondary">
                                        • {option}
                                      </Typography>
                                    ))}
                                  </Box>
                                )}
                                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                  <Chip
                                    label={`${question.points} points`}
                                    size="small"
                                    color="secondary"
                                  />
                                  {question.required && (
                                    <Chip label="Required" size="small" color="primary" />
                                  )}
                                </Box>
                              </Box>
                            }
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              onClick={() => handleEditQuestion(question)}
                              sx={{ mr: 1 }}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              edge="end"
                              onClick={() => handleDeleteQuestion(question.id)}
                            >
                              <Delete />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                        {index < (formData.questions?.length || 0) - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                )}
              </Box>
            )}

            {activeTab === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Assessment Settings
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.settings?.allowLateSubmission ?? false}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            settings: {
                              allowLateSubmission: e.target.checked,
                              showResults: prev.settings?.showResults ?? false,
                              randomizeQuestions: prev.settings?.randomizeQuestions ?? false,
                              timeLimit: prev.settings?.timeLimit ?? false,
                            },
                          }))
                        }
                      />
                    }
                    label="Allow Late Submission"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.settings?.showResults ?? false}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            settings: {
                              allowLateSubmission: prev.settings?.allowLateSubmission ?? false,
                              showResults: e.target.checked,
                              randomizeQuestions: prev.settings?.randomizeQuestions ?? false,
                              timeLimit: prev.settings?.timeLimit ?? false,
                            },
                          }))
                        }
                      />
                    }
                    label="Show Results to Students"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.settings?.randomizeQuestions ?? false}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            settings: {
                              allowLateSubmission: prev.settings?.allowLateSubmission ?? false,
                              showResults: prev.settings?.showResults ?? false,
                              randomizeQuestions: e.target.checked,
                              timeLimit: prev.settings?.timeLimit ?? false,
                            },
                          }))
                        }
                      />
                    }
                    label="Randomize Questions"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.settings?.timeLimit ?? false}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            settings: {
                              allowLateSubmission: prev.settings?.allowLateSubmission ?? false,
                              showResults: prev.settings?.showResults ?? false,
                              randomizeQuestions: prev.settings?.randomizeQuestions ?? false,
                              timeLimit: e.target.checked,
                            },
                          }))
                        }
                      />
                    }
                    label="Enable Time Limit"
                  />
                </FormGroup>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedAssessment ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          if (selectedAssessment) {
            handleOpenDialog(selectedAssessment);
          }
          handleMenuClose();
        }}>
          <Edit sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <Delete sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AssessmentComponent; 