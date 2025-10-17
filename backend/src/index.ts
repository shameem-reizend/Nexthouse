import app from "./app";
import { AppDataSource } from "./config/data-source";
import { errorHandler } from "./middlewares/errorHandler";

const PORT = 4000;


app.use(errorHandler);

AppDataSource.initialize()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
})
.catch((error) => {
    console.log(error)
})
