import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { UserRole } from "../entities/User.entity";
import { handleAddressUpdate, handleCreateAddress, handleGetAddress } from "../controllers/address.controller";
import { validateBody } from "../middlewares/body.validator.middleware";
import { addressSchema } from "../validations/address.validation";


const addressRoutes = Router();
addressRoutes.use(authenticate);

addressRoutes.post("/",authorize(UserRole.USER),validateBody(addressSchema),handleCreateAddress);
addressRoutes.put("/",authorize(UserRole.USER),validateBody(addressSchema),handleAddressUpdate);
addressRoutes.get("/",authorize(UserRole.USER),handleGetAddress);

export default addressRoutes;