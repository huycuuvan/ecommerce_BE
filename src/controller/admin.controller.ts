import { Request, Response } from "express";

export const getAdminData = (req: Request, res: Response): void => {
  res.json({ message: "Chào Admin 👑", user: req.user });
  return;
};
