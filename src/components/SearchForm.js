import React, { useState } from "react";
import izakayaPhoto from "../img/izakaya.jpg";
import midnightPhoto from "../img/midnight.jpg";
import shonandaiPhoto from "../img/shounandai.jpeg";
import fujisawaPhoto from "../img/fujisawa.jpg";
import tujidoPhoto from "../img/tujido.jpg";
import SearchIcon from "@mui/icons-material/Search";

function SearchForm({ onSearch, selectedArea, setSelectedArea, smallAreas }) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isIzakayaSelected, setIsIzakayaSelected] = useState(false);
  const [isMidnight, setIsMidnight] = useState(false);
  const [className, setClassName] = useState("optionImg1");
  const [scaleClassName, setScaleClassName] = useState("scale1");

  const handleSubmit = (event) => {
    event.preventDefault();
    const areaName = smallAreas.find(
      (area) => area.code === selectedArea
    )?.name;
    const keywordWithArea = areaName
      ? `${areaName} ${searchKeyword}`
      : searchKeyword;
    const keyword = isIzakayaSelected
      ? keywordWithArea + " 居酒屋"
      : keywordWithArea;
    onSearch(keywordWithArea, selectedArea, keyword, isMidnight);
  };

  const handleAreaClick = (areaCode) => {
    if (selectedArea === areaCode) {
      setSelectedArea("");
    } else {
      setSelectedArea(areaCode);
    }
  };

  const handleClick = () => {
    setClassName((prevClassName) =>
      prevClassName === "optionImg1" ? "optionImg2" : "optionImg1"
    );
    setScaleClassName((prevScaleClassName) =>
      prevScaleClassName === "scale1" ? "scale2" : "scale1"
    );
    setIsIzakayaSelected((prevState) => !prevState);
  };

  const handleMidnightClick = () => {
    setIsMidnight((prevState) => !prevState);
  };

  const handleTsujidoClick = () => {
    if (searchKeyword.includes("辻堂")) {
      setSearchKeyword(searchKeyword.replace("辻堂", "").trim());
    } else {
      setSearchKeyword(searchKeyword ? searchKeyword + " 辻堂" : "辻堂");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="Form">
      <label htmlFor="searchKeyword" className="Search">
        {" "}
      </label>
      <input
        type="text"
        placeholder="キーワードを入力してください"
        className="inputKeyword"
        id="searchKeyword"
        value={searchKeyword}
        onChange={(event) => setSearchKeyword(event.target.value)}
      />
      <button type="submit" className="searchIcon orange">
        {" "}
        <SearchIcon />
      </button>

      <div className="option">
        <div className="area">
          <h2>エリアから探す</h2>
          <div className="areas">
            {/* 湘南台エリア */}
            <div
              className={`scale ${
                selectedArea === "X293" ? "scale2" : "scale1"
              }`}
              onClick={() => handleAreaClick("X293")}
            >
              <div
                className={`optionImg ${
                  selectedArea === "X293" ? "optionImg2" : "optionImg1"
                }`}
              >
                <img src={shonandaiPhoto} alt="湘南台エリアの写真" />
              </div>
              <p className="imgText">湘南台</p>
            </div>

            {/* 藤沢エリア */}
            <div
              className={`scale ${
                selectedArea === "X290" ? "scale2" : "scale1"
              }`}
              onClick={() => handleAreaClick("X290")}
            >
              <div
                className={`optionImg ${
                  selectedArea === "X290" ? "optionImg2" : "optionImg1"
                }`}
              >
                <img src={fujisawaPhoto} alt="藤沢エリアの写真" />
              </div>
              <p className="imgText">藤沢</p>
            </div>
            <div
              className={`scale ${
                searchKeyword.includes("辻堂") ? "scale2" : "scale1"
              }`}
              onClick={handleTsujidoClick}
            >
              <div
                className={`optionImg ${
                  searchKeyword.includes("辻堂") ? "optionImg2" : "optionImg1"
                }`}
              >
                <img src={tujidoPhoto} alt="辻堂エリアの写真" />
              </div>
              <p className="imgText">辻堂</p>
            </div>
          </div>
        </div>
        <div className="junl">
          <h2>ジャンルから探す</h2>
          {/* 23時以降営業可能か */}
          <div className="junls">
            <div
              className={`scale ${isMidnight ? "scale2" : "scale1"}`}
              onClick={handleMidnightClick}
            >
              <div
                className={`optionImg ${
                  isMidnight ? "optionImg2" : "optionImg1"
                }`}
              >
                <img src={midnightPhoto} alt="23時以降可能の写真" />
              </div>
              <p className="imgText">23時以降⚪︎</p>
            </div>
            {/* 検索ワードに居酒屋を含めるか */}
            <div className={`scale ${scaleClassName}`}>
              <div className={`optionImg ${className}`} onClick={handleClick}>
                <img src={izakayaPhoto} alt="居酒屋の写真" />
              </div>
              <p className="imgText">居酒屋</p>
            </div>
          </div>
        </div>
      </div>
      <button type="submit" className="SearchBtn orange">
        <SearchIcon className="SearchIcon2" /> 上記の内容で検索
      </button>
    </form>
  );
}

export default SearchForm;
