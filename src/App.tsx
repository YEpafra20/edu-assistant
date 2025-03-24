import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import QuizGenerator from './pages/QuizGenerator';
import Assessment from './pages/Assessment';
import Chat from './pages/Chat';
import Analytics from './pages/Analytics';
import Learning from './pages/Learning';
import Progress from './pages/Progress';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/quiz/generate" element={<QuizGenerator />} />
          <Route path="/assessments" element={<Assessment />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
