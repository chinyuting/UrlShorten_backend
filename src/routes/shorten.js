import express from "express";
import { shortenUrl, updateUrlActive } from "../controllers/shortenController.js";

const router = express.Router();

router.post("/shorten", shortenUrl);
router.put("/updateUrlActive", updateUrlActive);

export default router;