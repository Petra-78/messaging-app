import { Router } from "express";
const router = Router();

import {
  postLogin,
  postSignup,
} from "../controllers/authController.js";

router.post("/signup", postSignup);
router.post("/login", postLogin);


export { router as authRouter };
