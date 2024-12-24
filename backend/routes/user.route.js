import express from "express";
import { loginUser, logoutUser, registerUser, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", singleUpload, registerUser);
userRouter.post("/login", loginUser);
userRouter.put("/profile/update", isAuthenticated, singleUpload, updateProfile);
userRouter.get("/logout", logoutUser);

export default userRouter;
