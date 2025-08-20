import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import propertiesData from "../../data/propertiesData";
import "./PropertyDetails.css";

const PropertyDetails = () => {
  const { city, locality, id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);

  const property = propertiesData.find(
    (p) => p.city === city && p.locality === locality && p.id === id
  );

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    setCheckInDate(today.toISOString().split("T")[0]);
    setCheckOutDate(tomorrow.toISOString().split("T")[0]);

    window.scrollTo(0, 0);
  }, []);

  // Function to get all images for a property
  const getPropertyImages = (property) => {
    if (!property) return [];
    
    // If property has an images array, use it
    if (property.images && Array.isArray(property.images) && property.images.length > 0) {
      return property.images;
    }
    
    // If property has a single image field, convert it to an array
    if (property.image) {
      return [property.image];
    }
    
    // Return empty array if no images found
    return [];
  };

  const propertyImages = getPropertyImages(property);

  if (!property) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-red-600">⚠️ Property not found</h2>
        <p className="mt-2 text-gray-600">
          The property you are looking for does not exist.
        </p>
      </div>
    );
  }

  const totalPrice = property.price + 5000 + 7500;

  return (
    <div className="property-details-section">
      <div className="container">
        <button
          className="btn btn-secondary back-btn"
          onClick={() => window.history.back()}
        >
          ← Back to properties
        </button>

        <div className="property-header">
          <h1 className="property-title">{property.title || "Untitled Property"}</h1>
          <div className="property-location">
            <span>📍</span>
            <span>
              {property.locality || "Unknown Locality"},{" "}
              {property.city || "Unknown City"}, Algeria
            </span>
          </div>
          <div className="property-rating">
            <span className="rating-badge">
              {property.rating || "N/A"} ⭐
            </span>
            <span className="verified-badge">Verified Property</span>
          </div>
        </div>

        <div className="property-gallery">
          <div
            className="main-image"
            style={{
              backgroundImage: propertyImages.length > 0
                ? `url(${propertyImages[currentImage]})`
                : "none",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            onClick={() =>
              propertyImages.length > 0 &&
              setCurrentImage((currentImage + 1) % propertyImages.length)
            }
          >
            {/* Fallback content if image fails to load */}
            {propertyImages.length === 0 && (
              <div className="image-placeholder">
                <span>No Image Available</span>
              </div>
            )}
          </div>

          {propertyImages.length > 0 ? (
            propertyImages.slice(0, 4).map((img, index) => (
              <div
                key={index}
                className="secondary-image"
                style={{ 
                  backgroundImage: `url(${img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                onClick={() => setCurrentImage(index)}
              >
                {/* Fallback for thumbnail images */}
                {!img && (
                  <div className="thumbnail-placeholder">
                    <span>Image {index + 1}</span>
                  </div>
                )}
              </div>
            ))
          ) : (
            // Show placeholders if no images
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="secondary-image placeholder"
              >
                <div className="thumbnail-placeholder">
                  <span>No Image</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Rest of your component remains the same */}
        <div className="property-content">
          <div className="property-main">
            {/* Highlights */}
            <div className="property-highlights">
              <div className="highlight-card">
                <span className="highlight-icon">🏠</span>
                <div className="highlight-content">
                  <h4>Entire {property.type || "Property"}</h4>
                  <p>
                    You'll have the {property.type || "property"} to yourself with
                    private amenities
                  </p>
                </div>
              </div>
              <div className="highlight-card">
                <span className="highlight-icon">🧼</span>
                <div className="highlight-content">
                  <h4>Enhanced cleaning</h4>
                  <p>Professional cleaning with hospital-grade disinfectants</p>
                </div>
              </div>
              <div className="highlight-card">
                <span className="highlight-icon">📍</span>
                <div className="highlight-content">
                  <h4>Prime location</h4>
                  <p>Walking distance to finest restaurants and attractions</p>
                </div>
              </div>
              <div className="highlight-card">
                <span className="highlight-icon">🔑</span>
                <div className="highlight-content">
                  <h4>Smart access</h4>
                  <p>Keyless entry with digital passcode</p>
                </div>
              </div>
            </div>

            {/* Host */}
            {property.owner && (
              <div className="property-host">
                <div className="host-avatar">{property.owner.avatar || "👤"}</div>
                <div className="host-info">
                  <h3>Hosted by {property.owner.name || "Unknown Host"}</h3>
                  <p className="host-description">
                    Luxury property specialist with years of experience hosting
                    discerning guests. Committed to providing exceptional stays
                    with personalized service.
                  </p>
                  <div className="host-contact">
                    <button className="contact-btn call">Call Host</button>
                    <button className="contact-btn message">Message</button>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="property-description">
              <p>{property.description || "Experience luxury living in this exquisite property that combines contemporary design with functional elegance. The spacious layout is perfect for both relaxation and entertainment, featuring high-quality finishes throughout. Located in a desirable neighborhood, you'll enjoy proximity to fine dining, cultural attractions, and recreational facilities while maintaining a peaceful residential atmosphere."}</p>

              {property.area && (
                <>
                  <p>The {property.area}m² residence features:</p>
                  <ul>
                    <li>{property.bedrooms || 0} en-suite bedrooms</li>
                    <li>Chef's kitchen with modern appliances</li>
                    <li>Open-plan living with abundant natural light</li>
                    <li>Private outdoor space with beautiful views</li>
                    <li>Modern amenities and smart home features</li>
                  </ul>
                </>
              )}
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="amenities-section">
                <h2>Premium Amenities</h2>
                <div className="amenities-grid">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="amenity-item">
                      <span className="amenity-icon">✅</span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Map */}
            <div className="property-map">
              <h2>Location</h2>
              <div className="map-container">
                <iframe
                  title="property-location"
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25580.42348373653!2d3.0241555!3d36.7538943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb3a60f9cd9d9%3A0x3e52e7b5f6a3c1a1!2s${property.locality || ""}%2C%20${property.city || ""}%2C%20Algeria!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Booking */}
          <div className="property-booking">
            <div className="booking-card">
              <div className="price-section">
                <span className="price">
                  ₹{property.price?.toLocaleString() || "N/A"}
                </span>
                <span className="per-night">/ month</span>
              </div>

              <div className="date-picker">
                <div className="date-input">
                  <label>CHECK-IN</label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                  />
                </div>
                <div className="date-input">
                  <label>CHECKOUT</label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    min={checkInDate}
                  />
                </div>
              </div>

              <div className="guests-input">
                <label>GUESTS</label>
                <input
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                  min="1"
                  max="10"
                />
              </div>

              <button className="book-btn">Reserve Now</button>

              <div className="price-breakdown">
                <div className="price-row">
                  <span>₹{property.price?.toLocaleString() || "N/A"} x 1 month</span>
                  <span>₹{property.price?.toLocaleString() || "N/A"}</span>
                </div>
                <div className="price-row">
                  <span>Luxury cleaning fee</span>
                  <span>₹5,000</span>
                </div>
                <div className="price-row">
                  <span>Concierge service</span>
                  <span>₹7,500</span>
                </div>
                <div className="price-row total">
                  <span>Total (INR)</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;