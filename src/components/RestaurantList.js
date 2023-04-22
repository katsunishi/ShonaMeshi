// RestaurantList.js
import React from "react";
import RestaurantItem from "./RestaurantItem";

function RestaurantList({ restaurants }) {
  return (
    <div>
      <h2 className="shops">飲食店一覧</h2>
      <div className="shopBody">
        {restaurants.map((restaurant) => (
          <RestaurantItem key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}

export default RestaurantList;
