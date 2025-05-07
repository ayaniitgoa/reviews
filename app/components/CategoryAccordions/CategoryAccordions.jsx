import styles from "./CategoryAccordions.module.css";

export default function CategoryAccordions({
  groupData,
  activeCategory,
  setActiveCategory,
}) {
  return (
    <div className={styles.categorySidebar}>
      {Object.keys(groupData.categories).map((category) => (
        <div
          key={category}
          className={`${styles.categoryItem} ${
            activeCategory === category ? styles.active : ""
          }`}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
}
