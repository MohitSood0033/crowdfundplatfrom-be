import { createConnection } from "typeorm";
import express from "express";
import cors from "cors";

import bodyParser from "body-parser";
import AppDataSource from "./data-source";
import { User } from "./entities/User";
import { routes } from "./routes/routes";

const app = express();
const PORT = 3000;
const repository = AppDataSource.manager.getRepository(User);
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(cors());
routes(app);
app.get("/", (_req, res) => {
  res.status(200).json({
    status: 200,
    message: "Server is running",
  });
});
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
