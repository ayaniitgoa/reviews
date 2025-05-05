import styles from "./CategoryAccordions.module.css";

const categories = {
  Healthcare: ["Hospitals", "Clinics", "Pharmacies"],
  Sports: ["Cricket", "Tennis", "Swimming"],
  Education: ["Schools", "Colleges", "Training Centers"],
};

export default function CategoryAccordions({
  activeGroup,
  activeCategory,
  setActiveCategory,
}) {
  return (
    <div className={styles.categorySidebar}>
      {categories[activeGroup]?.map((category) => (
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
