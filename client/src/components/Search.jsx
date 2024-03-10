import React from "react";
import "./search.css"; 

const Search = () => {
  return (
    <div className="search-container">
      <form className="search-form">
        <input type="text" className="search-input" placeholder="Enter division"/>
        <input type="text" className="search-input" placeholder="Enter district"/>
        <input type="text" className="search-input" placeholder="Enter Hospital Name"/>
        <button type="submit" className="search-button">Check</button>
      </form>
    </div>
  );
};

export default Search;
