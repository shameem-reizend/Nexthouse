import { Router } from 'express';
import { getAllUsersHandler, handleGetAllUsersForAdmin, getUserAddress } from '../controllers/user.controller';
import { getAddressOfUser } from '../services/user.service';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/all', getAllUsersHandler);
router.get('/allUsers',handleGetAllUsersForAdmin);

router.use(authenticate);

router.get("/",getUserAddress)

export default router;