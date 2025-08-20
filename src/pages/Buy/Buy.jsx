// src/pages/Buy/Buy.jsx
import { useState, useEffect } from "react";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import properties from "../../data/propertiesData";
import styles from "./Buy.module.css"; // New CSS module for this page

const Buy = () => {
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [filters, setFilters] = useState({
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    location: "",
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    let results = properties;

    if (filters.propertyType) {
      results = results.filter((p) => p.type === filters.propertyType);
    }
    if (filters.minPrice) {
      results = results.filter((p) => p.price >= filters.minPrice);
    }
    if (filters.maxPrice) {
      results = results.filter((p) => p.price <= filters.maxPrice);
    }
    if (filters.bedrooms) {
      results = results.filter((p) => p.bedrooms >= filters.bedrooms);
    }
    if (filters.location) {
      results = results.filter((p) =>
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredProperties(results);
  }, [filters]);

  const clearFilters = () => {
    setFilters({
      propertyType: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      location: "",
    });
  };

  return (
    <div className={styles.buyPage}>
      <div className={styles.container}>
        {/* Header Section - Centered */}
        <div className={styles.header}>
          <h1 className={styles.title}>Properties for Sale</h1>
          <p className={styles.subtitle}>
            {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
          </p>
          
          {/* Mobile Filter Toggle */}
          <button 
            className={styles.mobileFilterToggle}
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <span>Filters</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M7 12H17M9 18H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className={styles.content}>
          {/* Sidebar - Hidden on mobile unless toggled */}
          <div className={`${styles.sidebar} ${showMobileFilters ? styles.sidebarOpen : ''}`}>
            <div className={styles.sidebarHeader}>
              <h2>Filters</h2>
              <button className={styles.clearButton} onClick={clearFilters}>
                Clear all
              </button>
            </div>
            <FilterSidebar filters={filters} setFilters={setFilters} />
            
            {/* Close button for mobile */}
            <button 
              className={styles.closeSidebar}
              onClick={() => setShowMobileFilters(false)}
            >
              Apply Filters
            </button>
          </div>

          {/* Overlay for mobile when sidebar is open */}
          {showMobileFilters && (
            <div 
              className={styles.overlay}
              onClick={() => setShowMobileFilters(false)}
            />
          )}

          {/* Property Listings */}
          <div className={styles.listings}>
            <div className={styles.propertiesGrid}>
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))
              ) : (
                <div className={styles.noResults}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22V16M12 16L15 19M12 16L9 19M3 10H21M7 10V6C7 4.89543 7.89543 4 9 4H15C16.1046 4 17 4.89543 17 6V10M5 10V18C5 19.1046 5.89543 20 7 20H17C18.1046 20 19 19.1046 19 18V10" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <h3>No properties found</h3>
                  <p>Try adjusting your filters to see more results</p>
                  <button className={styles.clearButton} onClick={clearFilters}>
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;