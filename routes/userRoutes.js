import express from "express";
import {
  loginController,
  userRegister,
} from "../controllers/userController.js";

const route = express.Router();
route.post("/register", userRegister);
route.post("/login", loginController);

export default route;
