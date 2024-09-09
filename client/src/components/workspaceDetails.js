import React, { useState } from 'react';
import DocumentList from './DocumentList';
import AddDocument from './addDocument';

const WorkspaceDetails = ({ workspaceId }) => {
  const [documents, setDocuments] = useState([]);

  // Handler when a new document is added
  const handleDocumentAdded = (newDocument) => {
    setDocuments((prevDocuments) => [...prevDocuments, newDocument]);
  };

  return (
    <div>
      <h1>Workspace Details</h1>
      {/* <AddDocument onDocumentAdded={handleDocumentAdded} /> */}
      <DocumentList workspaceId={workspaceId} />
    </div>
  );
};

export default WorkspaceDetails;
