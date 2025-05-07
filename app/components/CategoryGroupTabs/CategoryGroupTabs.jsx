import styles from "./CategoryGroupTabs.module.css";

export default function CategoryGroupTabs({
  groups,
  activeGroup,
  onGroupChange,
}) {
  return (
    <div className={styles.categoryTabs}>
      {groups.map((group) => (
        <button
          key={group}
          className={`${styles.tabButton} ${
            activeGroup === group ? styles.active : ""
          }`}
          onClick={() => onGroupChange(group)}
        >
          {group}
        </button>
      ))}
    </div>
  );
}
