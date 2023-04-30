import React from "react";
import SearchForm from "./SearchForm";
import RestaurantList from "./RestaurantList";
import Hotpepper from "./Hotpepper";

function Home({
  handleSearch,
  selectedArea,
  setSelectedArea,
  smallAreas,
  restaurants,
  handleLoadMore,
}) {
  return (
    <div>
      <SearchForm
        onSearch={handleSearch}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
        smallAreas={smallAreas}
      />

      <RestaurantList restaurants={restaurants} />
      {restaurants.length === 0 && (
        <p>該当する飲食店が見つかりませんでした。</p>
      )}
      {restaurants.length > 0 && (
        <button className="more" onClick={handleLoadMore}>
          さらに表示
        </button>
      )}
      <Hotpepper />
    </div>
  );
}

export default Home;
