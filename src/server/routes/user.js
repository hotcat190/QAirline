import express from "express";
import {
  getInfo,
  changeInfo,
  getTickets,
  getNotification,
  getUserCount,
} from "../controllers/user.js";
import { authenticateAdmin, authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authenticateToken, getInfo);
router.get("/getTickets", authenticateToken, getTickets);
router.get("/getNotification", authenticateToken, getNotification);
router.put("/", authenticateToken, changeInfo);
router.get("/userCount", authenticateAdmin, getUserCount);

export default router;
