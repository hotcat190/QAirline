import pool from "../database/database.js";

export const getFlightByTimeAndAirport = async (req, res) => {
  const { time, idBeginAirport, idEndAirport } = req.body;
  const { day, month, year } = time;

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
                  WHERE a1.idairport = ? AND a2.idairport = ? AND DATE(f.timeStart) = ?`;
    const [rows] = await pool.query(query, [
      idBeginAirport,
      idEndAirport,
      `${year}-${month}-${day}`,
    ]);
    if (rows.length > 0) {
      const flightData = {}; // Đối tượng chứa thông tin tất cả chuyến bay

      rows.forEach((row) => {
        // Nếu chưa có chuyến bay này trong flightData, khởi tạo nó
        if (!flightData[row.idFlight]) {
          flightData[row.idFlight] = {
            idFlight: row.idFlight,
            timeStart: row.timeStart,
            timeEnd: row.timeEnd,
            beginAirport: {
              id: row.idbeginAirport,
              name: row.beginAirportName,
            },
            endAirport: {
              id: row.idendAirport,
              name: row.endAirportName,
            },
            idAirplane: row.idAirplane,
            classes: [], // Đối tượng chứa thông tin về các lớp của chuyến bay
          };
        }

        flightData[row.idFlight].classes.push({
          id: row.idclassFlight,
          class: row.class,
          seatAmount: row.seatAmount,
          seatBooked: row.seatBooked,
          currentPrice: row.currentPrice,
        });
      });

      const flights = Object.values(flightData);

      res.send(flights);
    } else {
      res.status(404).json({ message: "No flight found with the given id." });
    }
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
        idAirplane: rows[0].idAirplane,
        classes: {},
      };

      rows.forEach((row) => {
        flightData.classes[row.class] = {
          seatAmount: row.seatAmount,
          seatBooked: row.seatBooked,
          currentPrice: row.currentPrice,
        };
      });

      res.send(flightData);
    } else {
      res.status(404).json({ message: "No flight found with the given id." });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const createFlight = async (req, res) => {
  const { idAdmin } = req.user;
  const {
    timeStart,
    timeEnd,
    idBeginAirport,
    idEndAirport,
    classes,
    idAirplane,
  } = req.body;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [result] = await connection.query(
      `INSERT INTO flight (timeStart, timeEnd, idbeginAirport, idendAirport, idAirplane, idAdmin_created) VALUE (?, ?, ?, ?, ?, ?)`,
      [timeStart, timeEnd, idBeginAirport, idEndAirport, idAirplane, idAdmin]
    );
    const idFlight = result.insertId;

    for (const classType in classes) {
      if (classes.hasOwnProperty(classType)) {
        const { seatAmount, currentPrice } = classes[classType];

        await connection.query(
          "INSERT INTO classflight (class, seatAmount, seatBooked, currentPrice, idFlight) VALUE (?, ?, ?, ?, ?)",
          [classType, seatAmount, 0, currentPrice, idFlight]
        );
      }
    }

    await connection.commit();
    res.send({ idFlight: `${idFlight}` });
  } catch (err) {
    await connection.rollback();
    res.status(500).send(err.message);
  } finally {
    connection.release();
  }
};

export const changeInfoFlight = async (req, res) => {
  const { idAdmin } = req.user;
  const { idFlight, timeStart, timeEnd, classes, idAirplane } = req.body;

  if (!idFlight) {
    return res.status(400).json({ message: "idFlight is required." });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    let query = "UPDATE flight SET idAdmin_created = ?";
    const updateValues = [idAdmin];

    if (timeStart) {
      query += ", timeStart = ?";
      updateValues.push(timeStart);
    }
    if (timeEnd) {
      query += ", timeEnd = ?";
      updateValues.push(timeEnd);
    }
    if (idAirplane) {
      query += ", idAirplane = ?";
      updateValues.push(idAirplane);
    }
    query += " WHERE idFlight = ?";
    updateValues.push(idFlight);

    const [result] = await connection.query(query, updateValues);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Flight not found." });
    }

    if (classes) {
      for (const classType in classes) {
        if (classes.hasOwnProperty(classType)) {
          const { seatAmount, currentPrice } = classes[classType];

          const [result] = await connection.query(
            `UPDATE classflight
             SET seatAmount = ?, currentPrice = ?
             WHERE idFlight = ? AND class = ?`,
            [seatAmount, currentPrice, idFlight, classType]
          );

          if (result.affectedRows === 0) {
            return res.status(404).json({
              message: `Class ${classType} not found for the flight.`,
            });
          }
        }
      }
    }

    await connection.commit();
    res.json({ message: "Flight information updated successfully." });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ message: "Server error." });
  } finally {
    connection.release();
  }
};

export const deleteFlight = async (req, res) => {
  // const { idAdmin, role } = req.user;
  const { idFlight } = req.query;

  if (!idFlight) {
    return res.status(400).json({ message: "idFlight is required." });
  }

  try {
    const [classResult] = await pool.query(
      "DELETE FROM classflight WHERE idFlight = ?",
      [idFlight]
    );

    const [flightResult] = await pool.query(
      "DELETE FROM flight WHERE idFlight = ?",
      [idFlight]
    );
    if (flightResult.affectedRows === 0) {
      return res.status(404).json({
        message: `Flight not found`,
      });
    }

    res.send("Delete successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
