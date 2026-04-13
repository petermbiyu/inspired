import pool from "../../config/DBConnect.js";

export const createUser = (username, email, password) => {
  const result = pool.query(
    `insert into users (username, email, password) values ($1, $2, $3) RETURNING *`,
    [username, email, password],
  );
  return result.rows[0];
};
