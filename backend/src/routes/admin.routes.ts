import { Router } from "express";
import { handleGetAllEventsForAdmin, handleGetAllOrdersForAdmin, handleGetAllProductsForAdmin } from "../controllers/admin.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { UserRole } from "../entities/User.entity";

const adminRoutes = Router();

adminRoutes.use(authenticate)

adminRoutes.get('/products', authorize(UserRole.ADMIN),handleGetAllProductsForAdmin);
adminRoutes.get('/events', authorize(UserRole.ADMIN),handleGetAllEventsForAdmin);
adminRoutes.get('/orders', authorize(UserRole.ADMIN),handleGetAllOrdersForAdmin);

export default adminRoutes;