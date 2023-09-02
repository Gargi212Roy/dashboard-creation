import React, { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import search from "../assets/search.svg";
import "../stylesheets/search.scss";

function Search({ setFilterData, handleFilterChange, channelRef }) {
  const [searchTags, setSearchTags] = useState([]);

  useEffect(() => {
    channelRef.current.listen("handleInputChange", (searchData) => {
      setSearchTags(searchData);
      setFilterData(searchData);
    });
    channelRef.current.listen("handleRemoveTags", (removeFilters) => {
      setSearchTags(removeFilters);
      setFilterData(removeFilters);
      handleFilterChange();
    });
  }, []);

  const handleInputChange = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      const searchData = [...searchTags, e.target.value];
      setSearchTags(searchData);
      setFilterData(searchData);
      channelRef.current.publish("handleInputChange", searchData);
      e.target.value = "";
    }
  };

  const handleRemoveTags = (indexToRemove) => {
    const removeFilters = searchTags.filter(
      (_, index) => index !== indexToRemove
    );
    setSearchTags(removeFilters);
    setFilterData(removeFilters);
    handleFilterChange();
    channelRef.current.publish("handleRemoveTags", removeFilters);
  };

  return (
    <div className="search-bar-container">
      {" "}
      <img src={search} alt="" />{" "}
      <div className="search-container">
        <ul>
          {searchTags &&
            searchTags.map((tag, index) => {
              return (
                <li key={index}>
                  {tag}
                  <MdCancel
                    className="cancel-icon"
                    onClick={() => handleRemoveTags(index)}
                  />
                </li>
              );
            })}
        </ul>
        <input
          type="text"
          placeholder="Type to Search"
          onKeyUp={handleInputChange}
        />
      </div>
    </div>
  );
}

export default Search;
