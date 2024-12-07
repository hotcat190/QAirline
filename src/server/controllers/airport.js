import pool from "../database/database.js";

export const getAllAirport = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM airport");
    res.send(rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};
