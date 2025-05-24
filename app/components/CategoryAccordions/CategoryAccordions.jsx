import styles from "./CategoryAccordions.module.css";
import { motion } from "framer-motion";

export default function CategoryAccordions({
  groupData,
  activeCategory,
  setActiveCategory,
}) {
  return (
    <div className={styles.categorySidebar}>
      {Object.keys(groupData.categories).map((category) => (
        <motion.div
          key={category}
          className={`${styles.categoryItem} ${
            activeCategory === category ? styles.active : ""
          }`}
          onClick={() => setActiveCategory(category)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <span className={styles.categoryText}>{category}</span>
          {activeCategory === category && (
            <motion.div
              className={styles.activeIndicator}
              layoutId="activeIndicator"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
