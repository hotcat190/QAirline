import express from "express";
import {
  bookTicket,
  deleteTicket,
  getAllTickets,
  getTicketByCode,
  getTicketsSold
} from "../controllers/booking.js";
import {
  authenticateAdmin,
  authenticateToken,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticateToken, bookTicket);
router.get("/getTicketByCode", getTicketByCode);
router.get("/", authenticateAdmin, getAllTickets);
router.delete("/", authenticateToken, deleteTicket);
router.get("/getTicketsSold", authenticateAdmin, getTicketsSold);

export default router;
