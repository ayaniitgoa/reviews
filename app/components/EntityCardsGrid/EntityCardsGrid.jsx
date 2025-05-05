import styles from "./EntityCardsGrid.module.css";

const entitiesData = {
  Hospitals: [
    { id: 1, name: "Sterling Hospital", rating: 4.5, reviews: 124 },
    { id: 2, name: "XYZ Hospital", rating: 3.8, reviews: 87 },
  ],
  Clinics: [
    { id: 3, name: "City Clinic", rating: 4.2, reviews: 56 },
    { id: 4, name: "Health Plus Clinic", rating: 3.9, reviews: 42 },
  ],
  
};

export default function EntityCardsGrid({ activeCategory, searchQuery }) {
  const filteredEntities =
    entitiesData[activeCategory]?.filter((entity) =>
      entity.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <div className={styles.entitiesGrid}>
      {filteredEntities.length > 0 ? (
        filteredEntities.map((entity) => (
          <div key={entity.id} className={styles.entityCard}>
            <h3 className={styles.entityName}>{entity.name}</h3>
            <div className={styles.ratingContainer}>
              <StarRating rating={entity.rating} />
              <span className={styles.reviewCount}>({entity.reviews})</span>
            </div>
            <div className={styles.viewReviews}>View Reviews →</div>
          </div>
        ))
      ) : (
        <div className={styles.noResults}>
          No entities found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
}

function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className={styles.starRating}>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={
            i < fullStars
              ? styles.filledStar
              : i === fullStars && hasHalfStar
              ? styles.halfStar
              : ""
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}
