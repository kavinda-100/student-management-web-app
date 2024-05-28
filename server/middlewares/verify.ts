import type { Response, Request, NextFunction } from 'express';
import { jwtVerify } from './token';
import type { JwtPayloadType } from '../types';
import type { ZodRoleType } from '../zod/schema';

// verify the request contain the token in cookies
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    // get the token from the cookies
    const token = req.cookies.access_token;
    // if the token is not exist, send the error message
    if (!token) {
        return res.status(401).json({ message: "Unauthorized! access token is missing!" });
    }
    // decode the token
    const payload = jwtVerify(token);
    // if the token is not valid, send the error message
    if (!payload) {
        return res.status(401).json({ message: "Access Token is Invalid" });
    }
    // if the token is exist, add the payload to the request object
    req.body.jwtPayload = payload as JwtPayloadType;
    // pass the token to the next middleware
    next();
}

export const verifyRoles = (roles: ZodRoleType[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // get the token from the cookies
    const payload: JwtPayloadType = req.body.jwtPayload;
    // if the token is not exist, send the error message
    if (!payload) {
      return res.status(500).json({ message: "Access denied" });
    }
    // if the role is not match, send the error message
    if (!roles.includes(payload.role)) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    // if the role is match, pass the to the next middleware
    next();
  };
};











