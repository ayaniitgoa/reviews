import React, { useState } from "react";
import { Search } from "lucide-react"; // Using Lucide icon
import styles from "./SearchBar.module.css";

function SearchBar() {
  const [searchData] = useState([
    { id: 1, category: "Sports" },
    { id: 2, category: "Language Academy" },
  ]);
  const [searchString, setSearchString] = useState("");

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <Search className={styles.searchIcon} size={18} />
        <input
          type="text"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Search location, products, and much more"
          className={styles.searchInput}
        />
      </div>

      {searchString && (
        <div className={styles.searchResults}>
          {searchData.map((data) => (
            <div key={data.id} className={styles.resultItem}>
              {data.category}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
