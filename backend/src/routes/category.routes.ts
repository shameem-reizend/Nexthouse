import { Router } from "express";
import { addCategoryHandler, deleteCategoryHandler, fetchAllCategoriesHandler } from "../controllers/category.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { UserRole } from "../entities/User.entity";
import { validateBody } from "../middlewares/body.validator.middleware";
import { createCategorySchema } from "../validations/category.validation";

const router = Router();
router.use(authenticate);

router.post('/', authorize(UserRole.ADMIN), validateBody(createCategorySchema), addCategoryHandler);
router.get('/', fetchAllCategoriesHandler);
router.delete('/:categoryId',deleteCategoryHandler)
export default router;