import { Pool } from "pg";

// Connection for Docker container
export const connectionDocker = new Pool({
  user: "root",
  host: "express-postgres",
  database: "db",
  password: "root",
  port: 5432,
});

// Connection for local development
export const connectionLocal = new Pool({
  user: "root",
  host: "localhost",
  database: "db",
  password: "root",
  port: 5432,
});

async function connectToPostgreSQL(connectionType = "local") {
  try {
    const connection = connectionType === "local" ? connectionLocal : connectionDocker;
    if (connection.totalCount === 0 || connection.idleCount === 0) {
      console.log("Connecting to PostgreSQL...");
      await connectToPool(connection);
      console.log("Connected to PostgreSQL!");
    } else {
      console.log("Already connected to PostgreSQL.");
    }
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
  }
}

async function connectToPool(connection: Pool) {
  try {
    await connection.connect();
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
    throw error;
  }
}

export { connectToPostgreSQL, connectToPool };
