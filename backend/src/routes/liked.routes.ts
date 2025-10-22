import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { addToLikeHandler, deleteFromLikedHandler, fetchAllLikedProducts } from "../controllers/likedProducts.controller";
import { User, UserRole } from "../entities/User.entity";

const router=Router()

router.use(authenticate)
router.post('/',addToLikeHandler)
router.get("/",fetchAllLikedProducts)
router.delete("/",deleteFromLikedHandler)


export default router