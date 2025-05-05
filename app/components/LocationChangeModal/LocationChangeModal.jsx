import React, { useState } from "react";
import styles from "./LocationChangeModal.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../../store/authStore";

function LocationChangeModal({ allCities, onClose }) {
  const [searchLocation, setSearchLocation] = useState("");
  const { setLocation } = useAuthStore();

  const filteredCities =
    allCities?.filter(
      (city) =>
        city.city.toLowerCase().includes(searchLocation.toLowerCase()) ||
        city.state.toLowerCase().includes(searchLocation.toLowerCase())
    ) || [];

  const onCitySelection = ({ city, state }) => {
    setLocation({ city, state });
    onClose(); // Close modal after selection
  };

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
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
        duration: 0.3,
      },
    },
    exit: {
      y: 20,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const cityItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
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
            <p className={styles.changeLocationHeader}>Change Location</p>
            <motion.button
              onClick={onClose}
              className={styles.closeButton}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              &times;
            </motion.button>
          </div>

          <div className={styles.innerModalContent}>
            <motion.input
              type="text"
              autoComplete="off"
              value={searchLocation}
              placeholder="Search Location"
              className={styles.searchLocationBar}
              onChange={(e) => setSearchLocation(e.target.value)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            />

            <div className={styles.cityListContainer}>
              <motion.div className={styles.cityList}>
                {filteredCities.map((city, i) => (
                  <motion.div
                    key={`${city.city}-${city.state}`}
                    className={styles.cityItem}
                    variants={cityItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    whileHover={{ backgroundColor: "#f5f5f5" }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.1 }} // Even faster transition
                    onClick={() =>
                      onCitySelection({
                        city: city.city,
                        state: city.state,
                      })
                    }
                  >
                    <p>{city.city}</p>
                    <p className={styles.stateModalText}>{city.state}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default LocationChangeModal;
