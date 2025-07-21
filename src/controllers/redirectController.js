import Url from "../models/urlModel.js";
import bcrypt from "bcrypt";

export const redirectUrl = async (req, res) => {
  const { code } = req.params;
  const { password, checkOnly } = req.query;

  try {
    const urlDoc = await Url.findOne({ shortCode: code, isUrlActive: true });
    if (!urlDoc) return res.status(404).json({ message: "網址不存在" });

    if (checkOnly === "true") {
      // 回傳是否需要密碼
      return res.json({ needPassword: !!urlDoc.password });
    }

    if (urlDoc.password) {
      if (!password) {
        // 如果沒帶密碼就告訴前端需要密碼
        return res.status(401).json({ message: "需要密碼" });
      }

      const isMatch = await bcrypt.compare(password, urlDoc.password);
      if (!isMatch) {
        return res.status(401).json({ message: "密碼錯誤" });
      }
    }

    // 成功，回傳原始網址給前端讓他跳轉
    return res.json({ redirectUrl: urlDoc.originalUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "伺服器錯誤" });
  }
};