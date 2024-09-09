import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';

const useDocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { workspaceId } = useParams();

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
  

  const deleteDocument = async (documentId) => {
    try {
      await axiosInstance.delete(`/documents/${documentId}`);
      setDocuments(documents.filter(document => document._id !== documentId));
    } catch (error) {
      console.error('Error deleting document:', error);
      setError('Failed to delete document');
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


  useEffect(() => {
    fetchDocuments();
  }, []);

  return { documents, loading, error, createDocument, deleteDocument, downloadDocument, previewDocument };
};

export default useDocumentList;
