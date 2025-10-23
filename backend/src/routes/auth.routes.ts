import { Router } from "express"
import { handleLogin, handleRefreshToken, handleRegister } from "../controllers/auth.controller";
import { validateBody } from "../middlewares/body.validator.middleware";
import { loginSchema, registerSchema } from "../validations/register.validation";



const authRoutes = Router();

authRoutes.post("/register",validateBody(registerSchema),handleRegister);
authRoutes.post("/login",validateBody(loginSchema),handleLogin);
authRoutes.post('/refresh-token',handleRefreshToken);

export default authRoutes;



