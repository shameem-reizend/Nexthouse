import { Router } from 'express';
import { getAllUsersHandler, handleGetAllUsersForAdmin } from '../controllers/user.controller';

const router = Router();

router.get('/all', getAllUsersHandler);
router.get('/allUsers',handleGetAllUsersForAdmin);

export default router;