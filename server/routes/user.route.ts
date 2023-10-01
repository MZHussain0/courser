import express from "express";
import {
  activateUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/activate-account", activateUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);

export default userRouter;
