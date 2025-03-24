import express from "express";
import router from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import dotenv from "dotenv";
import adminRouter from "./routes/admin.routes";
import { errorHandler } from "./middleware/error.middleware";
dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/auth", router);
app.use("/api", userRouter);
app.use("/api", adminRouter);
app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("Hello from Express + TypeScript!");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
