import { Router } from "express";
import {
  login,
  logoutController,
  refreshAccessToken,
  register,
} from "../controller/auth.controller";
import { validateRegister } from "../middleware/auth.validation";
import { verifyToken } from "../middleware/auth.middleware"; // Update this import

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", login);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", verifyToken, logoutController);

export default router;
