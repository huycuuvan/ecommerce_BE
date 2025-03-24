import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { hashPassword } from "../utils/hash";
import { compare } from "bcrypt";
import { generateToken } from "../utils/jwt";
import { ApiError } from "../utils/ApiError";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
        role: "USER",
      },
    });

    res.status(201).json({ id: user.id, email: user.email, name: user.name });
  } catch (err) {
    console.error("❌ Register error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new ApiError(401, "Wrong password");
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    res.json({ token });
  } catch (err) {
    throw new ApiError(500, "Server error");
  }
};
