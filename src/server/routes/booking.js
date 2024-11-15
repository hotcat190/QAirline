import express from "express";
import { bookTicket, getTicketByCode } from "../controllers/booking.js";

const router = express.Router();

router.post("/", bookTicket);
router.get("/getTicketByCode", getTicketByCode);

export default router;
