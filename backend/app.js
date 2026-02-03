import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(cors());

app.use(express.json());

import { authRouter } from "./routes/authRouter.js";
import { userRouter } from "./routes/userRouter.js";
import { chatRouter } from "./routes/chatRouter.js";
import { verifyClient } from "./auth/authMiddleware.js";

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", chatRouter);

app.get("/", (req, res) => {
  res.json({ message: "Blog API running" });
});

app.get("/hi", verifyClient, (req, res) => {
  res.json({ message: "hi!" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
