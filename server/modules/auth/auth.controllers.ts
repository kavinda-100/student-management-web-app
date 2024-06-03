import { comparePassword, jwtSign } from "../../middlewares/token";
import { ZodLoginSchema } from "../../zod/inputValidateSchema";
import type { ZodUserType } from "../../zod/moduleSchema";
import { ZodUserSchema } from "../../zod/moduleSchema";
import type { ZodLoginType } from "../../zod/inputValidateSchema";
import UserModel from "../users/user.model";
import type { NextFunction, Request, Response } from "express";
import { ZodCustomErrorMessages } from "../../utils";
import type { JwtPayloadType } from "../../types";

// register a new user
export const registerUser = async (req: Request<{},{},ZodUserType>, res: Response, next: NextFunction) => {
    // const { userName, name, email, password, role } = req.body;
    // verify the user data with Zod schema
    const veryFyUser = ZodUserSchema.safeParse(req.body);
    // if the user data is not valid, send the error message
    if (!veryFyUser.success) {
      //map over the error messages and send them as an one long string
      const errorMessages = ZodCustomErrorMessages(veryFyUser.error.errors);
      return res.status(400).json({ message: errorMessages });
    }
    
    // check if the user already exists
    const userExist: ZodUserType | null = await UserModel.findOne({ email: veryFyUser.data.email });
    if (userExist) {
        return res.status(400).json({"message": `User already exists in email with ${veryFyUser.data.email}`});
    }
    
    // if the user not exit and user data is valid, create a new user
    try {
      // create a new user
      const user = new UserModel(veryFyUser.data);
      await user.save();
      // before sending the user data, remove the password from the user data
      const UserWithoutPassword = {
        _id: user._id!,
        userName: user.userName,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        phoneNumber: user.phoneNumber,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
      // send the user data
      res.status(201).json(UserWithoutPassword);
    
    } catch (error) {
        next(error);
    }
}

// login a user
export const loginUser = async (req: Request<{},{},ZodLoginType>, res: Response, next: NextFunction) => {
    // const { email, password, role } = req.body;
    // verify the user data with Zod schema
    const veryFyUser = ZodLoginSchema.safeParse(req.body);
    // if the user data is not valid, send the error message
    if (!veryFyUser.success) {
      const errorMessages = ZodCustomErrorMessages(veryFyUser.error.errors);
      return res.status(400).json({ message: errorMessages });
    }
    try {
      // check if the user exists
      const user: ZodUserType | null = await UserModel.findOne({
        email: veryFyUser.data.email,
        role: veryFyUser.data.role,
      });
      // if the user not exists, send the error message
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      // check if the password is correct
      const validPassword = await comparePassword(
        veryFyUser.data.password,
        user.password
      );
      // if the password is not correct, send the error message
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid password" });
      }
      // create a token for the user
      const accessToken = await jwtSign({ userId: user._id, role: user.role });
      // send the token as a cookie
      res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        // expire in 24 hours
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
      // before sending the user data, remove the password from the user data
      const UserWithoutPassword = {
        _id: user._id!,
        userName: user.userName,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        phoneNumber: user.phoneNumber,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
      // send the user data
      res.status(200).json(UserWithoutPassword);

    } catch (error) {
        next(error);
    }
    
}

// logout a user
export const logoutUser = async (req: Request, res: Response) => {
    // clear the cookie
    res.clearCookie("access_token");
    // send the message
    res.status(200).json({ message: "Logged out successfully" });
}

// request body for verify email
type verifyEmailRequestBody = & JwtPayloadType &{
    token: string;
}
// verify email
export const verifyEmail = async (
  req: Request<{}, {}, verifyEmailRequestBody>,
  res: Response,
  next: NextFunction
) => {
  // get the token from the request body
  const { token, _id} = req.body;
  // check if the token exists
  if (!token) {
    return res.status(400).json({ message: "Email verify token is required" });
  }
  // check if the user exists
  const user: ZodUserType | null = await UserModel.findById(_id);
  // if the user not exists, send the error message
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  // check if the user already verified the email
  if (user.isEmailVerified) {
    return res.status(400).json({ message: "Email already verified" });
  }
  // check if the token is correct/same
  if (token !== user.emailVerifyToken) {
    return res.status(400).json({ message: "Invalid token" });
  }
  // if the token is correct, update the user to email verified
  try {
    await UserModel.findByIdAndUpdate(user._id, {
      isEmailVerified: true,
    });
    // send the message
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    next(error);
  }
};