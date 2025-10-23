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
import { upload } from "../config/multer";

const router = Router();
router.use(authenticate);

// authorize(UserRole.USER),

router.post("/:category_id", upload.single("image"), validateBody(productSchema), addProductHandler);

router.delete("/:product_id", deleteProductHandler);

router.get("/sold/:product_id", updateSoldHandler);

router.get('/',displayUserProductsHandler); //displaying logged in user products

router.get("/all", displayProductHandler); //displaying the sold products also


export default router;
