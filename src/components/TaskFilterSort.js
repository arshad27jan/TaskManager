import React from 'react';
import { Box, TextField, MenuItem, Grid } from '@mui/material';

function TaskFilterSort({ filterStatus, setFilterStatus, sortDirection, setSortDirection, searchQuery, setSearchQuery }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
      <Grid container spacing={2} alignItems="center">
        {/* Search Box */}
        <Grid item xs={12} md={4}>
          <TextField
            label="Search Tasks"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or description"
            fullWidth
          />
        </Grid>

        {/* Filter by Status */}
        <Grid item xs={6} md={4}>
          <TextField
            select
            label="Filter by Status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </TextField>
        </Grid>

        {/* Sort by Due Date */}
        <Grid item xs={6} md={4}>
          <TextField
            select
            label="Sort by Due Date"
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value)}
            fullWidth
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TaskFilterSort;
