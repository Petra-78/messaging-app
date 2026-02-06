import { Router } from "express";
import {
  getUsers,
  getUser,
  updateUser,
  uploadAvatar,
} from "../controllers/userController.js";
import { verifyClient } from "../auth/authMiddleware.js";
const router = Router();

router.get("/users", verifyClient, getUsers);
router.get("/user", verifyClient, getUser);
router.put("/user", verifyClient, updateUser);
router.put("/user/avatar", verifyClient, uploadAvatar);

export { router as userRouter };
