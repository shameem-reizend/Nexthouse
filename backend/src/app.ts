import express, { Request, Response } from "express";
import categoryRoutes from './routes/category.routes'
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use('/category', categoryRoutes);


app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express");
});

app.use(errorHandler);

export default app;
