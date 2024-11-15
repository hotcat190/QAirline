import express from "express";
import { bookTicket } from "../controllers/booking.js";

const router = express.Router();

router.post("/", bookTicket);

export default router;
