import { prisma } from "../config/prisma";
import { ApiError } from "../utils/ApiError";

export const getProfileService = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};
// src/services/auth.service.ts
export const logoutService = async (userId: number) => {
  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null }, // xoá refreshToken trong DB
  });
};
