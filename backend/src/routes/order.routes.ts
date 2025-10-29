import { Router } from "express";
import { handleCompleteOrder, handleCreateOrder, handleGetOrderOfBuyer, handleGetOrders, handleRejectOrder } from "../controllers/order.controller";
import { authenticate } from "../middlewares/auth.middleware";

const orderRoutes = Router();
orderRoutes.use(authenticate);

orderRoutes.post('/',handleCreateOrder);
orderRoutes.get('/',handleGetOrders);
orderRoutes.get('/my-orders',handleGetOrderOfBuyer);
orderRoutes.patch('/order-complete',handleCompleteOrder);
orderRoutes.patch('/order-reject',handleRejectOrder);


export default orderRoutes;