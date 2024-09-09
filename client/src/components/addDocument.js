import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const AddDocument = ({ createDocument, workspaceId, onDocumentAdded, closeDialog }) => {
  const [documentName, setDocumentName] = useState('');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !documentName.trim()) {
      alert('File and document name are required');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('documentName', documentName); // Document name
      formData.append('tags', tags);                // Tags
      formData.append('file', file);                // File itself

      // Use the passed createDocument function from parent
      const response = await createDocument(formData, workspaceId);

      onDocumentAdded(response.data); // Notify parent about the new document
      setDocumentName('');            // Reset fields
      setTags('');
      setFile(null);
      closeDialog();                  // Close the dialog after adding document
    } catch (error) {
      setError('Failed to upload document');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Add New Document
      </Typography>
      <TextField
        label="Document Name"
        value={documentName}
        onChange={(e) => setDocumentName(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
        margin="normal"
      />
      <input
        type="file"
        onChange={handleFileChange}
        required
        style={{ margin: '16px 0' }}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" color="primary" type="submit">
        Add Document
      </Button>
    </form>
  );
};

export default AddDocument;
