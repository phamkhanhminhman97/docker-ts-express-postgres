import { Pool } from "pg";

export const connection = new Pool({
  user: "root",
  host: "express-postgres",
  database: "db",
  password: "root",
  port: 5432,
});

async function connectToPostgreSQL() {
  try {
    if (connection.totalCount === 0 || connection.idleCount === 0) {
      console.log("Connecting to PostgreSQL...");
      await connectToPool();
      console.log("Connected to PostgreSQL!");
    } else {
      console.log("Already connected to PostgreSQL.");
    }
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
  }
}

async function connectToPool() {
  try {
    await connection.connect();
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
    throw error;
  }
}

export { connectToPostgreSQL, connectToPool };
