import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import flightRouter from "./routes/flight.js";
import bookingRouter from "./routes/booking.js";
import airportRouter from "./routes/airport.js";

dotenv.config();

const AWS_IP = 'https://54.169.30.97';
const LOCALHOST = 'http://localhost:3000';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cookieParser())

const allowedOrigins = [LOCALHOST, AWS_IP];
app.use(cors({ origin: allowedOrigins }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/flight", flightRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/airport", airportRouter);

let server = app.listen(port, () => {
  console.log("Server listen in port " + port);
});
