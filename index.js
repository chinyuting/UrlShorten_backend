import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import shortenRoutes from "./src/routes/shorten.js";
import scrapeRoutes from "./src/routes/scrape.js";

dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api", shortenRoutes);
app.use("/api", scrapeRoutes);

mongoose.connect(process.env.MONGODBURL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB 連線錯誤:"));
db.once("open", () => {
  console.log("已連接到 MongoDB");
});

app.listen(3001, () => console.log("Server on http://localhost:3001"));