import mysql from "mysql2";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

let pool;

export async function connect() {
  pool = mysql
    .createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT,
      ssl: {
        ca: readFileSync(join(__dirname, "../ca-certificate.crt")),
        rejectUnauthorized: true,
      },
    })
    .promise();
}

export async function getAllProjects() {
  const [rows] = await pool.query(`SELECT * FROM projects;`);
  return rows;
}

export async function getProjectById(id) {
  const [rows] = await pool.query(`SELECT * FROM projects WHERE id = ?;`, [id]);
  return rows[0];
}
