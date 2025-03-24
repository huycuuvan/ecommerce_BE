import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import { authorizeRole } from "../middleware/authorizeRole";
import { getAdminData, getAllUsers } from "../controller/admin.controller";

const adminRouter = Router();

adminRouter.get(
  "/admin-only",
  verifyToken,
  authorizeRole(["ADMIN"]),
  getAdminData
);
adminRouter.get(
  "/admin/users",
  verifyToken,
  authorizeRole(["ADMIN"]),
  getAllUsers
);
export default adminRouter;
