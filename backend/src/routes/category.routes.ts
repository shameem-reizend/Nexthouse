import { Router } from "express";
import { addCategoryHandler } from "../controllers/category.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { UserRole } from "../entities/User.entity";

const router = Router();
router.use(authenticate);

router.post('/', authorize(UserRole.ADMIN), addCategoryHandler);

export default router