import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import * as db from "../../model/db.js";
import jwt, { decode } from "jsonwebtoken";

export default async function refresh(req, res) {
  try {
    const cookie = req.cookies;
    if (!cookie) return res.sendStatus(401);

    const refreshToken = cookie?.jwt;

    const resp = await db.query(
      "select username from users where refreshtoken = $1",
      [refreshToken]
    );
    const user = resp.rows[0];

    if (!user) return res.sendStatus(401);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(401);

        if (decoded.username !== user.username) return res.sendStatus(401);

        const newAccessToken = jwt.sign(
          { username: decoded.username },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "2m",
          }
        );

        res.json({ accessToken: newAccessToken });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
