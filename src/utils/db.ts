import mysql, { Connection } from "mysql2/promise";

export const createConnection = async (): Promise<Connection> => {
  console.log(
    process.env.DB_HOST,
    process.env.DB_USER,
    Number(process.env.DB_PORT),
    process.env.DB_PASSWORD,
    process.env.DB_NAME
  );
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
};
