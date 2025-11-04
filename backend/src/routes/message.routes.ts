import { Router } from "express";
import { handleGetMessage, handleSendMessage } from "../controllers/message.controller";
import { authenticate } from "../middlewares/auth.middleware";


const messageRouter = Router();
messageRouter.use(authenticate);

messageRouter.post('/send/:receiverId',handleSendMessage);
messageRouter.get('/all/:receiverId',handleGetMessage);


export default messageRouter;