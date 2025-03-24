import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { ApiError } from "../utils/ApiError";

export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: { id: true, email: true, name: true },
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    res.json(user);
  } catch (err) {
    console.error("❌ Get profile error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
