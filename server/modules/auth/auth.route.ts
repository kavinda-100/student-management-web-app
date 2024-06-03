import express from "express";
import { loginUser, registerUser, logoutUser, verifyEmail } from "./auth.controllers";
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
  verifyRoles(["admin", "superadmin", "user"]),
  logoutUser
);
router.post(
  "/verify-email",
  verifyToken,
  verifyRoles(["admin", "superadmin", "user"]),
  verifyEmail
);

export default router;
