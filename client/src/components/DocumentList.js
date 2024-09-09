import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Grid, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import useDocumentList from '../Hooks/useDocumentList'; // Import your custom hook
import AddDocument from './addDocument';

const DocumentList = () => {
  const { workspaceId } = useParams();
  const { documents, createDocument, deleteDocument } = useDocumentList(workspaceId);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newDocumentName, setNewDocumentName] = useState('');
  const [documentToDelete, setDocumentToDelete] = useState(null);

  const handleAddDocument = async () => {
    if (!newDocumentName.trim()) {
      alert('Document name is required');
      return;
    }
    try {
      await createDocument(newDocumentName);
      setOpenAddDialog(false);
      setNewDocumentName('');
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const handleDocumentAdded = (newDocument) => {
    // Handle newly added document
    console.log('documentADded')
  };

  const handleDeleteDocument = async (documentId) => {
    try {
      await deleteDocument(documentId);
      setDocumentToDelete(null);
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Documents
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpenAddDialog(true)}
        sx={{ mb: 2 }}
      >
        Add Document
      </Button>
      <Grid container spacing={2}>
        {documents.map(document => (
          <Grid item xs={12} sm={6} md={4} key={document._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{document.name}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href={`/document/${document._id}`}
                  sx={{ mr: 1 }}
                >
                  View Details
                </Button>
                <IconButton
                  color="error"
                  onClick={() => setDocumentToDelete(document._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add New Document</DialogTitle>
        <DialogContent>
          <AddDocument 
            onDocumentAdded={handleDocumentAdded} 
            closeDialog={() => setOpenAddDialog(false)} // Function to close dialog
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)} color="primary">
            Cancel
          </Button>
          {/* <Button onClick={handleAddDocument} color="primary">
            Add
          </Button> */}
        </DialogActions>
      </Dialog>
      <Dialog
        open={!!documentToDelete}
        onClose={() => setDocumentToDelete(null)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this document?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDocumentToDelete(null)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteDocument(documentToDelete)}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DocumentList;
