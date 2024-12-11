import express from "express";
import { getAirport } from "../controllers/airport.js";

const router = express.Router();

router.get("/", getAirport);

export default router;
