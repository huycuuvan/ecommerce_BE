import { Router } from "express";

import { verifyToken } from "../middleware/auth.middleware";
import { getProfile } from "../controller/user.controller";

const userRouter = Router();

userRouter.get("/me", verifyToken, getProfile);

export default userRouter;
