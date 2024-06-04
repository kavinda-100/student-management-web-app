import { comparePassword, jwtSign } from "../../middlewares/token";
import { ZodEmailSchema, ZodLoginSchema, ZodPasswordResetRequestBodySchema, ZodVerifyEmailRequestBodySchema } from "../../zod/inputValidateSchema";
import type { ZodUserType } from "../../zod/moduleSchema";
import { ZodUserSchema } from "../../zod/moduleSchema";
import type { ZodEmailType, ZodLoginType, ZodPasswordResetRequestBodyType, ZodVerifyEmailRequestBodyType } from "../../zod/inputValidateSchema";
import UserModel from "../users/user.model";
import type { NextFunction, Request, Response } from "express";
import {
  ZodCustomErrorMessages,
  generateRandomNumber,
  generateRandomString,
} from "../../utils";
import type { JwtPayloadType } from "../../types";
import {
  sendOTPEmail,
  sendUserCredentialsEmail,
  sendVerificationEmail,
} from "../../utils/email.utils";

// register a new user
export const registerUser = async (
  req: Request<{}, {}, ZodUserType>,
  res: Response,
  next: NextFunction
) => {
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
  const userExist: ZodUserType | null = await UserModel.findOne({
    email: veryFyUser.data.email,
  });
  if (userExist) {
    return res
      .status(400)
      .json({
        message: `User already exists in email with ${veryFyUser.data.email}`,
      });
  }

  try {
    // if the user not exit and user data is valid, create a new user
    const newUser: ZodUserType = {
      ...veryFyUser.data,
      isEmailVerified: false,
    };
    // create a new user
    const user = new UserModel(newUser);
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
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    //TODO: send a email to user with login credentials
    const isEmailSend = await sendUserCredentialsEmail({
      reserverEmail: user.email,
      reserverName: user.name,
      password: veryFyUser.data.password,
      role: user.role,
    });
    // if the email is not send, send the error message
    if (!isEmailSend) {
      return res.status(500).json({ message: "Email not send" });
    }
    // send the user data
    res.status(201).json(UserWithoutPassword);
  } catch (error) {
    next(error);
  }
};

// login a user
export const loginUser = async (
  req: Request<{}, {}, ZodLoginType>,
  res: Response,
  next: NextFunction
) => {
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
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    // send the user data
    res.status(200).json(UserWithoutPassword);
  } catch (error) {
    next(error);
  }
};

// logout a user
export const logoutUser = async (req: Request, res: Response) => {
  // clear the cookie
  res.clearCookie("access_token");
  // send the message
  res.status(200).json({ message: "Logged out successfully" });
};


// request for email verification
export const askEmailVerification = async (
  req: Request<{}, {}, ZodEmailType>,
  res: Response,
  next: NextFunction
) => {
  const veryFyEmail = ZodEmailSchema.safeParse(req.body);
  // if the user data is not valid, send the error message
  if (!veryFyEmail.success) {
    const errorMessages = ZodCustomErrorMessages(veryFyEmail.error.errors);
    return res.status(400).json({ message: errorMessages });
  }
  try {
    // check if the user exists
    const user: ZodUserType | null = await UserModel.findOne({
      email: veryFyEmail.data.email,
    });
    // if the user not exists, send the error message
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // check if the user already verified the email
    if (user.isEmailVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }
    // generate a token for email verify token
    const emailVerifyToken = await generateRandomString(10);
    // update the user with the email verify token
    const userWithEmailToken: ZodUserType | null =
      await UserModel.findByIdAndUpdate(
        user._id,
        { emailVerifyToken: emailVerifyToken },
        { new: true }
      );
    // if the user not exists, send the error message
    if (!userWithEmailToken || !userWithEmailToken.emailVerifyToken) {
      return res.status(500).json({ message: "Failed to update token" });
    }
    // send the email verify token to the user email
    const isEmailSend = await sendVerificationEmail({
      reserverEmail: userWithEmailToken.email,
      token: emailVerifyToken,
      reserverName: userWithEmailToken.name,
    });
    // if the email is not send, send the error message
    if (!isEmailSend) {
      return res
        .status(500)
        .json({ message: "Email not send please try agin!" });
    }
    // send the message
    res.status(200).json({ message: "Email verification send to your email" });
  } catch (error) {
    next(error);
  }
};

