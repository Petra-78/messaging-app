import { Router } from "express";
import { getUsers, getUser } from "../controllers/userController.js";
import { verifyClient } from "../auth/authMiddleware.js";
const router = Router();

router.get("/users", verifyClient, getUsers);
router.get("/user", verifyClient, getUser);

export { router as userRouter };
