import { Router } from "express";
import { upload } from "../middleware/multer.js";
const router = Router();

import { getMessages, postMessage } from "../controllers/chatController.js";
import { verifyClient } from "../auth/authMiddleware.js";

router.get("/messages/:otherUserId", verifyClient, getMessages);
router.post("/messages", verifyClient, upload.single("file"), postMessage);

export { router as chatRouter };
