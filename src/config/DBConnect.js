import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
});

pool.on("connect", () => {
  console.log("Connection pool established");
});

export default pool;
