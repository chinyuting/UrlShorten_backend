# UrlShorten_backend

[前往網站](https://url-shortener-beige-pi.vercel.app/)

一個簡單實用的縮網址平台，使用者可以將原始長網址轉換為簡短連結，並快速複製與分享。專案以前後端分離架構開發，並部署於 Vercel。

---

## 技術架構
- **Frontend**：React + Tailwind CSS  
- **Backend**：Node.js + Express  
- **Database**：MongoDB  
- **Deploy**：Vercel

---

## 功能特色
- 輸入長網址可自動產生短網址
- 產生的短網址可複製並重新導向到原始網址
- 可檢視所有建立過的短網址紀錄
- 支援啟用 / 停用特定短網址
- 支援手機與桌機版的響應式設計

---

## 安裝與使用方式

### **後端**

#### 1. 安裝依賴套件

```bash
npm install
```

#### 2. 設定環境變數`.env`
```bash
MONGODBURL=你的 MongoDB 連線字串
BASEURL=前端網址
```


#### 3. 本機啟動專案
```bash
npm run dev
```

### **前端**（請前往 [UrlShortener](https://github.com/chinyuting/UrlShortener)）  
  安裝套件與環境設定後啟動：
```bash
npm run dev
```