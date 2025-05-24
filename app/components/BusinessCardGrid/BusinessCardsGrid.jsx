import { useRouter } from "next/navigation";
import styles from "./BusinessCardsGrid.module.css";
import { motion } from "framer-motion";

export default function BusinessCardsGrid({ businesses, searchQuery }) {
  const router = useRouter();
  const filteredEntities = businesses.filter((business) =>
    business.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("busi", filteredEntities);

  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className={styles.fullStar}>
          ★
        </span>
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <span key="half" className={styles.halfStar}>
          ★
        </span>
      );
    }

    // Empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className={styles.emptyStar}>
          ★
        </span>
      );
    }

    return stars;
  };

  const handleViewReviews = (entityId) => {
    router.push(`/reviews/${entityId}`);
  };

  return (
    <div className={styles.entitiesGrid}>
      {filteredEntities.length > 0 ? (
        filteredEntities.map((entity) => (
          <motion.div
            key={entity.id}
            className={styles.entityCard}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className={styles.cardContent}>
              <div className={styles.entityName}>{entity.name}</div>
              <div className={styles.ratingContainer}>
                <div className={styles.starsContainer}>
                  {renderStars(entity.rating)}
                </div>
                <div className={styles.ratingDetails}>
                  <span className={styles.ratingNumber}>
                    {entity.rating.toFixed(1)}
                  </span>
                  <span className={styles.reviewCount}>
                    {entity.reviews} reviews
                  </span>
                </div>
              </div>
              <motion.button
                className={styles.viewReviews}
                onClick={() => handleViewReviews(entity.id)}
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                View Reviews
                <span className={styles.arrowIcon}>→</span>
              </motion.button>
            </div>
          </motion.div>
        ))
      ) : (
        <div className={styles.noResults}>
          <p>No results found for "{searchQuery}"</p>
          <p className={styles.suggestion}>Try a different search term</p>
        </div>
      )}
    </div>
  );
}
