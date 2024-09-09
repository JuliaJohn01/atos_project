import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useDocumentList = (workspaceId) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('authToken');

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/documents/workspace/${workspaceId}`);
      console.log(response)
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
      setError('Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  }, [axiosInstance, workspaceId]);

  const createDocument = async (formData) => {
    try {
      const response = await axiosInstance.post(`/documents/${workspaceId}`, formData); // Adjusted endpoint
      setDocuments([...documents, response.data]);
    } catch (error) {
      console.error('Error adding document:', error);
      setError('Failed to add document');
    }
  };

  const deleteDocument = async (documentId) => {
    try {
      await axiosInstance.delete(`/documents/${documentId}`); // Adjusted endpoint
      setDocuments(documents.filter(document => document._id !== documentId));
    } catch (error) {
      console.error('Error deleting document:', error);
      setError('Failed to delete document');
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [loading]);

  return { documents, loading, error, createDocument, deleteDocument };
};

export default useDocumentList;
