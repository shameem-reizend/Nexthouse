import { Router } from 'express';
import { getAllUsersHandler } from '../controllers/user.controller';

const router = Router();

router.get('/all', getAllUsersHandler);

export default router;