import express from "express";
import { getAllAirplane, getAirplane, addAirplane, updateAirplane, deleteAirplane } from "../controllers/airplane.js";
import { authenticateAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticateAdmin, addAirplane);
router.get("/:idAirplane", authenticateAdmin, getAirplane);
router.put("/:idAirplane", authenticateAdmin, updateAirplane);
router.delete("/:idAirplane", authenticateAdmin, deleteAirplane);
router.get("/all", authenticateAdmin, getAllAirplane);

export default router;