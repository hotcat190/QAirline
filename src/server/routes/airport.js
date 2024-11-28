import express from "express";
import { getAllAirport } from "../controllers/airport.js";

const router = express.Router();

router.get("/", getAllAirport);

export default router;
