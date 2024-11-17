import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: "30s" });
};

export const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY);
};

export const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refresh;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: "Access denied. Token is required." });
  }

  const payload = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_KEY,
    (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token. " });
      }
      const role = decoded.role;
      var userId = role === "admin" ? decoded.idAdmin : decoded.idCustomer;
      const payload =
        role === "admin"
          ? {
              idAdmin: `${userId}`,
              role: `${role}`,
              createAt: new Date(),
            }
          : {
              idCustomer: `${userId}`,
              role: `${role}`,
              createAt: new Date(),
            };
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: "30s",
      });
      res.cookie("access", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      // res.send(payload);
      // console.log(payload);
      return payload;
    }
  );
  // res.send(req.cookies);
  return payload;
};
