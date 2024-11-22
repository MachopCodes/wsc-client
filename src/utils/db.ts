import mysql, { Connection } from "mysql2/promise";

export const createConnection = async (): Promise<Connection> => {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
};