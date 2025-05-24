import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./ReviewDetails.module.css";
import TopBar from "@/app/components/TopBar/TopBar";
import { addReviews, getReviews } from "@/app/providers/ReviewProvider";
import { getBusiness } from "@/app/providers/BusinessProvider";
import { useAuthStore } from "../../store/authStore";

export default function ReviewDetails() {
  const { businessid } = useParams();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [businessData, setBusinessData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();

  const toSentenceCase = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const businessInfo = await getBusiness({ businessid });
        setBusinessData(businessInfo.business);

        const allReviews = await getReviews({ businessid });
        const formattedReviews = allReviews.reviews.map((review) => ({
          ...review,
          body: toSentenceCase(review.body),
          date: new Date(review.created_at || new Date()).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "short",
              day: "numeric",
            }
          ),
        }));
        setReviews(formattedReviews);

        if (allReviews.reviews?.length > 0) {
          const sum = allReviews.reviews.reduce((acc, review) => {
            return acc + parseFloat(review.rating);
          }, 0);
          setAverageRating(sum / allReviews.reviews.length);
          setTotalReviews(allReviews.reviews.length);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [businessid]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (rating === 0 || !reviewText.trim()) return;

    const newReview = {
      rating: rating.toString(),
      body: toSentenceCase(reviewText),
      created_at: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      businessid: businessid,
      email: user.email,
      name: user.name,
    };

    setReviews([newReview, ...reviews]);
    setReviewText("");
    setRating(0);
    setShowReviewForm(false);

    setAverageRating(
      (averageRating * totalReviews + rating) / (totalReviews + 1)
    );
    setTotalReviews(totalReviews + 1);
    addReviews(newReview);
    console.log("addreview", newReview);
  };

  const getColor = (rating) => {
    const num = Math.floor(rating);
    switch (num) {
      case 1:
        return "#E3D095";
      case 2:
        return "#E3D095";
      case 3:
        return "#E3D095";
      case 4:
        return "#E3D095";
      case 5:
        return "#E3D095";
      default:
        return "#E3D095";
    }
  };

  const calculateStarCounts = () => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      const roundedRating = Math.floor(parseFloat(review.rating));
      counts[roundedRating] = (counts[roundedRating] || 0) + 1;
    });
    return counts;
  };

  const starCounts = calculateStarCounts();

  if (isLoading) {
    return (
      <div className="">
        <TopBar />
        <div className={styles.container}>
          <p>Loading business details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <TopBar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>{businessData?.name || "Business"}</h1>
          {businessData?.description && (
            <p className={styles.description}>{businessData.description}</p>
          )}
          <p className={styles.address}>
            📍 {businessData?.address || "123 Medical Drive, City, State"}
          </p>
          <div className={styles.ratingContainer}>
            <span>
              <span className={styles.ratingNumberTop}>
                {averageRating.toFixed(1)}
              </span>
              <span className={styles.outOf5Stars}> /5 stars</span>
            </span>
            <div
              className={styles.starRating}
              style={{ "--rating": averageRating }}
              aria-label={`Rating: ${averageRating.toFixed(1)} out of 5`}
            ></div>
          </div>

          <div className={styles.ratingDistribution}>
            {[5, 4, 3, 2, 1].map((stars) => {
              const percentage =
                reviews.length > 0
                  ? (starCounts[stars] / reviews.length) * 100
                  : 0;

              return (
                <div key={stars} className={styles.ratingBar}>
                  <div className={styles.stars} aria-label={`${stars} stars`}>
                    {stars} Stars
                  </div>
                  <div className={styles.barContainer}>
                    <div
                      className={styles.bar}
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: getColor(stars),
                      }}
                    ></div>
                  </div>
                  <span className={styles.count}>{starCounts[stars] || 0}</span>
                </div>
              );
            })}
          </div>
          <button
            className={styles.addReviewButton}
            onClick={() => setShowReviewForm(!showReviewForm)}
            aria-expanded={showReviewForm}
          >
            {showReviewForm ? "Cancel" : "Add Review"}
          </button>
        </div>

        {showReviewForm && (
          <form onSubmit={handleSubmitReview} className={styles.reviewForm}>
            <h3 className={styles.formTitle}>Write a Review</h3>
            <div className={styles.ratingInput}>
              <p className={styles.ratingLabel}>Your Rating*</p>
              <div className={styles.starInput}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className={`${styles.star} ${
                      star <= (hoverRating || rating) ? styles.filled : ""
                    }`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
                  >
                    <span className={styles.starIcon}>★</span>
                  </button>
                ))}
              </div>
              <div className={styles.ratingHint}>
                {rating === 0
                  ? "Select your rating"
                  : rating === 1
                  ? "Poor"
                  : rating === 2
                  ? "Fair"
                  : rating === 3
                  ? "Good"
                  : rating === 4
                  ? "Very Good"
                  : "Excellent"}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="reviewText" className={styles.textareaLabel}>
                Your Review*
              </label>
              <textarea
                id="reviewText"
                className={styles.reviewTextarea}
                placeholder="Share details about your experience..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
                maxLength={500}
                aria-label="Review text"
              />
              <div className={styles.charCount}>
                {reviewText.length}/500 characters
              </div>
            </div>
            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => {
                  setShowReviewForm(false);
                  setRating(0);
                  setReviewText("");
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={rating === 0 || !reviewText.trim()}
              >
                Submit Review
              </button>
            </div>
          </form>
        )}

        <div className={styles.reviewsSection}>
          <h2>
            Reviews{" "}
            <span className={styles.reviewCount}>
              ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
            </span>
          </h2>

          {reviews.length === 0 ? (
            <div className={styles.emptyState}>
              No reviews yet. Be the first to review!
            </div>
          ) : (
            reviews.map((review) => {
              const ratingNum = parseFloat(review.rating);
              return (
                <div
                  key={review.reviewid}
                  className={styles.reviewCard}
                  style={{ "--border-color": getColor(ratingNum) }}
                >
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewer}>
                      {review.user_name ? review.user_name : "Anonymous"}
                    </div>
                    <div className={styles.reviewRating}>
                      {"★".repeat(Math.floor(ratingNum))}
                      {"☆".repeat(5 - Math.floor(ratingNum))}
                      <span className={styles.ratingNumber}>
                        ({ratingNum.toFixed(1)})
                      </span>
                    </div>
                  </div>
                  <p className={styles.reviewText}>{review.body}</p>
                  <div className={styles.reviewDate}>{review.date}</div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
