import { Request, Response, NextFunction } from "express";
import { getProfileService } from "../services/user.service";

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getProfileService(req.user!.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
