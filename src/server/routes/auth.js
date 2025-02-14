import express from "express";
import { login, logout, register, sendUserInfo } from "../controllers/auth.js";
import { authenticateAdmin, authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/verify", authenticateToken, sendUserInfo);
router.post("/verifyAdmin", authenticateAdmin, sendUserInfo);

export default router;
