const express = require("express");
const cors = require("cors");
const axios = require("axios");

// ウェブサーバー（express）の作成
const app = express();
const PORT = process.env.PORT || 3001;

// CORSミドルウェアを適用
app.use(cors());

// envファイルに書いた環境変数（APIキーなど）をアプリケーション内で利用可能にする
require("dotenv").config();

// プロキシエンドポイントを作成
app.get("/api/restaurants", async (req, res) => {
  //このURLからHTTPリクエストきたら下の関数を実行する
  const { keyword, small_area, midnight } = req.query;
  // リクエストパラメータを出力
  console.log("Request parameters:", { keyword, small_area, midnight });

  const API_KEY = process.env.API_KEY;

  const API_BASE_URL = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/";
  // const SMALL_AREA_API_BASE_URL =
  //   "https://webservice.recruit.co.jp/hotpepper/small_area/v1/";

  try {
    // awaitは非同期処理
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

    // const responseSmallArea = await axios.get(SMALL_AREA_API_BASE_URL, {
    //   params: {
    //     key: API_KEY,
    //     format: "json",
    //     count: 30,
    //   },
    // });

    // APIレスポンスを出力
    console.log("API response:", response.data);
    // console.log("API small area response:", responseSmallArea.data);
    res.json({
      restaurants: response.data.results.shop,
      // smallAreas: responseSmallArea.data.results.small_area,
    });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.get("/api/small_areas", async (req, res) => {
//   const API_KEY = process.env.API_KEY;
//   const SMALL_AREA_API_BASE_URL =
//     "https://webservice.recruit.co.jp/hotpepper/small_area/v1/";

//   try {
//     const response = await axios.get(SMALL_AREA_API_BASE_URL, {
//       params: {
//         key: API_KEY,
//         format: "json",
//         count: 30,
//       },
//     });

//     // APIレスポンスを出力
//     console.log("API small area response:", response.data);
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error fetching small areas:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (error) => {
    console.error(`Error starting server: ${error.message}`);
  });

// axiosはHTTP通信のリクエストとレスポンスを管理
// プロキシサーバーはクライアントとサーバの中間に位置し、それぞれのやりとりを中継する役割を持つ。セキュリティ面も上がる。
// ミドルウェアはアプリケーション何のやりとりを管理（サーバーの設定）する。またアプリケーション（今回はExpress）内でクロスオリジンリクエストを許可する。
