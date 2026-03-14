import express from "express";
import { askPortfolioAI } from "../controllers/aiController.js";

const router = express.Router();

router.post("/chat", askPortfolioAI);


export default router;