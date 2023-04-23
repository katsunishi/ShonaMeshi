const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3001;

// CORSミドルウェアを適用
app.use(cors());

// プロキシエンドポイントを作成
app.get("/api/restaurants", async (req, res) => {
  //このURLからHTTPリクエストきたら下の関数を実行する
  const { keyword, small_area, midnight } = req.query;

  const API_KEY = "d66f981e72268720";
  const API_BASE_URL = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/";

  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        key: API_KEY,
        keyword: keyword,
        midnight: midnight,
        small_area: small_area,
        format: "json",
        count: 30,
      },
    });

    // APIレスポンスを出力
    console.log("API response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 小エリアマスタAPIのエンドポイントを作成
app.get("/api/small_areas", async (req, res) => {
  const API_KEY = "d66f981e72268720";
  const SMALL_AREA_API_BASE_URL =
    "https://webservice.recruit.co.jp/hotpepper/small_area/v1/";

  try {
    const response = await axios.get(SMALL_AREA_API_BASE_URL, {
      params: {
        key: API_KEY,
        format: "json",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching small areas:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (error) => {
    console.error(`Error starting server: ${error.message}`);
  });
