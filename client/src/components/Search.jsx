import React from "react";

const Search = () => {
  return (
    <div>
      <h1>Search Hospital Bed</h1>
      <form >
        <input type="text" placeholder="Enter divison"/>
        <input type="text" placeholder="Enter district"/>
        <input type="text" placeholder="Enter  Hosital Name"/>
        <button type="submit">Check</button>
      </form>
    </div>
  );
};

export default Search;
