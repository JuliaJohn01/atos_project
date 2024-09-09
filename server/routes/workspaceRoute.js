import express from 'express';
import verifyToken from '../Middleware/authMiddleware.js'; // Update the path as needed
import {addWorkspace, getWorkspaceById, updateWorkspace, deleteWorkspace , getAllWorkspaces} from "../controller/workspaceController.js"
const router = express.Router();

router.use(verifyToken); // Apply middleware to all routes

// Define your routes here
router.post('/createWorkspace', addWorkspace);
router.get('/getWorkspaceById/:workspaceId', getWorkspaceById);
router.put('/updateWorkspace/:workspaceId', updateWorkspace);
router.delete('/deleteWorkspace/:workspaceId', deleteWorkspace);
router.get('/', getAllWorkspaces); // Define this function in your controller

export default router;
