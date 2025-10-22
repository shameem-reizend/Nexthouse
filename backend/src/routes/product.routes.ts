import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { UserRole } from "../entities/User.entity";
import {
  addProductHandler,
  deleteProductHandler,
  displayProductHandler,
  displayUserProductsHandler,
  updateSoldHandler,
} from "../controllers/product.controller";
import { validateBody } from "../middlewares/body.validator.middleware";
import { productSchema } from "../validations/product.validation";

const router = Router();
router.use(authenticate);

// authorize(UserRole.USER),

router.post("/:category_id", validateBody(productSchema), addProductHandler);

router.delete("/:product_id", deleteProductHandler);

router.get("/sold/:product_id", updateSoldHandler);

router.get('/',displayUserProductsHandler);

router.get("/all", displayProductHandler); //displaying the sold products also


export default router;
