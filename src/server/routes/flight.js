import express from "express";
import {
  getFlightByTimeAndAirport,
  getInfoFlight,
  createFlight,
  changeInfoFlight,
  deleteFlight,
  getAllFlights,
} from "../controllers/flight.js";
import {
  authenticateToken,
  authenticateAdmin,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/searchFlight", getFlightByTimeAndAirport);
router.get("/getInfo", getInfoFlight);
router.post("/createFlight", authenticateAdmin, createFlight);
router.put("/changeInfo", authenticateAdmin, changeInfoFlight);
router.delete("/", authenticateAdmin, deleteFlight);
router.get("/get", authenticateAdmin, getAllFlights);

export default router;
