// HTTP通信のリクエストとレスポンスを管理
import axios from "axios";

const PROXY_SERVER_URL = "https://shona-meshi.vercel.app/";

const MAX_SEARCH_KEYWORD_LENGTH = 100;

//fetchRestaurants関数とgetSmallAreas関数でプロキシサーバーのエンドポイントにアクセス
export const fetchRestaurants = async (
  searchKeyword,
  selectedArea,
  keyword,
  midnight,
  start
) => {
  try {
    if (searchKeyword && searchKeyword.length > MAX_SEARCH_KEYWORD_LENGTH) {
      throw new Error(
        `Search keyword is too long, maximum allowed length is ${MAX_SEARCH_KEYWORD_LENGTH}`
      );
    }

    const response = await axios.get(`${PROXY_SERVER_URL}/api/restaurants`, {
      params: {
        keyword: keyword,
        small_area: selectedArea,
        midnight: midnight ? 1 : 0,
        start: start,
      },
    });

    const { results } = response.data.restaurants;
    const shop = results && results.shop ? results.shop : [];

    const smallAreas = response.data.smallAreas.results.small_area;

    const restaurants = shop.map((item) => ({
      id: item.id,
      name: item.name,
      address: item.address,
      url: item.urls.pc,
      image: item.photo.pc.l,
      midnight: item.midnight,
      catchPhrase: item.catch,
    }));

    console.log("Restaurants:", restaurants);

    return { restaurants, smallAreas };
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return { restaurants: [], smallAreas: [] };
  }
};

// export const getSmallAreas = async () => {
//   try {
//     const response = await axios.get(`${PROXY_SERVER_URL}/api/small_areas`);

//     if (response.data && response.data.smallAreas) {
//       const { results } = response.data.smallAreas;
//       const small_areas =
//         results && results.small_area ? results.small_area : [];

//       return small_areas;
//     } else {
//       console.error("No smallAreas in response data:", response.data);
//       return [];
//     }
//   } catch (error) {
//     console.error("Error fetching small areas:", error);
//     return [];
//   }
// };
