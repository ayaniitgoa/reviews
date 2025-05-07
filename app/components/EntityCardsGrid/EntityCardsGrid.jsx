import styles from "./EntityCardsGrid.module.css";

export default function EntityCardsGrid({ entities, searchQuery }) {
  const filteredEntities = entities.filter((entity) =>
    entity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.entitiesGrid}>
      {filteredEntities.length > 0 ? (
        filteredEntities.map((entity) => (
          <div key={entity.id} className={styles.entityCard}>
            <div className={styles.entityName}>{entity.name}</div>
            <div className={styles.ratingContainer}>
              <div
                className={styles.starRating}
                style={{ "--rating": entity.rating }}
                aria-label={`Rating: ${entity.rating} out of 5`}
              ></div>
              <span className={styles.reviewCount}>({entity.rating})</span>
            </div>
            <button className={styles.viewReviews}>
              View Reviews ({entity.reviews}) →
            </button>
          </div>
        ))
      ) : (
        <div className={styles.noResults}>
          No results found for "{searchQuery}"
        </div>
      )}
    </div>
  );
}
