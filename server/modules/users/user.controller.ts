import type { Request, Response, NextFunction } from "express";
import {
  ZodUserDetailsUpdateSchema,
  ZodUserRoleUpdateSchema,
} from "../../zod/schema";
import type {
  ZodUserDetailsUpdateType,
  ZodUserRoleUpdateType,
} from "../../zod/schema";
import UserModel from "./user.model";
import { ZodCustomErrorMessages } from "../../utils";

// update user details
export const updateUserDetails = async (
  req: Request<{ userID: string }, {}, ZodUserDetailsUpdateType>,
  res: Response,
  next: NextFunction
) => {
  // get the userID from the request params
  const { userID } = req.params;
  //check if the userID exists
  if (!userID) {
    return res.status(400).json({ message: "User ID is required" });
  }
  // verify the request body
  const veryFyUserDetails = ZodUserDetailsUpdateSchema.safeParse(req.body);
  // if the user data is not valid, send the error message
  if (!veryFyUserDetails.success) {
    //map over the error messages and send them as an one long string
    const errorMessages = ZodCustomErrorMessages(
      veryFyUserDetails.error.errors
    );
    return res.status(400).json({ message: errorMessages });
  }

  try {
    // check if the user exists
    const user = await UserModel.findById(userID);
    // if the user does not exist, send a 404 status code
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // update the user details
    const updatedUserDetails: ZodUserDetailsUpdateType = {
      _id: user._id,
      userName: veryFyUserDetails.data.userName || user.userName,
      name: veryFyUserDetails.data.name || user.name,
      email: veryFyUserDetails.data.email || user.email,
      password: veryFyUserDetails.data.password || user.password,
      avatar: veryFyUserDetails.data.avatar || user.avatar,
      phoneNumber: veryFyUserDetails.data.phoneNumber || user.phoneNumber,
    };
    // save the updated user details
    const newUserDetails = await UserModel.findByIdAndUpdate(
      userID,
      updatedUserDetails,
      { new: true }
    );
    // check if the user details are updated
    if (!newUserDetails) {
      return res.status(500).json({ message: "Failed to update user details" });
    }
    // send the updated user details
    return res.status(200).json(newUserDetails);
  } catch (error) {
    next(error);
  }
};

// update user role (user role only can be updated by superadmin)
export const updateUserRole = async (
  req: Request<{}, {}, ZodUserRoleUpdateType>,
  res: Response,
  next: NextFunction
) => {
  // verify the request body
  const veryFyUserRole = ZodUserRoleUpdateSchema.safeParse(req.body);
  // if the user data is not valid, send the error message
  if (!veryFyUserRole.success) {
    //map over the error messages and send them as an one long string
    const errorMessages = ZodCustomErrorMessages(veryFyUserRole.error.errors);
    return res.status(400).json({ message: errorMessages });
  }
  try {
    //check if the user exists and the role is not superadmin
    const user = await UserModel.findOne({
      email: veryFyUserRole.data.email
    });
    // if the user does not exist, send a 404 status code
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // update and save the user role
    const newUserRole = await UserModel.findOneAndUpdate(
      { email: veryFyUserRole.data.email },
      { role: veryFyUserRole.data.role },
      { new: true }
    );
    // check if the user role is updated
    if (!newUserRole) {
      return res.status(500).json({ message: "Failed to update user role" });
    }
    // send the updated user role
    return res.status(200).json(newUserRole);
  } catch (error) {
    next(error);
  }
};
