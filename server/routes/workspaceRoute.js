import express from 'express';
import { addWorkspace, getWorkspaceById , getAllDocumentsFromWorkspace,updateWorkspace,deleteWorkspace} from '../controller/workspaceController.js'; // Import the controller function
import verifyToken from '../Middleware/authMiddleware.js';

const router = express.Router();

router.use(verifyToken)

// Route for adding a new workspace
router.post('/', addWorkspace);

router.get('/:workspaceId', getWorkspaceById)
router.get('/:workspaceId/documents', getAllDocumentsFromWorkspace);
router.put('/:workspaceId', updateWorkspace);
router.delete('/:workspaceId', deleteWorkspace);



export default router;
