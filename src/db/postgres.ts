import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "dev"}` });

// Connection for Docker container
export const connection = new Pool({
  user: process.env.POSTGRES_USER || "root",
  host: process.env.POSTGRES_HOST || "express-postgres123",
  database: process.env.POSTGRES_DB || "db",
  password: process.env.POSTGRES_PASSWORD || "root",
  port: process.env.POSTGRES_PORT || 5432 as any,
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
