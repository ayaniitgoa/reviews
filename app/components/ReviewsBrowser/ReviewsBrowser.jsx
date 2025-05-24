import { useState, useEffect } from "react";
import styles from "./ReviewsBrowser.module.css";
import CategoryGroupTabs from "../CategoryGroupTabs/CategoryGroupTabs.jsx";
import CategoryAccordions from "../CategoryAccordions/CategoryAccordions";
import BusinessCardsGrid from "../BusinessCardGrid/BusinessCardsGrid.jsx";
import { FiSearch } from "react-icons/fi";
import { getBusinesses } from "@/app/providers/BusinessProvider";
import { useAuthStore } from "../../store/authStore";

export default function ReviewsBrowser() {
  const [apiData, setApiData] = useState({ groups: {} });
  const [activeGroup, setActiveGroup] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { location } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      if (location?.locationid) {
        try {
          const data = await getBusinesses(location.locationid);
          setApiData(data);

          // Set initial active group and category
          const firstGroup = Object.keys(data.groups)[0];
          if (firstGroup) {
            setActiveGroup(firstGroup);
            setActiveCategory(data.groups[firstGroup]?.default || "");
          }
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      }
    };
    fetchData();
  }, [location?.locationid]);

  const handleGroupChange = (group) => {
    setActiveGroup(group);
    setActiveCategory(apiData.groups[group]?.default || "");
  };

  // Get current businesses to display
  const currentBusinesses =
    activeGroup && activeCategory
      ? apiData.groups[activeGroup]?.categories[activeCategory] || []
      : [];

  return (
    <div className={styles.reviewsBrowser}>
      <div className={styles.searchContainer}>
        <div className={styles.searchInputWrapper}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search hospitals, clinics, or providers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.tabsContainer}>
        <CategoryGroupTabs
          groups={Object.keys(apiData.groups)}
          activeGroup={activeGroup}
          onGroupChange={handleGroupChange}
        />
      </div>

      <div className={styles.reviewsContentArea}>
        <aside className={styles.sidebar}>
          {activeGroup && (
            <CategoryAccordions
              groupData={apiData.groups[activeGroup]}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          )}
        </aside>

        <main className={styles.mainContent}>
          <BusinessCardsGrid
            businesses={currentBusinesses}
            searchQuery={searchQuery}
          />
        </main>
      </div>
    </div>
  );
}
