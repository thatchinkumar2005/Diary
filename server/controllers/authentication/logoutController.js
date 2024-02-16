import * as db from "../../model/db.js";

export default async function logout(req, res) {
  //clear accessToken in frontend

  try {
    const cookie = req.cookies;
    if (!cookie) return res.sendStatus(201);

    const refreshToken = cookie?.jwt;
    if (!refreshToken) return res.sendStatus(201);

    const resp = await db.query(
      "select refreshtoken from users where refreshtoken = $1",
      [refreshToken]
    );

    const user = resp.rows[0];

    if (!user) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.sendStatus(201);
    }

    await db.query("update users set refreshtoken = ''");
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
