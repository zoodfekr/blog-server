import express from "express";
import { loginUser } from "../controllers/login_controller.js";
const login_router = express.Router();

login_router.post("/login", loginUser);

export default login_router;
