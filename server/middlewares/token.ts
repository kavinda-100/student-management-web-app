import type { JwtPayloadType } from "../types";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const secret = process.env.JWT_SECRET! || Bun.env.JWT_SECRET!;

//generate jwt token
export const jwtSign = async (payload: any): Promise<string> => {
  const token: string = await jwt.sign(payload, secret, { expiresIn: "1d" });
  return token;
};

//verify jwt token
export const jwtVerify = (token: string): jwt.JwtPayload | string => {
  return jwt.verify(token, secret);
};

//hash password
export const hashPassword = async (password: string): Promise<string> => {
  const sault = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, sault);
};

//compare password for login
export const comparePassword = async (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashPassword);
};
