import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: process.env.DB_PORT || "3306",
  user: process.env.DB_USERNAME || "qairline",
  password: process.env.DB_PASSWORD || "Vuniem131104@",
  database: process.env.DB_DATABASE || "qairline",
  ssl: {
    rejectUnauthorized: true,
  },
});

export default pool.promise();
