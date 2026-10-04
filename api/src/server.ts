import express, { type Application } from "express";
import cors from "cors";
import "dotenv/config";
import taskRoutes from "./routes/taskRoutes.js";
import connectDB from "./config/db.js";
import   routes  from "./routes/routes.js";


const app: Application = express();
connectDB();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use ("/tasks",taskRoutes)
app.use("/auth", routes);



app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});