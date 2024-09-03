import Workspace from '../models/Workspace.js';

// Controller function to add a new workspace
export const addWorkspace = async (req, res) => {
  const { name } = req.body; // Destructure the name from the request body

  try {
    // Create a new workspace using the model
    const newWorkspace = await Workspace.create({ name });

    // Send back the newly created workspace in the response
    res.status(201).json(newWorkspace);
  } catch (err) {
    console.error('Error adding workspace:', err);


    // Send a generic error response
    res.status(500).json({ error: 'Failed to add workspace' });
  }
};

export const getWorkspaceById = async (req, res) => {
  const workspaceId = req.params.workspaceId;

  const workspace = await Workspace.findById(workspaceId)

  res.status(200).json(workspace)
}


