import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';

const useDocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { workspaceId } = useParams();
  const [deletedDocuments, setDeletedDocuments] = useState([]);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/documents/workspace/${workspaceId}`);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
      setError('Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  }, [axiosInstance, workspaceId]);

  const createDocument = async (formData, workspaceId) => {
    try {
      const response = await axiosInstance.post(`/documents/${workspaceId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Override default Content-Type for this request
        },
      });
      console.log(response.data.document)
      setDocuments(prevDocuments => [...prevDocuments, response.data.document]);
      console.log(documents)
      return response
    } catch (error) {
      console.error('Error adding document:', error);
      setError('Failed to add document');
    }
  };
  

  

  const fetchDeletedDocuments = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/documents/deleted`);
      console.log(response)
      setDeletedDocuments(response.data);
    } catch (error) {
      console.error('Error fetching deleted documents:', error);
      setError('Failed to fetch deleted documents');
    }
  }, []);

  const softDeleteDocument = async (documentId) => {
    try {
      await axiosInstance.delete(`/documents/${documentId}`); // Soft delete request
      setDocuments(prevDocuments => prevDocuments.filter(document => document._id !== documentId));
      await fetchDeletedDocuments(); // Refresh deleted documents list
    } catch (error) {
      console.error('Error soft deleting document:', error);
      setError('Failed to soft delete document');
    }
  };

  // Restore a soft-deleted document
  const restoreDocument = async (documentId) => {
    try {
      await axiosInstance.put(`/documents/${documentId}/restore`);
      setDeletedDocuments(prevDeleted => prevDeleted.filter(doc => doc._id !== documentId));
      await fetchDocuments(); // Refresh active documents list
    } catch (error) {
      console.error('Error restoring document:', error);
      setError('Failed to restore document');
    }
  };

  // Permanently delete a document
  const permanentlyDeleteDocument = async (documentId) => {
    try {
      await axiosInstance.delete(`/documents/${documentId}/permanent`);
      setDeletedDocuments(prevDeleted => prevDeleted.filter(doc => doc._id !== documentId));
    } catch (error) {
      console.error('Error permanently deleting document:', error);
      setError('Failed to permanently delete document');
    }
  };

  const downloadDocument = async (documentId) => {
    try {
      const response = await axiosInstance.get(`/documents/${documentId}/download`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'document.pdf'); // Use the document name or other appropriate filename
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading document:', error);
      setError('Failed to download document');
    }
  };

  const previewDocument = async (documentId) => {
    try {
      const response = await axiosInstance.get(`/documents/${documentId}/preview`);
      const base64Data = response.data.base64;
      return `data:application/pdf;base64,${base64Data}`; // Adjust MIME type as needed
    } catch (error) {
      console.error('Error previewing document:', error);
      setError('Failed to preview document');
    }
  };

  const searchDocuments = async (query) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/documents/search?query=${query}`);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error searching documents:', error);
      setError('Failed to search documents');
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (documentId) => {
    try {
      await axiosInstance.delete(`/documents/${documentId}`);
      setDocuments(prevDocuments => prevDocuments.filter(document => document._id !== documentId));
    } catch (error) {
      console.error('Error deleting document:', error);
      setError('Failed to delete document');
    }
  };



  useEffect(() => {
    if (workspaceId) {
      fetchDocuments();
    }
  }, [fetchDocuments, workspaceId]);

  useEffect(() => {
    fetchDeletedDocuments();
  }, [fetchDeletedDocuments]);

  return { documents, loading, error, createDocument, deleteDocument, downloadDocument, previewDocument, softDeleteDocument,
    restoreDocument, permanentlyDeleteDocument,searchDocuments, deletedDocuments};
};

export default useDocumentList; 
