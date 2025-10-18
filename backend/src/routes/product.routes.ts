import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { UserRole } from "../entities/User.entity";
import {
  addProductHandler,
  deleteProductHandler,
} from "../controllers/product.contoller";

const router = Router();
// router.use(authenticate);

//  authorize(UserRole.USER)
//  authorize(UserRole.USER)
//  authorize(UserRole.USER)

router.post("/:category_id", addProductHandler);

router.delete("/:product_id", deleteProductHandler);

// router.get("/status");

export default router;