// verify email
export const verifyEmail = async (
  req: Request<{}, {}, ZodVerifyEmailRequestBodyType>,
  res: Response,
  next: NextFunction
) => {
  // get the token from the request body
   const veryFyEmailRequestBody = ZodVerifyEmailRequestBodySchema.safeParse(
     req.body
   );
   // if the user data is not valid, send the error message
   if (!veryFyEmailRequestBody.success) {
     const errorMessages = ZodCustomErrorMessages(
       veryFyEmailRequestBody.error.errors
     );
     return res.status(400).json({ message: errorMessages });
   }
   try {
     // check if the user exists
     const user: ZodUserType | null = await UserModel.findOne({
       email: veryFyEmailRequestBody.data.email,
     });
     // if the user not exists, send the error message
     if (!user) {
       return res.status(400).json({ message: "User not found" });
     }
     // check if the user already verified the email
     if (user.isEmailVerified) {
       return res.status(400).json({ message: "Email already verified" });
     }
     // check if the token is correct/same
     if (veryFyEmailRequestBody.data.token !== user.emailVerifyToken) {
       return res.status(400).json({ message: "Invalid token" });
     }
     // if the token is correct, update the user to email verified
     const userWithEmailVerified = await UserModel.findByIdAndUpdate(
       user._id,
       {
         isEmailVerified: true,
         emailVerifyToken: "",
       },
       { new: true }
     );
     // if isEmailVerified is false, send the error message
     if (!userWithEmailVerified?.toObject().isEmailVerified) {
       return res.status(500).json({ message: "Failed to verify email" });
     }
     // send the message
     res.status(200).json({ message: "Email verified successfully" });
   } catch (error) {
     next(error);
   }
};


// ask for password reset
export const askPasswordReset = async (
  req: Request<{}, {}, ZodEmailType>,
  res: Response,
  next: NextFunction
) => {
  const veryFyEmail = ZodEmailSchema.safeParse(req.body);
  // if the user data is not valid, send the error message
  if (!veryFyEmail.success) {
    const errorMessages = ZodCustomErrorMessages(veryFyEmail.error.errors);
    return res.status(400).json({ message: errorMessages });
  }
  // check if the user exists
  const user: ZodUserType | null = await UserModel.findOne({ email: veryFyEmail.data.email});
  // if the user not exists, send the error message
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  try {
    // generate a random number for password reset token
    const PasswordResetOPT = generateRandomNumber();
    // update the user with the password reset OPT
    const userWithPasswordResetOPT: ZodUserType | null =
      await UserModel.findByIdAndUpdate(
        user._id,
        { passwordResetOPT: PasswordResetOPT },
        { new: true }
      );

    // if the user not exists, send the error message
    if (
      !userWithPasswordResetOPT ||
      !userWithPasswordResetOPT.passwordResetOPT
    ) {
      return res
        .status(500)
        .json({ message: "Failed to update password reset OPT" });
    }
    // send the password reset OPT to the user email
    const isEmailSend = await sendOTPEmail({
      reserverEmail: userWithPasswordResetOPT.email,
      reserverName: userWithPasswordResetOPT.name,
      OPT: PasswordResetOPT,
    });
    // if the email is not send, send the error message
    if (!isEmailSend) {
      return res
        .status(500)
        .json({ message: "Email not send please try agin!" });
    }
    // send the message
    res.status(200).json({ message: "Password reset OPT send to your email" });
  } catch (error) {
    next(error);
  }
};

// reset password
export const resetPassword = async (
  req: Request<{}, {}, ZodPasswordResetRequestBodyType>,
  res: Response,
  next: NextFunction
) => {
  // get the token from the request body
  const resetPasswordRequestBody = ZodPasswordResetRequestBodySchema.safeParse(
    req.body
  );
  // if the user data is not valid, send the error message
  if (!resetPasswordRequestBody.success) {
    const errorMessages = ZodCustomErrorMessages(
      resetPasswordRequestBody.error.errors
    );
    return res.status(400).json({ message: errorMessages });
  }
  try {
    // check if the user exists
    const user: ZodUserType | null = await UserModel.findOne({
      email: resetPasswordRequestBody.data.email,
    });
    // if the user not exists, send the error message
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // check if the token is correct/same
    if (resetPasswordRequestBody.data.OPT !== user.passwordResetOPT) {
      return res.status(400).json({ message: "Invalid OPT" });
    }
    // update the user with the new password
    const userWithNewPassword = await UserModel.findByIdAndUpdate(
      user._id,
      {
        password: resetPasswordRequestBody.data.password,
        passwordResetOPT: 0,
      },
      { new: true }
    );
    // if the user not exists, send the error message
    if (!userWithNewPassword) {
      return res.status(500).json({ message: "Failed to update password" });
    }
    // send the message
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
};
