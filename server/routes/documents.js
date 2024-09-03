import express from 'express';

import {
  uploadDocument,
  getDocumentById,
  updateDocument,
  downloadDocument,
  softDeleteDocument,
  previewDocument,
  listDocumentsByWorkspace,
  listDocumentsByUserProfile,
  searchDocuments,
  getDocumentMetadata
} from '../controller/documentsController.js';

import verifyToken from '../Middleware/authMiddleware.js';

const router = express.Router();

// Middleware to check document ownership could be added here if needed

router.use(verifyToken)

// Route for searching documents
router.get('/search', searchDocuments);

// Route for listing documents by user profile
router.get('/profile', listDocumentsByUserProfile);

// Route for uploading a document
router.post('/:workspaceId', uploadDocument);

// Route for getting a document by ID
router.get('/:documentId', getDocumentById);

// Route for updating a document
router.put('/:documentId', updateDocument);

// Route for downloading a document
router.get('/:documentId/download', downloadDocument);

// Route for soft deleting a document
router.delete('/:documentId', softDeleteDocument);

// Route for previewing a document
router.get('/:documentId/preview', previewDocument);

// Route for listing documents by workspace
router.get('/workspace/:workspaceId', listDocumentsByWorkspace);

// Route for getting document metadata
router.get('/:documentId/metadata', getDocumentMetadata);

export default router; 



/*import {
  uploadDocument,
  getDocumentById,
  updateDocument,
  downloadDocument,
  softDeleteDocument,
  previewDocument,
  listDocumentsByWorkspace,
  listDocumentsByUserProfile,
  searchDocuments,
  getDocumentMetadata
} from '../controller/documentsController.js';

import verifyToken from '../Middleware/authMiddleware.js';

const router = express.Router();

// Middleware to check document ownership could be added here if needed

router.use(verifyToken)

// Route for uploading a document
router.post('/:workspaceId', uploadDocument);

// Route for getting a document by ID
router.get('/:documentId', getDocumentById);

// Route for updating a document
router.put('/:documentId', updateDocument);

// Route for downloading a document
router.get('/:documentId/download', downloadDocument);

// Route for soft deleting a document
router.delete('/:documentId', softDeleteDocument);

// Route for previewing a document
router.get('/:documentId/preview', previewDocument);

// Route for listing documents by workspace
router.get('/workspace/:workspaceId', listDocumentsByWorkspace);

// Route for listing documents by user profile
router.get('/profile/:userId', listDocumentsByUserProfile);

// Route for getting document metadata
router.get('/:documentId/metadata', getDocumentMetadata);

// Route for searching documents
router.get('/search', searchDocuments);

export default router; */

/*
 import {
  handleFileUpload,
  fetchDocumentById,
  modifyDocument,
  initiateDocumentDownload,
  markDocumentAsDeleted,
  provideDocumentPreview,
  listDocumentsInWorkspace,
  listUserDocuments,
  searchForDocuments,
  fetchDocumentMetadata
} from '../controller/documentsController.js';

import verifyToken from '../Middleware/authMiddleware.js';

const router = express.Router();

// Apply the verifyToken middleware to all routes
router.use(verifyToken);

// Route for uploading a document
router.post('/:workspaceId', handleFileUpload);

// Route for getting a document by ID
router.get('/:documentId', fetchDocumentById);

// Route for updating a document
router.put('/:documentId', modifyDocument);

// Route for downloading a document
router.get('/:documentId/download', initiateDocumentDownload);

// Route for soft deleting a document
router.delete('/:documentId', markDocumentAsDeleted);

// Route for previewing a document
router.get('/:documentId/preview', provideDocumentPreview);

// Route for listing documents by workspace
router.get('/workspace/:workspaceId', listDocumentsInWorkspace);

// Route for listing documents by user profile
router.get('/profile/:userId', listUserDocuments);

// Route for getting document metadata
router.get('/:documentId/metadata', fetchDocumentMetadata);

// Route for searching documents
router.get('/search', searchForDocuments);

export default router; */
