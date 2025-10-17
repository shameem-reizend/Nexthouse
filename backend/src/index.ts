import app from "./app";
import { AppDataSource } from "./config/data-source";
import { errorHandler } from "./middlewares/errorHandler";
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;


app.use(errorHandler);

AppDataSource.initialize()
.then(() => {
    app.listen(PORT, () => {
        console.log("**********")
        console.log("Database connected")
        console.log(`Server running at http://localhost:${PORT}`);
    });
})
.catch((error) => {
    console.log(error)
})
