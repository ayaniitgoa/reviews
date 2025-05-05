import { useState } from "react";
import styles from "./ReviewsBrowser.module.css";
import CategoryGroupTabs from "../CategoryGroupTabs/CategoryGroupTabs.jsx";
import CategoryAccordions from "../CategoryAccordions/CategoryAccordions.jsx";
import EntityCardsGrid from "../EntityCardsGrid/EntityCardsGrid.jsx";

export default function ReviewsBrowser() {
  const [activeGroup, setActiveGroup] = useState("Healthcare");
  const [activeCategory, setActiveCategory] = useState("Hospitals");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className={styles.reviewsBrowser}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search entities..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <CategoryGroupTabs
        activeGroup={activeGroup}
        setActiveGroup={setActiveGroup}
        setActiveCategory={setActiveCategory}
      />

      <div className={styles.reviewsContentArea}>
        <CategoryAccordions
          activeGroup={activeGroup}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <div className={styles.entitiesContainer}>
          <EntityCardsGrid
            activeCategory={activeCategory}
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </div>
  );
}
