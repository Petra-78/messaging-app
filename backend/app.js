import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

import { authRouter } from "./routes/authRouter.js";
import { userRouter } from "./routes/userRouter.js";
import { verifyClient } from "./auth/authMiddleware.js";



app.use("/", authRouter);
app.use("/", userRouter);

app.get("/", (req, res) => {
  res.json({ message: "Blog API running" });
});

app.get("/hi", verifyClient, (req,res)=>{
  res.json({message:"hi!"})
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
