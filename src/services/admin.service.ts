import { prisma } from "../config/prisma";

export const getAdminDataService = (user: {
  id: number;
  email: string;
  role: string;
}) => {
  return {
    message: "Chào Admin 👑",
    user,
  };
};
export const getAllUsersService = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return users;
};
