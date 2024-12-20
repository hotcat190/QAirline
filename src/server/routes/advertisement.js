import express from "express";
import { uploadAdvertisement } from "../controllers/advertisement.js"
import { authenticateAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticateAdmin, uploadAdvertisement)

export default router;