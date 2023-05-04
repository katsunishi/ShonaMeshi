// RestaurantItem.js
import React from "react";

function RestaurantItem({ restaurant }) {
  const openLink = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <div className="shopBlock">
      <img
        src={restaurant.image}
        alt={`${restaurant.name}の写真`}
        className="shopImg"
      />
      <h3 className="shopName">{restaurant.name}</h3>
      <p className="shopCatch">{restaurant.catchPhrase}</p>
      <p>{restaurant.detail}</p>
      <div className="shopBtn">
        <div
          className="btnText orange"
          onClick={() => openLink(restaurant.url)}
        >
          詳細はこちら
        </div>
      </div>
    </div>
  );
}

export default RestaurantItem;
