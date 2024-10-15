import Document from '../models/Document.js';
import Workspace from '../models/Workspace.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';


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
/*export const softDeleteDocument = async (req, res) => {
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
}; */

// Soft delete a document
export const softDeleteDocument = async (req, res) => {
  try {
    const { documentId } = req.params;
    const document = await Document.findById(documentId);
    if (!document) return res.status(404).json({ message: 'Document not found' });

    if (document.deletedAt) return res.status(400).json({ message: 'Document already deleted' });

    document.deletedAt = new Date();
    await document.save();

    res.status(200).json({ message: 'Document soft deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to soft delete document' });
  }
};

// Restore a soft-deleted document
export const restoreDocument = async (req, res) => {
  try {
    const { documentId } = req.params;
    const document = await Document.findById(documentId);
    if (!document) return res.status(404).json({ message: 'Document not found' });

    if (!document.deletedAt) return res.status(400).json({ message: 'Document is not deleted' });

    document.deletedAt = null;
    await document.save();

    res.status(200).json({ message: 'Document restored successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to restore document' });
  }
};

// List soft-deleted documents
export const getDeletedDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ deletedAt: { $ne: null } }); // Find all documents with deletedAt not null
    res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get deleted documents' });
  }
};

// Permanently delete a document
export const permanentlyDeleteDocument = async (req, res) => {
  try {
    const { documentId } = req.params;
    const document = await Document.findByIdAndDelete(documentId);
    if (!document) return res.status(404).json({ message: 'Document not found' });

    res.status(200).json({ message: 'Document permanently deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete document permanently' });
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
    console.log(workspaceId)
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

// Search documents by name or type
export const searchDocuments = async (req, res) => {
  const { query } = req.query; // Search query (passed as a query string)

  try {
    const documents = await Document.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }, // Case-insensitive search by name
        { type: { $regex: query, $options: 'i' } }  // Case-insensitive search by type
      ]
    }).exec();

    res.status(200).json(documents);
  } catch (error) {
    console.error('Error searching documents:', error);
    res.status(500).json({ message: 'Failed to search documents' });
  }

};


// Exporting middleware
export { checkDocumentOwnership }; 