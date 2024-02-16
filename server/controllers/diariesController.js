import * as db from "../model/db.js";

export async function getUserDiaries(req, res) {
  try {
    const user = req?.user;
    if (!user) {
      return res.sendStatus(401);
    }

    const resp = await db.query("select * from diaries where username = $1", [
      user.username,
    ]);

    res.json(resp.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export async function getUserDiary(req, res) {
  try {
    const user = req?.user;
    const id = req.params.id;
    if (!user) {
      return res.sendStatus(401);
    }

    const resp = await db.query(
      "select * from diaries where username = $1 and id = $2",
      [user.username, id]
    );

    if (resp.rows.length === 0) {
      return res.sendStatus(404);
    }

    res.json(resp.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function addUserDiary(req, res) {
  try {
    const user = req?.user;
    const { title, content, created } = req.body;
    if (!user) {
      return res.sendStatus(401);
    }

    const resp = await db.query(
      "insert into diaries(title,content,created,username) values($1, $2, $3, $4) returning *",
      [title, content, created, user.username]
    );

    res.json(resp.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateUserDiary(req, res) {
  try {
    const user = req?.user;
    const { title, content, id, created } = req.body;

    if (!user) {
      return res.sendStatus(401);
    }

    let resp = await db.query("select * from diaries where id = $1", [id]);

    if (resp.rows.length === 0) {
      return res.sendStatus(404);
    }

    if (resp.rows[0].username != user.username) {
      return res.sendStatus(404);
    }

    resp = await db.query(
      "update diaries set title = $1, content = $2, created = $3 where id = $4 returning *",
      [title, content, created, id]
    );

    res.json(resp.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteUserDiary(req, res) {
  try {
    const user = req?.user;
    const { id } = req.body;

    if (!user) {
      return res.sendStatus(401);
    }
    if (!id) {
      return res.sendStatus(401);
    }

    let resp = await db.query("select * from diaries where id = $1", [id]);

    if (resp.rows.length === 0) {
      return res.sendStatus(404);
    }

    if (resp.rows[0].username != user.username) {
      return res.sendStatus(404);
    }

    resp = await db.query("delete from diaries where id = $1 returning *", [
      id,
    ]);

    res.json(resp.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
