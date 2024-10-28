import React, { useState } from 'react';
import { Modal, Box, TextField, Button, MenuItem } from '@mui/material';

function EditTaskModal({ task, updateTask, setSelectedTask }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [status, setStatus] = useState(task.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = { ...task, title, description, dueDate, status };
    updateTask(updatedTask);
    setSelectedTask(null);
  };

  return (
    <Modal open={true} onClose={() => setSelectedTask(null)}>
      <Box
        sx={{
          p: 3,
          width: { xs: '90%', sm: '80%', md: '60%', lg: '40%' },
          mx: 'auto',
          mt: '15%',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Title"
            required
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Save Changes
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default EditTaskModal;
