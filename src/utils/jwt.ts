import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" }); // 15 phút
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" }); // 7 ngày
};

export const verifyToken = (token: string) => {
  const verifyToken = jwt.verify(token, JWT_SECRET);
  return verifyToken;
};
