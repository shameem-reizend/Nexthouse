import { Router } from "express";
import { addCategoryHandler, fetchAllCategoriesHandler } from "../controllers/category.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { UserRole } from "../entities/User.entity";

const router = Router();
router.use(authenticate);

router.post('/', authorize(UserRole.ADMIN), addCategoryHandler);
router.get('/', fetchAllCategoriesHandler);

export default router;