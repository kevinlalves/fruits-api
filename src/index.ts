import express, { json, Request, Response } from "express";
import fruitsRouter from "./routers/fruits-router";
import FruitsDb from "./repositories/fruits-repository";

const app = express();
app.use(json());

app.get("/health", (req: Request, res: Response) => res.send("I'am alive!"));
app.use("/fruits", fruitsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

export default app;
