import React, { useState, useEffect } from 'react';
import { Container, Typography, CssBaseline, Box, Divider, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilterSort from './components/TaskFilterSort';
import EditTaskModal from './components/EditTaskModal';

// Create an industrial-standard theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1565c0',
      light: '#5e92f3',
      dark: '#003c8f',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#455a64',
      light: '#718792',
      dark: '#1c313a',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: 'Nanum Gothic Coding, monospace',
    h4: {
      fontWeight: 700,
      color: '#003c8f',
      fontSize: '1.8rem',
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: '1rem',
      color: '#718792',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
      color: '#333333',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
        containedPrimary: {
          backgroundColor: '#1565c0',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#003c8f',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '16px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#f5f5f5',
          borderRadius: 4,
        },
      },
    },
  },
});

function App() {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false); // Modal state

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => setTasks([...tasks, task]);

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  const handleOpenCreateTaskModal = () => setIsCreateTaskModalOpen(true);
  const handleCloseCreateTaskModal = () => setIsCreateTaskModalOpen(false);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Box sx={{ textAlign: 'center', mb: 4, mt: 2 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              letterSpacing: 1.2,
            }}
          >
            Task Management Dashboard
          </Typography>
          <Divider sx={{ bgcolor: theme.palette.primary.light, height: 2, width: '60%', mx: 'auto', my: 1 }} />
          <Typography
            variant="subtitle1"
            component="p"
            sx={{
              fontStyle: 'italic',
              color: theme.palette.secondary.light,
            }}
          >
            Organize and prioritize your tasks effectively.
          </Typography>
        </Box>

        {/* Create Task Button */}
        <Box sx={{ textAlign: 'right', mb: 2 }}>
          <Button variant="contained" color="primary" onClick={handleOpenCreateTaskModal}>
            Create Task
          </Button>
        </Box>

        <TaskFilterSort
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <DragDropContext onDragEnd={handleDragEnd}>
          <TaskList
            tasks={tasks}
            setTasks={setTasks}
            filterStatus={filterStatus}
            sortDirection={sortDirection}
            searchQuery={searchQuery}
            setSelectedTask={setSelectedTask}
          />
        </DragDropContext>

        {/* Create Task Modal */}
        <Dialog open={isCreateTaskModalOpen} onClose={handleCloseCreateTaskModal} maxWidth="sm" fullWidth>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogContent>
            <TaskForm addTask={(task) => {
              addTask(task);
              handleCloseCreateTaskModal(); // Close the modal after task creation
            }} />
          </DialogContent>
        </Dialog>

        {/* Edit Task Modal */}
        {selectedTask && (
          <EditTaskModal
            task={selectedTask}
            updateTask={updateTask}
            setSelectedTask={setSelectedTask}
          />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
