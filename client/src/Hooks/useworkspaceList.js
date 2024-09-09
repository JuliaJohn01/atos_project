import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useWorkSpaces } from '../context/workSpaceContext';

const useWorkspaceList = () => {
  const { workspaces, setWorkspaces, addWorkspace, removeWorkspace } = useWorkSpaces();
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

  const fetchWorkspaces = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/workspace'); // Adjusted endpoint
      setWorkspaces(response.data);
    } catch (error) {
      console.error('Error fetching workspaces:', error);
      setError('Failed to fetch workspaces');
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const createWorkspace = async (name) => {
    try {
      const response = await axiosInstance.post('/workspace/createWorkspace', { name }); // Adjusted endpoint
      setWorkspaces([...workspaces, response.data]);
    } catch (error) {
      console.error('Error adding workspace:', error);
      setError('Failed to add workspace');
    }
  };

  const updateWorkspace = async (workspaceId, updates) => {
    try {
      const response = await axiosInstance.put(`/workspace/updateWorkspace/${workspaceId}`, updates); // Adjusted endpoint
      setWorkspaces(workspaces.map(workspace =>
        workspace._id === workspaceId ? response.data.workspace : workspace
      ));
    } catch (error) {
      console.error('Error updating workspace:', error);
      setError('Failed to update workspace');
    }
  };

  const deleteWorkspace = async (workspaceId) => {
    try {
      await axiosInstance.delete(`/workspace/deleteWorkspace/${workspaceId}`); // Adjusted endpoint
      setWorkspaces(workspaces.filter(workspace => workspace._id !== workspaceId));
    } catch (error) {
      console.error('Error deleting workspace:', error);
      setError('Failed to delete workspace');
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  return { workspaces, loading, error, createWorkspace, updateWorkspace, deleteWorkspace };
};

export default useWorkspaceList;
