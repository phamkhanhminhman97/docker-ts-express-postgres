import express from "express";
import axios from "axios";
import { connectToPostgreSQL } from "./db/postgres";
import dotenv from "dotenv";
// import compression from "compression";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "dev"}` });

const app = express();
const port = process.env.PORT || 9000;

connectToPostgreSQL();
// app.use(compression());

app.get("/", async (req, res) => {
  console.log('Enviroment:', process.env.ENVIROMENT);
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/3"
    );
    const todo = response.data;
    const message = "Hello, TypeScript and Axios!";
    res.json({ message: message, todo });
  } catch (error) {
    console.error("Error fetching data:");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
