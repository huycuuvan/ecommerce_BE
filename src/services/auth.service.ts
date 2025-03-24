import { prisma } from "../config/prisma";
import { hashPassword } from "../utils/hash";
import { compare } from "bcrypt";
import { ApiError } from "../utils/ApiError";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../utils/jwt"; // dùng mới
import { JwtPayload } from "jsonwebtoken";

interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export const registerUser = async ({
  email,
  password,
  name,
}: RegisterInput) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new ApiError(400, "Email already exists");
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

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
};

export const loginUser = async ({ email, password }: LoginInput) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, "Wrong password");
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const refreshAccessTokenService = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new ApiError(400, "Missing refresh token");
  }

  let decoded: JwtPayload;

  try {
    decoded = verifyToken(refreshToken) as JwtPayload;
  } catch (err) {
    throw new ApiError(403, "Invalid or expired refresh token");
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
  });

  if (!user || user.refreshToken !== refreshToken) {
    throw new ApiError(401, "Refresh token mismatch");
  }

  const newAccessToken = generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return { accessToken: newAccessToken };
};

// src/services/auth.service.ts
export const logoutService = async (userId: number) => {
  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null }, // xoá refreshToken trong DB
  });
};
