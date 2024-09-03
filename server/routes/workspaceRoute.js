import express from 'express';
import { addWorkspace, getWorkspaceById } from '../controller/workspaceController.js'; // Import the controller function
import verifyToken from '../Middleware/authMiddleware.js';

const router = express.Router();

router.use(verifyToken)

// Route for adding a new workspace
router.post('/', addWorkspace);

router.get('/:workspaceId', getWorkspaceById)

export default router;
