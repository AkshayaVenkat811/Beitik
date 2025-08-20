import React from 'react';
import styles from './PopularProperties.module.css';


import { Link } from 'react-router-dom';

const PopularProperties = () => {
  const properties = [
    {
      id: 'hydra-villa-1',
      city: 'algiers',
      locality: 'hydra',
      title: 'Luxury Villa in Hydra',
      price: '₹2,50,000 / month',
      details: '4 bedrooms • 3 bathrooms • 250m² • Private pool • Sea view',
      images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?...',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?...',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?...'
    ],
      rating: 4.8,
      verified: true
    },
    {
      id: 'bologhine-apartment-1',
      city: 'algiers',
      locality: 'bologhine',
      title: 'Entire villa in Ghardaia',
      price: '₹1,52,632 / 12 nights',
      details: '4 bedrooms • 6 beds • 4 bathrooms • Traditional architecture',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.5,
      verified: true
    },
    {
      id: 'hydra-apartment-1',
      city: 'algiers',
      locality: 'hydra',
      title: 'Modern villa in Bologhine',
      price: 'Contact for Price',
      details: '4 bedrooms • 6 beds • 4 bathrooms • Sea view • Private pool',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.7,
      verified: true
    }
  ];

  return (
    <section className={styles.popularProperties}>
      <div className={styles.container}>
        <h2>Popular Properties</h2>
        <p className={styles.subtitle}>
          Discover our most sought-after properties in Algeria's prime locations
        </p>
        
        <div className={styles.propertiesGrid}>
          {properties.map(property => (
            <div key={property.id} className={styles.propertyCard}>
              <div className={styles.propertyImage}>
  <img 
    src={property.image || (property.images && property.images[0])} 
    alt={property.title}
  />
</div>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProperties;