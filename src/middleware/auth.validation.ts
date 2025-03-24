import { Request, Response, NextFunction } from "express";

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  if (typeof email !== "string" || !email.includes("@")) {
    res.status(400).json({ message: "Valid email is required" });
    return;
  }

  if (typeof password !== "string" || password.length < 6) {
    res.status(400).json({ message: "Password must be at least 6 characters" });
    return;
  }

  if (typeof name !== "string" || name.trim().length < 2) {
    res.status(400).json({ message: "Name must be at least 2 characters" });
    return;
  }

  next();
};
