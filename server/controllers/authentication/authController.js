import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import sendMail from "../../helpers/sendMail.js";
import * as db from "../../model/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  try {
    let { username: reqUsername, pswd: reqPswd, email: reqEmail } = req.body;

    if ((!reqUsername && !reqEmail) || !reqPswd) {
      return res.sendStatus(400);
    }
    if (reqUsername && reqEmail) {
      reqEmail = undefined;
    }

    if (!reqEmail) {
      const resp = await db.query("select * from users where username = $1", [
        reqUsername,
      ]);
      const user = resp.rows[0];

      if (!user) {
        return res.sendStatus(401);
      }
      const { username, pswd: hashPswd, email, fname, verified } = user;

      if (!verified) {
        const mailToken = jwt.sign({ username }, process.env.MAIL_TOKEN_SECRET);
        const mailResp = await sendMail({
          to: { name: fname, address: email },
          type: "verify",
          mailToken,
        });
        if (mailResp.accepted.includes(email)) {
          return res.sendStatus(412);
        } else {
          return res.sendStatus(412);
        }
      }

      const match = await bcrypt.compare(reqPswd, hashPswd);

      if (!match) {
        return res.sendStatus(401);
      }

      const accessToken = jwt.sign(
        { username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "5s" }
      );
      const refreshToken = jwt.sign(
        { username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      await db.query("update users set refreshtoken = $1 where username = $2", [
        refreshToken,
        username,
      ]);
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
    } else {
      const resp = await db.query("select * from users where email = $1", [
        reqEmail,
      ]);

      const user = resp.rows[0];
      if (!user) {
        return res.sendStatus(401);
      }
      const { username, pswd: hashPswd, email, fname, verified } = user;

      if (!verified) {
        const mailToken = jwt.sign({ username }, process.env.MAIL_TOKEN_SECRET);
        const mailResp = await sendMail({
          to: { name: fname, address: email },
          type: "verify",
          mailToken,
        });
        return res.sendStatus(412);
      }

      const match = await bcrypt.compare(reqPswd, hashPswd);

      if (!match) {
        return res.sendStatus(401);
      }

      const accessToken = jwt.sign(
        { username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "2m" }
      );
      const refreshToken = jwt.sign(
        { username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      await db.query("update users set refreshtoken = $1 where username = $2", [
        refreshToken,
        username,
      ]);
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
