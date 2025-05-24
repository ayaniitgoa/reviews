import React, { useState } from "react";
import styles from "./LocationChangeModal.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import { Search, X } from "lucide-react"; // Added more icons

function LocationChangeModal({ allCities, onClose }) {
  const [searchLocation, setSearchLocation] = useState("");
  const { setLocation } = useAuthStore();

  const filteredCities =
    allCities?.filter(
      (city) =>
        city.city.toLowerCase().includes(searchLocation.toLowerCase()) ||
        city.state.toLowerCase().includes(searchLocation.toLowerCase())
    ) || [];

  const onCitySelection = ({ locationid, city, state }) => {
    setLocation({ locationid, city, state });
    console.log("locationwith id", location);

    onClose();
  };

  // Enhanced animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const modalVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.4,
      },
    },
    exit: {
      y: 20,
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cityItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.modalOverlay}
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <motion.div
          className={styles.modal}
          variants={modalVariants}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>Select Your Location</h3>
            <motion.button
              onClick={onClose}
              className={styles.closeButton}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </motion.button>
          </div>

          <div className={styles.searchContainer}>
            <Search size={18} className={styles.searchIcon} />
            <motion.input
              type="text"
              autoComplete="off"
              value={searchLocation}
              placeholder="Search city or state..."
              className={styles.searchInput}
              onChange={(e) => setSearchLocation(e.target.value)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            />
          </div>

          <div className={styles.cityListContainer}>
            <motion.ul className={styles.cityList}>
              {filteredCities.map((city, i) => (
                <motion.li
                  key={`${city.city}-${city.state}`}
                  className={styles.cityItem}
                  variants={cityItemVariants}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover={{
                    backgroundColor: "rgba(219, 42, 42, 0.05)",
                    borderLeft: "3px solid #db2a2a",
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    onCitySelection({
                      locationid: city.locationid,
                      city: city.city,
                      state: city.state,
                    })
                  }
                >
                  <div className={styles.cityInfo}>
                    <span className={styles.cityName}>{city.city}</span>
                    <span className={styles.stateName}>{city.state}</span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default LocationChangeModal;
