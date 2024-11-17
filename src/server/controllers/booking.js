import pool from "../database/database.js";

export const bookTicket = async (req, res) => {
  const { idCustomer } = req.user;
  const { idClassFlight } = req.body;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [updateResult] = await connection.query(
      `UPDATE classflight
         SET seatBooked = seatBooked + 1
         WHERE idclassFlight = ? 
         AND seatAmount > seatBooked`,
      [idClassFlight]
    );

    if (updateResult.affectedRows === 0) {
      throw new Error("Không còn ghế trống trong hạng vé này.");
    }

    const [priceResult] = await connection.query(
      `SELECT currentPrice 
         FROM classflight 
         WHERE idclassFlight = ?`,
      [idClassFlight]
    );

    if (priceResult.length === 0) {
      throw new Error("Hạng vé không tồn tại.");
    }

    const currentPrice = priceResult[0].currentPrice;

    const [insertResult] = await connection.query(
      `INSERT INTO ticket (idclassFlight, idCustomer, price)
         VALUES (?, ?, ?)`,
      [idClassFlight, idCustomer, currentPrice]
    );

    await connection.commit();

    res.status(201).json({
      message: "Đặt vé thành công.",
      ticketId: insertResult.insertId,
    });
  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({
      message: error.message || "Đã xảy ra lỗi, vui lòng thử lại sau.",
    });
  } finally {
    connection.release();
  }
};

export const getTicketByCode = async (req, res) => {
  const { code } = req.body;

  try {
    const query = `SELECT 
                      ticket.idTicket,
                      classFlight.idclassFlight,
                      classFlight.class,
                      ticket.code,
                      ticket.price,
                      ticket.status,
                      ticket.created_at,
                      flight.timeStart,
                      ap1.name AS airportBeginName,
                      ap2.name AS airportEndName
                  FROM 
                      customer
                  JOIN 
                      ticket USING(idCustomer)
                  JOIN 
                      classFlight USING(idclassFlight)
                  JOIN 
                      flight USING(idFlight)
                  JOIN 
                      airport AS ap1 ON flight.idbeginAirport = ap1.idairport
                  JOIN 
                      airport AS ap2 ON flight.idendAirport = ap2.idairport
                  WHERE 
                      ticket.code = ?;`;
    const [infoTicket] = await pool.query(query, [code]);
    res.send(infoTicket);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
