import React, { createContext, useContext, useState } from 'react';

const WorkSpaceContext = createContext();

export const WorkSpaceProvider = ({ children }) => {
  const [workspaces, setWorkspaces] = useState([]);

  const addWorkspace = (workspace) => {
    setWorkspaces((prevWorkspaces) => [...prevWorkspaces, workspace]);
  };

  const removeWorkspace = (workspaceId) => {
    setWorkspaces((prevWorkspaces) => prevWorkspaces.filter(workspace => workspace._id !== workspaceId));
  };

  return (
    <WorkSpaceContext.Provider value={{ workspaces, addWorkspace, removeWorkspace, setWorkspaces }}>
      {children}
    </WorkSpaceContext.Provider>
  );
};

export const useWorkSpaces = () => useContext(WorkSpaceContext);
