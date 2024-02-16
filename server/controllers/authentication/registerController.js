import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import * as db from "../../model/db.js";
import bcrypt from "bcrypt";
import sendMail from "../../helpers/sendMail.js";
import jwt from "jsonwebtoken";

export default async function register(req, res) {
  try {
    const { username, pswd, email, fname, lname } = req.body;
    if (!username || !pswd || !email || !fname) {
      return res.sendStatus(400);
    }

    let resp = await db.query(
      "select username from users where username = $1",
      [username]
    );

    if (resp.rows.length !== 0) {
      return res.sendStatus(409);
    }

    resp = await db.query("select username from users where email = $1", [
      email,
    ]);
    if (resp.rows.length !== 0) {
      return res.sendStatus(409);
    }

    const hashedPswd = await bcrypt.hash(pswd, 10);

    resp = await db.query(
      "insert into users(username, pswd, fname, lname, email) values($1,$2,$3,$4,$5) returning *",
      [username, hashedPswd, fname, !lname ? "" : lname, email]
    );

    const mailToken = await jwt.sign(
      { username },
      process.env.MAIL_TOKEN_SECRET
    );

    const mailResp = await sendMail({
      to: { name: fname, address: email },
      type: "verify",
      mailToken,
    });

    if (mailResp.accepted.includes(email)) {
      res.json({ data: resp.rows[0], verifyMailSent: true });
    } else {
      res.json({ data: resp.rows[0], verifyMailSent: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
