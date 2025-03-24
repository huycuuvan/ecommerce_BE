import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import { authorizeRole } from "../middleware/authorizeRole";
import { getAdminData } from "../controller/admin.controller";

const adminRouter = Router();

adminRouter.get(
  "/admin-only",
  verifyToken,
  authorizeRole(["ADMIN"]),
  getAdminData
);

export default adminRouter;
