import express from "express";
import { bookTicket, getTicketByCode } from "../controllers/booking.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticateToken, bookTicket);
router.get("/getTicketByCode", authenticateToken, getTicketByCode);

export default router;
