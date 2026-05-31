import express from "express";
import commentsRoutes from "./routes/comments.js";

const app = express();

app.use(express.json());

app.use("/comments", commentsRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

export default app;