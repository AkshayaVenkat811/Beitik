// src/components/SearchResults/SearchResults.jsx
import React from 'react';
import { FiX, FiMapPin, FiHome, FiDollarSign } from 'react-icons/fi';
import styles from './SearchResults.module.css';

// Mock data for demonstration
const mockProperties = [
  {
    id: 1,
    title: "Modern Apartment in Algiers",
    location: "Algiers Center",
    price: "4,500,000 DZD",
    type: "apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: "120m²",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Luxury Villa in Hydra",
    location: "Hydra, Algiers",
    price: "12,000,000 DZD",
    type: "villa",
    bedrooms: 5,
    bathrooms: 4,
    area: "350m²",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Cozy Studio in Bab Ezzouar",
    location: "Bab Ezzouar, Algiers",
    price: "2,800,000 DZD",
    type: "studio",
    bedrooms: 1,
    bathrooms: 1,
    area: "45m²",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    title: "Traditional House in Casbah",
    location: "Casbah, Algiers",
    price: "6,750,000 DZD",
    type: "traditional",
    bedrooms: 4,
    bathrooms: 2,
    area: "180m²",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&auto=format&fit=crop&q=80"
  }
];

const SearchResults = ({ searchQuery, searchMode, onClose }) => {
  return (
    <div id="search-results" className={styles.searchResults}>
      <div className={styles.resultsHeader}>
        <div className={styles.resultsInfo}>
          <h2>Search Results</h2>
          <p>
            {searchMode === 'buy' ? 'Properties for Sale' : 
             searchMode === 'rent' ? 'Properties for Rent' : 'Short Stay Properties'} 
            in {searchQuery.location || 'Algeria'}
          </p>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          <FiX />
        </button>
      </div>

      <div className={styles.filtersApplied}>
        {searchQuery.propertyType && (
          <span className={styles.filterTag}>Type: {searchQuery.propertyType}</span>
        )}
        {searchQuery.priceRange && (
          <span className={styles.filterTag}>Budget: {searchQuery.priceRange}</span>
        )}
        {(searchQuery.minPrice || searchQuery.maxPrice) && (
          <span className={styles.filterTag}>
            Price: {searchQuery.minPrice || '0'} - {searchQuery.maxPrice || '∞'} DZD
          </span>
        )}
      </div>

      <div className={styles.resultsContainer}>
        <div className={styles.resultsCount}>
          Found {mockProperties.length} properties
        </div>
        
        <div className={styles.propertiesList}>
          {mockProperties.map(property => (
            <div key={property.id} className={styles.propertyCard}>
              <div className={styles.propertyImage}>
                <img src={property.image} alt={property.title} />
              </div>
              
              <div className={styles.propertyDetails}>
                <h3 className={styles.propertyTitle}>{property.title}</h3>
                <p className={styles.propertyLocation}>
                  <FiMapPin /> {property.location}
                </p>
                
                <div className={styles.propertyFeatures}>
                  <span><FiHome /> {property.type}</span>
                  <span>{property.bedrooms} Bedrooms</span>
                  <span>{property.bathrooms} Bathrooms</span>
                  <span>{property.area}</span>
                </div>
                
                <div className={styles.propertyPrice}>
                  <FiDollarSign /> {property.price}
                </div>
                
                <button className={styles.viewDetailsButton}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;