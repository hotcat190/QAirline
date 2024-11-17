import express from "express";
import {
  getFlightByTimeAndAirport,
  getInfoFlight,
  createFlight,
  changeInfoFlight,
  deleteFlight,
} from "../controllers/flight.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/searchFlight", getFlightByTimeAndAirport);
router.get("/getInfo", getInfoFlight);
router.post("/createFlight", authenticateToken, createFlight);
router.put("/changeInfo", authenticateToken, changeInfoFlight);
router.delete("/", authenticateToken, deleteFlight);

export default router;
