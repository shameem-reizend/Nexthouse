import { Router } from "express";
import { getAdminProductDashboard, handleDeleteProduct, handleGetAllProductsForAdmin } from "../controllers/admin.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { UserRole } from "../entities/User.entity";

const adminRoutes = Router();

adminRoutes.use(authenticate)

adminRoutes.get('/products', authorize(UserRole.ADMIN),handleGetAllProductsForAdmin);
adminRoutes.delete("/delete/:product_id",authorize(UserRole.ADMIN),handleDeleteProduct)
adminRoutes.get('/product-dashboard',authorize(UserRole.ADMIN),getAdminProductDashboard)

export default adminRoutes;