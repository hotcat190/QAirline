import express from "express";
import {
  bookTicket,
  getAllTickets,
  getTicketByCode,
} from "../controllers/booking.js";
import {
  authenticateAdmin,
  authenticateToken,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticateToken, bookTicket);
router.get("/getTicketByCode", getTicketByCode);
router.get("/", authenticateAdmin, getAllTickets);

export default router;
