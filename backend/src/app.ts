import express, { Request, Response } from "express";
import commentsRoutes from "./routes/comments";

const app = express();

app.use(express.json());

app.use("/comments", commentsRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("API running...");
});

export default app;