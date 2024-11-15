import express from "express";
import {
  getFlightByTimeAndAirport,
  getInfoFlight,
} from "../controllers/flight.js";

const router = express.Router();

router.get("/searchFlight", getFlightByTimeAndAirport);
router.get("/getInfo", getInfoFlight);

export default router;
