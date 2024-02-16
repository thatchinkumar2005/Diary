import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const dbOptions = {
  host: "localhost",
  port: 5433,
  user: "postgres",
  password: process.env.DB_PSWD,
  database: "diary_v1",
};

const db = new pg.Pool(dbOptions);

export function query(query, dependancies, callback) {
  return db.query(query, dependancies, callback);
}
