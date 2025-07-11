import express from "express";
import { getMyProfile, login, logout, register, updateProfile } from "../controllers/userController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js"

const router = express.Router();

router.post("/register",register);
router.post("/login", login);
router.put("/updateProfile" , AuthMiddleware,updateProfile)
router.get("/logout", logout);
router.get("/me",AuthMiddleware,getMyProfile)

export default router;
