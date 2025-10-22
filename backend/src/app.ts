import express, { Request, Response } from "express";
import categoryRoutes from "./routes/category.routes";
import { errorHandler } from "./middlewares/errorHandler";
import productRoutes from "./routes/product.routes"
import authRoutes from "./routes/auth.routes";
import likedRoutes from "./routes/liked.routes"

const app = express();
app.use(express.json());
app.use(express.json());
app.use("/category", categoryRoutes);
app.use('/auth',authRoutes);
app.use("/product", productRoutes);
app.use("/liked",likedRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express");
});

app.use(errorHandler);

export default app;
