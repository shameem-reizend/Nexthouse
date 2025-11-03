import express, { Request, Response } from "express";
import categoryRoutes from "./routes/category.routes";
import { errorHandler } from "./middlewares/errorHandler";
import productRoutes from "./routes/product.routes";
import authRoutes from "./routes/auth.routes";
import likedRoutes from "./routes/liked.routes";
import eventRoutes from "./routes/event.routes";
import inviteRoutes from "./routes/invite.routes";
import addressRoutes from "./routes/address.routes";
import userRoutes from './routes/user.routes';
import cors from "cors";
import orderRoutes from "./routes/order.routes";
import adminRoutes from "./routes/admin.routes";
import firebaseRoutes from './routes/firebase.routes';

const app = express();
app.use(express.json());

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use("/admin",adminRoutes);
app.use("/auth", authRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/events", eventRoutes);
app.use("/liked", likedRoutes);
app.use("/invite", inviteRoutes);
app.use("/address", addressRoutes);
app.use('/user', userRoutes);
app.use("/order",orderRoutes);
app.use('/firebase', firebaseRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express");
});

app.use(errorHandler);

export default app;
