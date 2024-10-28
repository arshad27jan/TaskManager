import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Helper function to determine color for status chips
const getStatusColor = (status) => {
  switch (status) {
    case 'Pending':
      return { backgroundColor: '#FFE6E6', color: '#D32F2F' };
    case 'In Progress':
      return { backgroundColor: '#FFF4E6', color: '#FFA726' };
    case 'Completed':
      return { backgroundColor: '#E6FFE6', color: '#388E3C' };
    default:
      return { backgroundColor: '#f5f5f5', color: '#333' };
  }
};

function TaskList({ tasks, setTasks, filterStatus, sortDirection, searchQuery, setSelectedTask }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleOpenDialog = (task) => {
    setTaskToDelete(task);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setTaskToDelete(null);
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    const updatedTasks = tasks.filter((task) => task.id !== taskToDelete.id);
    setTasks(updatedTasks);
    handleCloseDialog();
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  const filteredTasks = tasks
    .filter((task) =>
      (!filterStatus || task.status === filterStatus) &&
      (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       task.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) =>
      sortDirection === 'asc'
        ? a.dueDate.localeCompare(b.dueDate)
        : b.dueDate.localeCompare(a.dueDate)
    );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="taskList">
        {(provided) => (
          <Box ref={provided.innerRef} {...provided.droppableProps}>
            {filteredTasks.map((task, index) => {
              const statusStyles = getStatusColor(task.status);
              return (
                <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
                  {(provided) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      variant="outlined"
                      sx={{
                        mb: 2,
                        p: 2,
                        borderRadius: 3,
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        borderLeft: `5px solid ${statusStyles.color}`,
                        transition: 'transform 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.02)',
                          boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.15)',
                        },
                      }}
                    >
                      <CardContent sx={{ paddingBottom: '16px !important' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {task.title}
                          </Typography>
                          <Chip
                            label={task.status}
                            sx={{
                              ...statusStyles,
                              fontWeight: 500,
                              fontSize: '0.875rem',
                              borderRadius: 1,
                              paddingX: 1,
                            }}
                          />
                        </Box>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1.5 }}>
                          {task.description}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                          Due: {task.dueDate}
                        </Typography>
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                          <Button
                            variant="outlined"
                            color="secondary"
                            size="small"
                            onClick={() => handleOpenDialog(task)}
                            sx={{
                              fontSize: '0.75rem',
                              fontWeight: 500,
                              paddingX: 1.5,
                              borderRadius: 2,
                            }}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => setSelectedTask(task)}
                            sx={{
                              fontSize: '0.75rem',
                              fontWeight: 500,
                              paddingX: 2,
                              borderRadius: 2,
                              color: '#ffffff',
                            }}
                          >
                            Edit
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>

      {/* Confirmation Dialog for Deletion */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the task "{taskToDelete?.title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </DragDropContext>
  );
}

export default TaskList;
