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
  verifyRoles(["admin"]),
  registerUser
);
router.get(
  "/logout",
  verifyToken,
  verifyRoles(["admin","teacher", "student"]),
  logoutUser
);
router.post(
  "/ask-email-verification",
  verifyToken,
  verifyRoles(["admin","teacher", "student"]),
  askEmailVerification
);
router.post(
  "/verify-email",
  verifyToken,
  verifyRoles(["admin","teacher", "student"]),
  verifyEmail
);
router.post(
  "/ask-password-reset",
  verifyToken,
  verifyRoles(["admin","teacher", "student"]),
  askPasswordReset
);
router.post(
  "/reset-password",
  verifyToken,
  verifyRoles(["admin","teacher", "student"]),
  resetPassword
);

export default router;
