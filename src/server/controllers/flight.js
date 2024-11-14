import pool from "../database/database.js";

export const getFlightByTimeAndAirport = async (req, res) => {
  const { time, airportBeginName, airportEndName } = req.body;
  const { day, month, year } = time;

  try {
    const [idBeginAirport] = await pool.query(
      "SELECT idairport FROM airport WHERE name = ?",
      [airportBeginName]
    );
    const [idEndAirport] = await pool.query(
      "SELECT idairport FROM airport WHERE name = ?",
      [airportEndName]
    );

    const [idFlight] = await pool.query(
      "SELECT idFlight FROM flight WHERE idbeginAirport = ? AND idendAirport = ? AND DATE(timeStart) = ?",
      [
        idBeginAirport[0].idairport,
        idEndAirport[0].idairport,
        `${year}-${month}-${day}`,
      ]
    );
    console.log(idBeginAirport[0].idairport, idEndAirport[0].idairport);
    res.send(idFlight);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err);
  }
};

export const getInfoFlight = async (req, res) => {
  const { idFlight } = req.body;
  try {
    const query = `SELECT f.*, c.*, a1.name AS beginAirportName, a2.name AS endAirportName
                  FROM 
                    flight f
                  JOIN 
                    airport a1 ON f.idbeginAirport = a1.idairport
                  JOIN 
                    airport a2 ON f.idendAirport = a2.idairport
                  JOIN 
                    classflight c ON f.idFlight = c.idFlight
                  WHERE 
                    f.idFlight = ?`;
    const [rows] = await pool.query(query, idFlight);
    if (rows.length > 0) {
      const flightData = {
        idFlight: rows[0].idFlight,
        timeStart: rows[0].timeStart,
        timeEnd: rows[0].timeEnd,
        beginAirport: {
          id: rows[0].idbeginAirport,
          name: rows[0].beginAirportName,
        },
        endAirport: {
          id: rows[0].idendAirport,
          name: rows[0].endAirportName,
        },
        airplaneId: rows[0].idAirplane,
        classes: {},
      };

      rows.forEach((row) => {
        flightData.classes[row.class] = {
          seatAmount: row.seatAmount,
          seatBooked: row.seatBooked,
          currentPrice: row.currentPrice,
        };
      });

      console.log(rows);
      res.send(flightData);
    } else {
      console.log("No flight found with the given id.");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};
