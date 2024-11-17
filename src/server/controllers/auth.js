import * as argon2 from "argon2";
import pool from "../database/database.js";
import { createAccessToken, createRefreshToken } from "./jwt.js";

export const login = async (req, res) => {
  const { email, password, numberPhone } = req.body;
  let role = "customer";
  let accessToken, refreshToken;

  try {
    let [user] = await pool.query("SELECT * FROM admin WHERE email = ?", [
      email,
    ]);

    if (user.length !== 0) {
      role = "admin";
    } else {
      [user] = await pool.query(
        "SELECT * FROM customer WHERE email = ? OR numberPhone = ?",
        [email, numberPhone]
      );

      if (user.length === 0) {
        return res.status(400).json({ message: "User does not exist." });
      }
    }
    console.log(role);
    const passwordHash =
      role === "customer"
        ? user[0].password
        : await argon2.hash(user[0].password);

    if (!(await argon2.verify(passwordHash, password))) {
      throw new Error("Wrong password or username");
    }

    if (role === "customer") {
      accessToken = createAccessToken({
        idCustomer: `${user[0].idCustomer}`,
        role: `${role}`,
        createAt: new Date(),
      });
      refreshToken = createRefreshToken({
        idCustomer: `${user[0].idCustomer}`,
        role: `${role}`,
      });
    } else {
      accessToken = createAccessToken({
        idAdmin: `${user[0].idAdmin}`,
        role: `${role}`,
        createAt: new Date(),
      });
      refreshToken = createRefreshToken({
        idAdmin: `${user[0].idAdmin}`,
        role: `${role}`,
      });
    }

    res.cookie("access", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.cookie("refresh", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    console.log(accessToken, refreshToken);
    res.send({ role, info: user[0] });
  } catch (e) {
    res.status(500).send(e.message);
    console.log(e);
  }
};

export const register = async (req, res) => {
  const { email, password, numberPhone, username } = req.body;
  try {
    const [existingUser] = await pool.query(
      "SELECT * FROM customer WHERE email = ? OR numberPhone = ?",
      [email, numberPhone]
    );
    console.log(existingUser);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists." });
    }
    var passwordHash = await argon2.hash(password);

    await pool.query(
      "INSERT INTO customer (username, email, password, numberPhone) VALUES (?, ?, ?, ?)",
      [username, email, passwordHash, numberPhone]
    );
  } catch (e) {
    res.status(500).send(e.message);
    console.log(e);
  }
  res.send(username);
};
