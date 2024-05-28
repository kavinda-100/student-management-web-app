import mongoose from "mongoose";
import type { ZodUserType } from "../../zod/schema";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema<ZodUserType>(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin", "superadmin"],
    },
    avatar: {
      type: String,
    },
    phoneNumber: {
      type: String,
      minlength: 10,
      maxlength: 10,
      required: true,
    },
  },
  { timestamps: true }
);

// Hash the password before saving the user model
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

const UserModel = mongoose.model<ZodUserType>("User", UserSchema);

export default UserModel;