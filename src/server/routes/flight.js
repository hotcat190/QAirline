import express from "express";
import {
  getFlightByTimeAndAirport,
  getInfoFlight,
  createFlight,
  changeInfoFlight,
  deleteFlight,
  getAllFlights,
  getAllFlightsAdmin,
  getInfoFlightAdmin,
  getFlightsPaged,
  getFlightCount,
} from "../controllers/flight.js";
import {
  authenticateToken,
  authenticateAdmin,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAllFlights);
router.get("/searchFlight", getFlightByTimeAndAirport);
router.get("/getInfo", getInfoFlight);
router.post("/createFlight", authenticateAdmin, createFlight);
router.put("/changeInfo", authenticateAdmin, changeInfoFlight);
router.delete("/", authenticateAdmin, deleteFlight);
router.get("/", getAllFlights);
router.get("/adminAll", authenticateAdmin, getAllFlightsAdmin);
router.get("/getInfoAdmin", authenticateAdmin, getInfoFlightAdmin);
router.get("/getFlightPaged", authenticateAdmin, getFlightsPaged);
router.get("/getFlightCount", authenticateAdmin, getFlightCount);

export default router;
