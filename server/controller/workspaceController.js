import Workspace from '../models/Workspace.js';
import Document from '../models/Document.js';

// Controller function to add a new workspace
export const addWorkspace = async (req, res) => {
  try {
    const { name } = req.body; // Assuming the workspace name is sent in the request body
    const newWorkspace = new Workspace({ name }); // Assuming you have a Workspace model
    await newWorkspace.save();
    res.status(201).json(newWorkspace); // Respond with the newly created workspace
  } catch (error) {
    res.status(500).json({ message: 'Failed to create workspace' });
  }
};


export const getWorkspaceById = async (req, res) => {
  const workspaceId = req.params.workspaceId;

  const workspace = await Workspace.findById(workspaceId)

  res.status(200).json(workspace)
}

export const getAllDocumentsFromWorkspace= async (req, res) => {
  try {
    const workspaceId = req.params.workspaceId;
    const documents = await Document.find({ workspaceID: workspaceId, deletedAt: null });
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: `Failed to fetch document , ${error}` });
  }
}

 
export const updateWorkspace = async (req, res) => {
  try {
    const workspaceId = req.params.workspaceId;
    const updates = req.body;
    console.log(updates)

    // Find the workspace by ID and update it with the new data
    const updateWorkspace = await Workspace.findByIdAndUpdate(
      workspaceId,
      updates,
      { new: true } // Return the updated document
    );

    if (!updateWorkspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }

    res.status(200).json({ message: 'Workspace updated successfully', workspace: updateWorkspace });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: `Failed to update workspace, ${error}` });
  }
};


export const deleteWorkspace = async (req, res) => {
  try {
    const workspaceId = req.params.workspaceId;

    // Find the workspace by ID and delete it
    const deletedWorkspace = await Workspace.findByIdAndDelete(workspaceId);

    if (!deletedWorkspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }

    res.status(200).json({ message: 'Workspace deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete workspace' });
  }
};

export const getAllWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find();  // Assuming you are using Mongoose and have a Workspace model
    res.status(200).json(workspaces);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch workspaces" });
  }
};

