import pool from "../database/database.js";

export const getFlightByTimeAndAirport = async (req, res) => {
  const { time, airportBeginName, airportEndName } = req.body;
  const { day, month, year } = time;

  try {
    [idBeginAirport] = await pool.query(
      "SELECT idairport FROM airport WHERE name = ?",
      [airportBeginName]
    );
    [idEndAirport] = await pool.query(
      "SELECT idairport FROM airport WHERE name = ?",
      [airportEndName]
    );

    [idFlight] = await pool.query(
      "SELECT idFlight FROM flight WHERE idbeginAirport = ? AND idendAirport = ? DAY(timeStart) = ? AND MONTH(timeStart) = ? AND YEAR(timeStart) = ?",
      [idBeginAirport, idEndAirport, day, month, year]
    );

    res.send(idFlight);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err);
  }
};

export const getInfoFlight = async (req, res) => {
    
}