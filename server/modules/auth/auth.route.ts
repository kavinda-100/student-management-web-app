import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  verifyEmail,
  askEmailVerification,
  askPasswordReset,
  resetPassword,
} from "./auth.controllers";
import { verifyToken, verifyRoles } from "../../middlewares/verify";

const router = express.Router();

router.post("/login", loginUser);
router.post(
  "/register",
  verifyToken,
  verifyRoles(["admin", "superadmin"]),
  registerUser
);
router.get(
  "/logout",
  verifyToken,
  verifyRoles(["admin", "superadmin", "Teacher", "student"]),
  logoutUser
);
router.post(
  "/ask-email-verification",
  verifyToken,
  verifyRoles(["admin", "superadmin", "Teacher", "student"]),
  askEmailVerification
);
router.post(
  "/verify-email",
  verifyToken,
  verifyRoles(["admin", "superadmin", "Teacher", "student"]),
  verifyEmail
);
router.post(
  "/ask-password-reset",
  verifyToken,
  verifyRoles(["admin", "superadmin", "Teacher", "student"]),
  askPasswordReset
);
router.post(
  "/reset-password",
  verifyToken,
  verifyRoles(["admin", "superadmin", "Teacher", "student"]),
  resetPassword
);

export default router;
