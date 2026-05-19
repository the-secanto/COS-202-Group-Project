import express, { Request, Response } from "express";
import commentsRoutes from "./routes/comments";
import postsRoutes from "./routes/posts";

const app = express();

app.use(express.json());

app.use("/comments", commentsRoutes);

app.use("/posts", postsRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("API running...");
});

export default app;