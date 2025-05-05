import styles from "./CategoryGroupTabs.module.css";

const groups = ["Healthcare", "Sports", "Education"];

export default function CategoryGroupTabs({
  activeGroup,
  setActiveGroup,
  setActiveCategory,
}) {
  const handleGroupChange = (group) => {
    setActiveGroup(group);
    setActiveCategory(
      group === "Healthcare"
        ? "Hospitals"
        : group === "Sports"
        ? "Cricket"
        : "Schools"
    );
  };

  return (
    <div className={styles.categoryTabs}>
      {groups.map((group) => (
        <button
          key={group}
          className={`${styles.tabButton} ${
            activeGroup === group ? styles.active : ""
          }`}
          onClick={() => handleGroupChange(group)}
        >
          {group}
        </button>
      ))}
    </div>
  );
}
