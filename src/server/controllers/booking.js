import pool from "../database/database.js";

export const bookTicket = async (req, res) => {
  const { idCustomer, idClassFlight } = req.body;

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
