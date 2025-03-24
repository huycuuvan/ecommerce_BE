import { Router } from "express";
import { login, register } from "../controller/auth.controller";
import { validateRegister } from "../middleware/auth.validation";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", login);
export default router;
