import { Router } from "express";
const router = Router();

import { getMessages, postMessage } from "../controllers/chatController.js";
import { verifyClient } from "../auth/authMiddleware.js";

router.get("/messages/:otherUserId", verifyClient, getMessages);
router.post("/messages", verifyClient, postMessage);

export { router as chatRouter };
