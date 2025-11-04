import dotenv from "dotenv";
dotenv.config();
import { AppDataSource } from "./config/data-source";
import { server } from "./socket";
import { eventCronJob } from "./cron/eventCompleteCron";

const PORT = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    server.listen(PORT, () => {
      console.log("Database connected");
      console.log(`Server running at http://localhost:${PORT}`);
      eventCronJob();
    });
  })
  .catch((error) => {
    console.log(error);
  });
