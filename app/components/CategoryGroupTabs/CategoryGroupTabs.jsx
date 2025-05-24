import styles from "./CategoryGroupTabs.module.css";
import { motion } from "framer-motion";

export default function CategoryGroupTabs({
  groups,
  activeGroup,
  onGroupChange,
}) {
  return (
    <div className={styles.categoryTabs}>
      {groups.map((group) => (
        <motion.button
          key={group}
          className={`${styles.tabButton} ${
            activeGroup === group ? styles.active : ""
          }`}
          onClick={() => onGroupChange(group)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {group}
          {activeGroup === group && (
            <motion.div
              className={styles.activeIndicator}
              layoutId="activeTabIndicator"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}
