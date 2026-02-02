import { Router } from "express";
import {
  getUsers,
  getUser,
  updateUser,
} from "../controllers/userController.js";
import { verifyClient } from "../auth/authMiddleware.js";
const router = Router();

router.get("/users", verifyClient, getUsers);
router.get("/user", verifyClient, getUser);
router.put("/user", verifyClient, updateUser);

export { router as userRouter };
