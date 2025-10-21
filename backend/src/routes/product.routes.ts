import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { UserRole } from "../entities/User.entity";
import {
  addProductHandler,
  deleteProductHandler,
  updateSoldHandler,
} from "../controllers/product.controller";
import { validateBody } from "../middlewares/body.validator.middleware";
import { productSchema } from "../validations/product.validation";

const router = Router();
router.use(authenticate);

router.post("/:category_id",  authorize(UserRole.USER),validateBody(productSchema), addProductHandler);

router.delete("/:product_id",  authorize(UserRole.USER),deleteProductHandler);

router.get("/sold/:product_id", authorize(UserRole.USER), updateSoldHandler);

export default router;
