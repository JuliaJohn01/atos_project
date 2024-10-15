import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const DocumentSearch = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search input and trigger the search function passed from props
  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div>
      <TextField
        label="Search Documents by Name or Type"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{ mt: 2 }}
      >
        Search
      </Button>
    </div>
  );
};

export default DocumentSearch;
