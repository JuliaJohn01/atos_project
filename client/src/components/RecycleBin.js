import React from 'react';
import { Container, Typography, Card, CardContent, Grid, IconButton } from '@mui/material';
import { Restore as RestoreIcon, DeleteForever as DeleteForeverIcon } from '@mui/icons-material';
import useDocumentList from '../Hooks/useDocumentList'; // Import custom hook

const RecycleBin = () => {
  const { deletedDocuments, restoreDocument, permanentlyDeleteDocument } = useDocumentList(); // Ensure deletedDocuments defaults to an empty array

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Recycle Bin
      </Typography>

      <Grid container spacing={2}>
        {deletedDocuments.length > 0 ? (
          deletedDocuments.map((document) => (
            <Grid item xs={12} sm={6} md={4} key={document._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{document.name}</Typography>
                  <IconButton
                    color="primary"
                    onClick={() => restoreDocument(document._id)}
                  >
                    <RestoreIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => permanentlyDeleteDocument(document._id)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No deleted documents found.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default RecycleBin;
