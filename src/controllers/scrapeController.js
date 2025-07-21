import axios from "axios";
import { load } from "cheerio";

export const scrapeUrl = async (req, res) => {
  const { url } = req.body;

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = load(html);

    const title = $("title").text();

    res.json({ title });
  } catch (error) {
    console.error("Error scraping:", error);
    res.status(500).json({ error: "無法取得資料" });
  }
};