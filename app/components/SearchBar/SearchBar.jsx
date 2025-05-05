import React, { useState } from "react";
import styles from "./SearchBar.module.css";

function SearchBar() {
  const [searchData, setSearchData] = useState([
    { id: 1, category: "Sports" },
    { id: 2, category: "Language Academy" },
  ]);

  const [searchString, setSearchString] = useState("");

  return (
    <div className={`${styles.searchBox}`}>
      <input
        type="text"
        name=""
        id=""
        autoComplete="off"
        value={searchString}
        placeholder="Search location, products, and much more"
        className={`${styles.searchBar}`}
        onChange={(event) => {
          setSearchString(event.target.value);
        }}
      />
      {searchString && (
        <div className={`${styles.searchBoxBottom}`}>
          {searchData.map((data) => (
            <div key={data.id}>{data.category}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
