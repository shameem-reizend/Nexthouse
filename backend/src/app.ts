import express, { Request, Response } from "express";
import categoryRoutes from './routes/category.routes'
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(express.json());

app.use('/category', categoryRoutes);
app.use('/auth',authRoutes);


app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express");
});

app.use(errorHandler);

export default app;
