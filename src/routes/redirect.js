import express from "express";
import { redirectUrl } from "../controllers/redirectController.js";

const router = express.Router();

router.get("/:code", redirectUrl);

export default router;