import express from "express";
import { updateUserDetails, updateUserRole } from "./user.controller";
import { verifyRoles, verifyToken } from "../../middlewares/verify";

const router = express.Router();

// update user details
router.patch("/update/:userID", verifyToken, verifyRoles(["admin", "superadmin", "Teacher"]), updateUserDetails);
// update user role (user role only can be updated by superadmin)
router.patch("/update-role", verifyToken, verifyRoles(["superadmin", "admin"]), updateUserRole);


export default router;