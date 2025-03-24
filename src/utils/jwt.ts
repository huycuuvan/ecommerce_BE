import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
console.log(process.env.JWT_SECRET);
export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};
