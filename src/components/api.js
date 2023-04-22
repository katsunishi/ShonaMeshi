import axios from "axios";

const PROXY_SERVER_URL = "http://localhost:3001";

export const fetchRestaurants = async (
  searchKeyword,
  selectedArea,
  keyword,
  midnight,
  start
) => {
  try {
    const response = await axios.get(`${PROXY_SERVER_URL}/api/restaurants`, {
      params: {
        keyword: keyword,
        small_area: selectedArea,
        midnight: midnight ? 1 : 0,
        start: start,
      },
    });

    const { results } = response.data;
    const shop = results && results.shop ? results.shop : [];

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

    return restaurants;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return [];
  }
};
export const getSmallAreas = async () => {
  try {
    const response = await axios.get(`${PROXY_SERVER_URL}/api/small_areas`);

    const { results } = response.data;
    const small_areas = results && results.small_area ? results.small_area : [];

    return small_areas;
  } catch (error) {
    console.error("Error fetching small areas:", error);
    return [];
  }
};
