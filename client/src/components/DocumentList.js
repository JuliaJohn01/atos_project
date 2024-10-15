import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Grid, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, Visibility as VisibilityIcon, Download as DownloadIcon } from '@mui/icons-material';
import useDocumentList from '../Hooks/useDocumentList'; // Import your custom hook
import AddDocument from './addDocument'; // Import AddDocument
import DocumentSearch from './DocumentSearch'; // Import the DocumentSearch component

const DocumentList = () => {
  const { workspaceId } = useParams(); // Assuming you're getting workspaceId here
  const { documents, createDocument, deleteDocument, downloadDocument, previewDocument, searchDocuments } = useDocumentList(workspaceId); // Fetch the document list and functions
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleDocumentAdded = (newDocument) => {
    console.log('New document added:', newDocument);
  };

  const handleDeleteDocument = async (documentId) => {
    try {
      await deleteDocument(documentId);
      setDocumentToDelete(null);
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const handleDownloadDocument = async (documentId) => {
    try {
      await downloadDocument(documentId);
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  const handlePreviewDocument = async (documentId) => {
    try {
      const url = await previewDocument(documentId);
      setPreviewUrl(url);
    } catch (error) {
      console.error('Error previewing document:', error);
    }
  };

  const handleSearch = (query) => {
    searchDocuments(query);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Documents
      </Typography>

      {/* Render DocumentSearch Component */}
      <DocumentSearch onSearch={handleSearch} />
      
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpenAddDialog(true)}
        sx={{ mb: 2, mr: 2 }}
      >
        Add Document
      </Button>

      {/* Move Recycle Bin button here for easier access */}
      <Button
        variant="contained"
        color="secondary"
        component={Link}
        to="/recycle-bin"
        sx={{ mb: 2 }}
      >
        Go to Recycle Bin
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
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handlePreviewDocument(document._id)}
                  startIcon={<VisibilityIcon />}
                  sx={{ mr: 1 }}
                >
                  Preview
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleDownloadDocument(document._id)}
                  startIcon={<DownloadIcon />}
                  sx={{ mr: 1 }}
                >
                  Download
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
            createDocument={createDocument} 
            workspaceId={workspaceId}
            onDocumentAdded={handleDocumentAdded}
            closeDialog={() => setOpenAddDialog(false)}
          />
        </DialogContent>
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

      {previewUrl && (
        <Dialog open={!!previewUrl} onClose={() => setPreviewUrl(null)} maxWidth="md" fullWidth>
          <DialogTitle>Document Preview</DialogTitle>
          <DialogContent>
            <iframe 
              src={previewUrl}
              title="Document Preview"
              style={{ width: '100%', height: '500px' }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPreviewUrl(null)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default DocumentList;
