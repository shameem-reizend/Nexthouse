import { Router } from 'express';
import { getAllUsersHandler, handleAddProfilePicture, handleGetAllUsersForAdmin, handleGetProfilePic, getUserAddress } from '../controllers/user.controller';
import { upload } from '../config/multer';
import { authenticate } from '../middlewares/auth.middleware';



const router = Router();

router.use(authenticate);

router.get('/all', getAllUsersHandler);
router.get('/allUsers',handleGetAllUsersForAdmin);

router.use(authenticate);

router.get("/",getUserAddress)
router.post('/addProfilePic',upload.single("image"),handleAddProfilePicture);
router.get('/getProfilePic',handleGetProfilePic);

export default router;