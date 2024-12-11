import express from "express";
import { getInfo, changeInfo, getTickets } from "../controllers/user.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authenticateToken, getInfo);
router.get("/getTickets", authenticateToken, getTickets);
router.put("/", authenticateToken, changeInfo);

export default router;
