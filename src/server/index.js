import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";

import authRouter from "./routes/auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log("Server listen in port " + port);
});
