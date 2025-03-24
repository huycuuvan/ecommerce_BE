import { Request, Response, NextFunction } from "express";
import {
  getAdminDataService,
  getAllUsersService,
} from "../services/admin.service";

export const getAdminData = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const result = getAdminDataService({
      id: req.user!.id as number,
      email: req.user!.email as string,
      role: req.user!.role as string,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getAllUsersService();
    res.json(users);
  } catch (err) {
    next(err);
  }
};
