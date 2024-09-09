import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, Grid, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import useWorkspaceList from '../Hooks/useworkspaceList';

const WorkspaceList = () => {
  const { workspaces, createWorkspace, deleteWorkspace, error, loading } = useWorkspaceList();
  const [openDialog, setOpenDialog] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [workspaceToDelete, setWorkspaceToDelete] = useState(null);

  const handleAddWorkspace = async () => {
    try {
      await createWorkspace(newWorkspaceName);
      setOpenDialog(false);
      setNewWorkspaceName('');
    } catch (error) {
      console.error('Error adding workspace:', error);
    }
  };

  const handleDeleteWorkspace = async (workspaceId) => {
    try {
      await deleteWorkspace(workspaceId);
      setWorkspaceToDelete(null);
    } catch (error) {
      console.error('Error deleting workspace:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Workspaces
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpenDialog(true)}
        sx={{ mb: 2 }}
        >
        Add Workspace
      </Button>
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2}>
        {workspaces.map(workspace => (
          <Grid item xs={12} sm={6} md={4} key={workspace._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{workspace.name}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href={`/workspace/${workspace._id}`}
                  sx={{ mr: 1 }}
                >
                  View Details
                </Button>
                <IconButton
                  color="error"
                  onClick={() => setWorkspaceToDelete(workspace._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Workspace</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Workspace Name"
            fullWidth
            value={newWorkspaceName}
            onChange={(e) => setNewWorkspaceName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddWorkspace} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={!!workspaceToDelete}
        onClose={() => setWorkspaceToDelete(null)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this workspace?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWorkspaceToDelete(null)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteWorkspace(workspaceToDelete)}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default WorkspaceList;
