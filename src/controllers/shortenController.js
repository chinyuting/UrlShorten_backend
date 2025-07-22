import Url from "../models/urlModel.js";
import bcrypt from "bcrypt";
import generateShortCode from '../utils/generateCode.js'

export const shortenUrl = async (req, res) => {
  let { originalUrl, customCode, comment, isUrlActive, password } = req.body;
  let shortCode = customCode;

  try {
    if (customCode) {
      try {
        const parsed = new URL(customCode);
        shortCode = parsed.pathname.replace("/", "");
      } catch {
        shortCode = customCode;
      }
    }

    if (!originalUrl) {
      return res.status(400).json({ error: "請提供原始網址" });
    }

    if (!shortCode) {
      do {
        shortCode = generateShortCode();
      } while (await Url.findOne({ shortCode }));
    } else {
      const exist = await Url.findOne({ shortCode });
      if (exist) {
        return res.status(400).json({ error: "自訂短碼已存在，請換一個" });
      }
    }

    let hashedPassword = null;
    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const newUrl = new Url({
      shortCode,
      originalUrl,
      isUrlActive,
      comment,
      password: hashedPassword,
      createdAt: new Date(),
    });
    await newUrl.save();

    const shortUrl = `${process.env.BASEURL}/${shortCode}`;
    return res.json({ shortUrl, shortCode });
  } catch (error) {
    console.error("儲存失敗", error);
    return res.status(500).json({ error: "伺服器錯誤" });
  }
};

export const updateUrlActive = async (req, res) => {
  const { shortCode, isUrlActive } = req.body;

  if (typeof shortCode !== "string" || typeof isUrlActive !== "boolean") {
    return res.status(400).json({ error: "參數格式錯誤" });
  }

  try {
    const updatedUrl = await Url.findOneAndUpdate(
      { shortCode },
      { isUrlActive },
      { new: true }
    );

    if (!updatedUrl) {
      return res.status(404).json({ error: "找不到該短網址" });
    }

    return res.json({ message: "更新成功", updatedUrl });
  } catch (error) {
    console.error("更新啟用狀態失敗:", error);
    return res.status(500).json({ error: "伺服器錯誤" });
  }
};