import express from "express";
import authRoute from "./modules/auth/auth.route"
import userRoute from "./modules/users/user.route";

const router = express.Router();

// register/create user, login user, logout user
router.use("/auth", authRoute);
// user routes
router.use("/users", userRoute);

export default router;