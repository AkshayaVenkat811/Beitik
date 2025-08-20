// src/components/PropertyCard/PropertyCard.jsx
import { Link } from "react-router-dom";
import styles from "./PropertyCard.module.css";

const PropertyCard = ({ property }) => {
  return (
    <div className={styles.propertyCard}>
      {/* Image */}
      <div className={styles.propertyImage}>
        <img
          src={property.image || (property.images && property.images[0])}
          alt={property.title}
        />
      </div>

      {/* Info */}
      <div className={styles.propertyInfo}>
        <div className={styles.propertyPrice}>{property.price}</div>
        <div className={styles.propertyTitle}>{property.title}</div>
        <div className={styles.propertyDetails}>{property.details}</div>

        <div className={styles.propertyRating}>
          <span className={styles.ratingBadge}>{property.rating} ⭐</span>
          {property.verified && (
            <span className={styles.verifiedBadge}>✅ Verified</span>
          )}
        </div>

        <Link
          to={`/property/${property.city}/${property.locality}/${property.id}`}
          className={styles.viewBtn}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
