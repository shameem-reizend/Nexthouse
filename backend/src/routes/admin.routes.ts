import { Router } from "express";
import { handleGetAllProductsForAdmin } from "../controllers/admin.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { UserRole } from "../entities/User.entity";

const adminRoutes = Router();

adminRoutes.use(authenticate)

adminRoutes.get('/products', authorize(UserRole.ADMIN),handleGetAllProductsForAdmin);

export default adminRoutes;