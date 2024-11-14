import express from "express";
import { getInfo, changeInfo, getTickets } from "../controllers/user.js";

const router = express.Router();

router.get("/customer", getInfo);
router.get("/getTickets", getTickets);
router.post("/customer", changeInfo);

export default router;
