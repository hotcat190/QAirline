import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: process.env.DB_PORT || "3307",
  user: process.env.DB_USER || "qairline",
  password: process.env.DB_PASSWORD || "muoidiem",
  database: "qairline",
});

export default pool.promise();
