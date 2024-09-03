import Document from '../models/Document.js';
import Workspace from '../models/Workspace.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

/*
// Configure Multer for file storage
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const uploadHandler = multer({ storage: storageConfig });

// Middleware to verify user permission for a document
const authorizeDocumentAccess = async (req, res, next) => {
  try {
    const { documentId } = req.params;
    const userId = req.user._id;
    const documentRecord = await Document.findById(documentId);
    if (!documentRecord) return res.status(404).json({ message: 'Document not found' });
    if (documentRecord.owner.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    req.documentRecord = documentRecord;
    next();
  } catch (error) {
    errorResponse(res, error, 'Internal server error');
  }
};

// Helper function for error responses
const errorResponse = (res, error, message) => {
  console.error(error);
  res.status(500).json({ message });
};

// Function to handle file uploads with metadata
export const handleFileUpload = async (req, res) => {
  try {
    const workspaceId = req.params.workspaceId;
    const userId = req.user._id;
    const workspaceRecord = await Workspace.findById(workspaceId);
    if (!workspaceRecord) return res.status(404).json({ message: 'Workspace not found' });

    uploadHandler.single('file')(req, res, async (err) => {
      if (err) return res.status(400).json({ message: err.message });

      const newDocument = new Document({
        workspaceID: workspaceId,
        name: req.file.originalname,
        type: req.file.mimetype,
        owner: userId,
        url: req.file.path,
        metadata: {
          documentName: req.file.originalname,
          type: req.file.mimetype,
          owner: userId,
          version: '1.0',
          tags: req.body.tags ? req.body.tags.split(',') : [],
          accessControls: { read: [userId], write: [userId] },
        },
      });

      await newDocument.save();
      res.status(201).json({ message: 'Document uploaded successfully', document: newDocument });
    });
  } catch (error) {
    errorResponse(res, error, 'Failed to upload document');
  }
};


export const fetchDocumentById = (req, res) => {
  res.status(200).json(req.documentRecord);
};

// Function to modify an existing document
export const modifyDocument = async (req, res) => {
  try {
    const { documentRecord } = req;
    Object.assign(documentRecord, req.body);
    if (req.body.metadata) {
      documentRecord.metadata = { ...documentRecord.metadata, ...req.body.metadata };
    }
    await documentRecord.save();
    res.status(200).json({ message: 'Document updated successfully', document: documentRecord });
  } catch (error) {
    errorResponse(res, error, 'Failed to update document');
  }
};


export const initiateDocumentDownload = async (req, res) => {
  try {
    const { documentRecord } = req;
    if (documentRecord.deletedAt) return res.status(404).json({ message: 'Document has been deleted' });

    documentRecord.downloadCount += 1;
    await documentRecord.save();
    res.sendFile(path.resolve(documentRecord.url), (err) => {
      if (err) return errorResponse(res, err, 'Failed to download document');
    });
  } catch (error) {
    errorResponse(res, error, 'Failed to download document');
  }
};

// Function to mark a document as deleted (soft delete)
export const markDocumentAsDeleted = async (req, res) => {
  try {
    const { documentRecord } = req;
    if (documentRecord.deletedAt) return res.status(404).json({ message: 'Document already deleted' });

    documentRecord.deletedAt = new Date();
    await documentRecord.save();
    res.status(200).json({ message: 'Document successfully deleted' });
  } catch (error) {
    errorResponse(res, error, 'Failed to delete document');
  }
};

// Function to provide a preview of a document
export const provideDocumentPreview = async (req, res) => {
  try {
    const { documentRecord } = req;
    if (documentRecord.deletedAt) return res.status(404).json({ message: 'Document has been deleted' });

    const filePath = path.resolve(documentRecord.url);
    fs.readFile(filePath, (err, data) => {
      if (err) return errorResponse(res, err, 'Failed to read document');
      const base64Data = data.toString('base64');
      res.json({ base64: base64Data });
    });
  } catch (error) {
    errorResponse(res, error, 'Failed to preview document');
  }
};

// Function to list all documents in a workspace
export const listDocumentsInWorkspace = async (req, res) => {
  try {
    const workspaceId = req.params.workspaceId;
    const documents = await Document.find({ workspaceID: workspaceId, deletedAt: null });
    res.status(200).json(documents);
  } catch (error) {
    errorResponse(res, error, 'Failed to fetch documents');
  }
};

// Function to list all documents for a user
export const listUserDocuments = async (req, res) => {
  try {
    const userId = req.user._id;
    const { sortBy = 'name', search = '' } = req.query;
    const query = {
      owner: userId,
      deletedAt: null,
      name: { $regex: search, $options: 'i' },
    };
    const documents = await Document.find(query).sort({ [sortBy]: 1 });
    res.status(200).json(documents);
  } catch (error) {
    errorResponse(res, error, 'Failed to fetch documents');
  }
};

// Function to fetch document metadata
export const fetchDocumentMetadata = (req, res) => {
  res.status(200).json(req.documentRecord.metadata);
};

// Function to search for documents
export const searchForDocuments = async (req, res) => {
  try {
    const { name, type } = req.query;
    const query = { deletedAt: null };
    if (name) query.name = { $regex: name, $options: 'i' };
    if (type) query.type = { $regex: type, $options: 'i' };

    const documents = await Document.find(query);
    res.status(200).json(documents);
  } catch (error) {
    errorResponse(res, error, 'Failed to search documents');
  }
};

// Exporting middleware
export { authorizeDocumentAccess }; */



// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Middleware to check document existence and authorization
const checkDocumentOwnership = async (req, res, next) => {
  try {
    const { documentId } = req.params;
    const userId = req.user._id;
    const document = await Document.findById(documentId);
    if (!document) return res.status(404).json({ message: 'Document not found' });
    if (document.owner.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    req.document = document;
    next();
  } catch (err) {
    handleError(res, err, 'Internal server error');
  }
};

// Error handling helper function
const handleError = (res, err, message) => {
  console.error(err);
  res.status(500).json({ message });
};

// Function to handle document upload with metadata
export const uploadDocument = async (req, res) => {
  try {
    
    const workspaceId = req.params.workspaceId;
    const userId = req.user._id;
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) return res.status(404).json({ message: 'Workspace not found' });

    upload.single('file')(req, res, async (err) => {
      if (err) return res.status(400).json({ message: err.message });

      const document = new Document({
        workspaceID: workspaceId,
        name: req.file.originalname,
        type: req.file.mimetype,
        owner: userId,
        url: req.file.path,
        metadata: {
          documentName: req.file.originalname,
          type: req.file.mimetype,
          owner: userId,
          version: '1.0',
          tags: req.body.tags ? req.body.tags.split(',') : [],
          accessControls: { read: [userId], write: [userId] }
        }
      });

      await document.save();
      res.status(201).json({ message: 'Document uploaded successfully', document });
    });
  } catch (err) {
    handleError(res, err, 'Failed to upload document');
  }
};

// Function to get document by ID with metadata
export const getDocumentById = async (req, res) => {
  try {
    const documentId = req.params.documentId;
    if (!documentId) {
      throw new Error('Please provide a documentId')
    }
    const document = await Document.findById(documentId);

    res.status(200).json(document);
  } catch (err) {
    handleError(res, err, 'Failed to fetch document')
  }
};

// Function to update a document with metadata
export const updateDocument = async (req, res) => {
  try {
    const { document } = req;
    Object.assign(document, req.body);
    if (req.body.metadata) {
      document.metadata = { ...document.metadata, ...req.body.metadata };
    }
    await document.save();
    res.status(200).json({ message: 'Document updated successfully', document });
  } catch (err) {
    handleError(res, err, 'Failed to update document');
  }
};

// Function to download a document
export const downloadDocument = async (req, res) => {
  try {
    const documentId = req.params.documentId;
    const document = await Document.findById(documentId)
    if (document.deletedAt) return res.status(404).json({ message: 'Document has been deleted' });

    const filePath = document.url;

    const filestream = fs.createReadStream(filePath);
    filestream.pipe(res);
  } catch (err) {
    handleError(res, err, 'Failed to download document');
  }
};

// Function for soft deleting a document
export const softDeleteDocument = async (req, res) => {
  try {
    const { documentId } = req.params;
    const document = await Document.findById(documentId);
    if (document.deletedAt) return res.status(404).json({ message: 'Document already deleted' });

    document.deletedAt = new Date();
    await document.save();
    res.status(200).json({ message: 'Document successfully deleted' });
  } catch (err) {
    handleError(res, err, 'Failed to delete document');
  }
};

// Function to preview a document
export const previewDocument = async (req, res) => {
  try {
    const { documentId } = req.params;
    const document = await Document.findById(documentId)
    if (document.deletedAt) return res.status(404).json({ message: 'Document has been deleted' });

    const filePath = path.resolve(document.url);
    fs.readFile(filePath, (err, data) => {
      if (err) return handleError(res, err, 'Failed to read document');
      const base64Data = data.toString('base64');
      res.json({ base64: base64Data });
    });
  } catch (err) {
    handleError(res, err, 'Failed to preview document');
  }
};

// Function to list documents by workspace
export const listDocumentsByWorkspace = async (req, res) => {
  try {
    const workspaceId = req.params.workspaceId;
    const documents = await Document.find({ workspaceID: workspaceId, deletedAt: null });
    res.status(200).json(documents);
  } catch (err) {
    handleError(res, err, 'Failed to fetch documents');
  }
};

// Function to list documents by user profile
export const listDocumentsByUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { sortBy = 'name', search = '' } = req.query;
    const query = {
      owner: userId,
      deletedAt: null,
      name: { $regex: search, $options: 'i' }
    };
    const documents = await Document.find(query).sort({ [sortBy]: 1 });
    res.status(200).json(documents);
  } catch (err) {
    handleError(res, err, 'Failed to fetch documents');
  }
};

// Function to get document metadata
export const getDocumentMetadata = (req, res) => {
  res.status(200).json(req.document.metadata);
};

// Function to search documents
export const searchDocuments = async (req, res) => {
  try {
    const { name, type } = req.query;
    const query = { deletedAt: null };
    if (name) query.name = { $regex: name, $options: 'i' };
    if (type) query.type = { $regex: type, $options: 'i' };

    console.log(query)

    const documents = await Document.find(query);
    res.status(200).json(documents);
  } catch (err) {
    handleError(res, err, 'Failed to search documents');
  }
};

// Exporting middleware
export { checkDocumentOwnership }; 