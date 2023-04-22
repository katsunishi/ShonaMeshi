import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import React, { useState, useEffect } from "react";
import { fetchRestaurants, getSmallAreas } from "./components/api";
import Header from "./components/Header";
import Home from "./components/Home";
import Contact from "./Contact";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [smallAreas, setSmallAreas] = useState([]);
  const [start, setStart] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [keyword, setKeyword] = useState("");
  const [midnight, setMidnight] = useState(false);
  useEffect(() => {
    fetchSmallAreas();
    handleSearch();
  }, []);

  const handleSearch = async (
    searchKeyword = "",
    selectedArea = "X293",
    keyword = "",
    midnight = false,
    start = 1,
    loadMore = false
  ) => {
    setSearchKeyword(searchKeyword); // 追加
    setSelectedArea(selectedArea);
    setKeyword(keyword); // 追加
    setMidnight(midnight); // 追加

    const results = await fetchRestaurants(
      searchKeyword,
      selectedArea,
      keyword,
      midnight,
      start
    );
    if (loadMore) {
      setRestaurants((prevRestaurants) => [...prevRestaurants, ...results]);
    } else {
      setRestaurants(results);
    }
  };

  const fetchSmallAreas = async () => {
    const areas = await getSmallAreas();
    setSmallAreas(areas);
  };

  const handleLoadMore = async () => {
    const newStart = start + 30;

    // 現在の検索条件で新しい結果を取得
    const results = await fetchRestaurants(
      searchKeyword,
      selectedArea,
      keyword,
      midnight,
      newStart
    );

    if (results.length > 0) {
      // 重複する結果を除外
      const filteredResults = results.filter(
        (newRestaurant) =>
          !restaurants.some(
            (existingRestaurant) => existingRestaurant.id === newRestaurant.id
          )
      );

      // 新しい結果を現在の飲食店リストに追加
      setRestaurants((prevRestaurants) => [
        ...prevRestaurants,
        ...filteredResults,
      ]);
      setStart(newStart);
    } else {
      // 新しい結果がない場合は、通知を表示するなどの処理を追加できます。
    }
  };

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                handleSearch={handleSearch}
                selectedArea={selectedArea}
                setSelectedArea={setSelectedArea}
                smallAreas={smallAreas}
                restaurants={restaurants}
                handleLoadMore={handleLoadMore}
              />
            }
          />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
