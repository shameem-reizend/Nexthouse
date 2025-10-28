import { Router } from "express";
import { handleCompleteOrder, handleCreateOrder, handleGetOrderOfBuyer, handleGetOrders } from "../controllers/order.controller";
import { authenticate } from "../middlewares/auth.middleware";

const orderRoutes = Router();
orderRoutes.use(authenticate);

orderRoutes.post('/',handleCreateOrder);
orderRoutes.get('/',handleGetOrders);
orderRoutes.get('/my-orders',handleGetOrderOfBuyer);
orderRoutes.patch('/order-complete',handleCompleteOrder);


export default orderRoutes;