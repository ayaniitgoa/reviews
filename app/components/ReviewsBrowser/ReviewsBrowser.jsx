import { useState } from "react";
import styles from "./ReviewsBrowser.module.css";
import CategoryGroupTabs from "../CategoryGroupTabs/CategoryGroupTabs.jsx";
import CategoryAccordions from "../CategoryAccordions/CategoryAccordions";
import EntityCardsGrid from "../EntityCardsGrid/EntityCardsGrid.jsx";
import { reviewData } from "../../data";

export default function ReviewsBrowser() {
  const [activeGroup, setActiveGroup] = useState(
    Object.keys(reviewData.groups)[0]
  );
  const [activeCategory, setActiveCategory] = useState(
    reviewData.groups[Object.keys(reviewData.groups)[0]].default
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleGroupChange = (group) => {
    setActiveGroup(group);
    setActiveCategory(reviewData.groups[group].default);
  };

  return (
    <div className={styles.reviewsBrowser}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search entities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <CategoryGroupTabs
        groups={Object.keys(reviewData.groups)}
        activeGroup={activeGroup}
        onGroupChange={handleGroupChange}
      />

      <div className={styles.reviewsContentArea}>
        <CategoryAccordions
          groupData={reviewData.groups[activeGroup]}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <div className={styles.entitiesContainer}>
          <EntityCardsGrid
            entities={
              reviewData.groups[activeGroup]?.categories[activeCategory] || []
            }
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </div>
  );
}
