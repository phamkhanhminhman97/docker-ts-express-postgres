import express from "express";
import axios from "axios";
import { connectToPostgreSQL, connection } from "./db/postgres";

const app = express();
const port = process.env.PORT || 9000;

connectToPostgreSQL()

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/3"
    );
    const todo = response.data;
    res.json({ message: "Hello, TypeScript and Axios!", todo });
    const todos = await connection.query("SELECT * FROM name");
    console.log(todos.rows);
    
  } catch (error) {
    console.error("Error fetching data:");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
