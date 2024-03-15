import React, { useRef } from "react";
import "./search.css";
import axios from "axios"

const Search = () => {
  const divison = useRef();
  const district = useRef();
  const hospital_name = useRef();

  const clickHandler = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/hospital/information",{
      divison:divison.current.value,
      district:district.current.value,
      hospital_name:hospital_name.current.value,

    })
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={clickHandler}>
        <input
          type="text"
          className="search-input"
          placeholder="Enter division"
          ref={divison}
        />
        <input
          type="text"
          className="search-input"
          placeholder="Enter district"
          ref={district}
        />
        <input
          type="text"
          className="search-input"
          placeholder="Enter Hospital Name"
          ref={hospital_name}
        />
        <button type="submit" className="search-button">
          Check
        </button>
      </form>
    </div>
  );
};

export default Search;
