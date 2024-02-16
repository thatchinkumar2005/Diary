import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import * as db from "../../model/db.js";
import jwt from "jsonwebtoken";

export default async function verify(req, res) {
  try {
    const token = req.params.token;

    jwt.verify(token, process.env.MAIL_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.sendStatus(401);
      }
      const resp = await db.query(
        "update users set verified = true where username = $1 and verified = false returning *",
        [decoded.username]
      );

      res.json(resp.rows[0]);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
