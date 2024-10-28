import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem } from '@mui/material';

function TaskForm({ addTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');
  const [errors, setErrors] = useState({ title: false, dueDate: false });

  const validateForm = () => {
    setErrors({
      title: !title.trim(),
      dueDate: !dueDate.trim(),
    });
    return title.trim() && dueDate.trim();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newTask = {
        id: Date.now(), // Generate a unique ID
        title,
        description,
        dueDate,
        status,
      };
      addTask(newTask); // Pass newTask to addTask function in App
      // Clear the form fields
      setTitle('');
      setDescription('');
      setDueDate('');
      setStatus('Pending');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
      <TextField
        label="Title"
        required
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={errors.title}
        helperText={errors.title ? 'Title is required' : ''}
      />
      <TextField
        label="Description"
        fullWidth
        margin="normal"
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Due Date"
        type="date"
        required
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        error={errors.dueDate}
        helperText={errors.dueDate ? 'Due Date is required' : ''}
      />
      <TextField
        label="Status"
        select
        fullWidth
        margin="normal"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
      </TextField>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Add Task
      </Button>
    </Box>
  );
}

export default TaskForm;
