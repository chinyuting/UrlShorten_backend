import express from "express";
import { scrapeUrl } from "../controllers/scrapeController.js";

const router = express.Router();

router.post("/scrape", scrapeUrl);

export default router;