import * as db from "../model/db.js";
import bcrypt from "bcrypt";

//userinfo
export async function getUserInfo(req, res) {
  const user = req.user;
  try {
    if (!user) {
      return res.sendStatus(401);
    }

    const resp = await db.query("select * from users where username = $1", [
      user.username,
    ]);

    const { username, fname, lname, dob, email, journal } = resp.rows[0];

    res.json({ username, fname, lname, dob, email, journal });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//edit user info
export async function editUserInfo(req, res) {
  try {
    const user = req.user;
    if (!user) {
      return res.sendStatus(401);
    }
    const { fname, lname } = req.body;

    const resp = await db.query(
      "update users set fname = $1, lname = $2 where username = $3 returning *",
      [fname, lname, user.username]
    );
    const { fname: fname_, lname: lname_ } = resp.rows[0];

    res.json({ fname_, lname_ });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//edit mail
export default async function editEmail(req, res) {
  try {
    const user = req.user;

    if (!user) {
      return res.sendStatus(401);
    }

    const { email, pswd } = req.body;

    let resp = await db.query(
      "select email, pswd from users where username = $1",
      [user.username]
    );

    if (resp.rows.length === 0) {
      return res.sendStatus(401);
    }

    if (resp.rows[0].email === email) {
      return res.sendStatus(400);
    }

    resp = await db.query("select email from users where email = $1", [email]);

    if (resp.rows.length !== 0) {
      return res.sendStatus(409);
    }

    resp = await db.query("select email, pswd from users where username = $1", [
      user.username,
    ]);

    const match = await bcrypt.compare(pswd, resp.rows[0].pswd);

    if (match) {
      await db.query(
        "update users set email = $1, verified = false where username = $2",
        [email, user.username]
      );
      res.redirect("/api/v1/auth/logout");
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//change password
export async function editPswd(req, res) {
  try {
    const user = req.user;

    if (!user) return res.sendStatus(401);

    const { oldPswd, newPswd } = req.body;

    let resp = await db.query("select pswd from users where username = $1", [
      user.username,
    ]);

    const match = await bcrypt.compare(oldPswd, resp.rows[0].pswd);

    if (match) {
      const hash = await bcrypt.hash(newPswd, 10);
      resp = await db.query(
        "update users set pswd = $1 where username = $2 returning *",
        [hash, user.username]
      );
      return res.sendStatus(201);
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
