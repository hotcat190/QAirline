import * as argon2 from "argon2";
import pool from "../database/database.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [user] = await pool.query("SELECT * FROM customer WHERE email = ?", [
      email,
    ]);

    if (user.length === 0) {
      return res.status(400).json({ message: "User is not exists." });
    }
    const passwordHash = user[0].password;

    if (!(await argon2.verify(passwordHash, password))) {
      throw new Error("Wrong password or username");
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e.message);
    console.log(e);
  }
};

export const register = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const [existingUser] = await pool.query(
      "SELECT * FROM customer WHERE email = ?",
      [email]
    );
    console.log(existingUser);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists." });
    }
    var passwordHash = await argon2.hash(password);

    await pool.query(
      "INSERT INTO customer (username, email, password) VALUES (?, ?, ?)",
      [username, email, passwordHash]
    );
  } catch (e) {
    res.status(500).send(e.message);
    console.log(e);
  }
  res.send(username);
};
