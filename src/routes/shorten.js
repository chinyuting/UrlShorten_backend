import express from "express";
import { shortenUrl } from "../controllers/shortenController.js";

const router = express.Router();

router.post("/shorten", shortenUrl);

export default router;