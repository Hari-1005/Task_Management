import express from "express";
import {
  authorizeUser,
  login,
  logout,
  registration,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registration);
userRouter.post("/login", login);
userRouter.get("/logout", logout);
userRouter.get("/me", authMiddleware, authorizeUser);

export default userRouter;
