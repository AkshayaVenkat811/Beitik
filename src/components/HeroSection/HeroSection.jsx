import React, { useState } from 'react';
import styles from './HeroSection.module.css';
import { FiSearch, FiHome, FiCalendar, FiDollarSign, FiX } from 'react-icons/fi';
import BlidaImage from '../../images/Blida.jpeg';
import SearchResults from '../SearchResults/SearchResults'; // We'll create this component

const HeroSection = () => {
  const [searchMode, setSearchMode] = useState('buy');
  const [priceRange, setPriceRange] = useState({
    min: '',
    max: ''
  });
  const [searchQuery, setSearchQuery] = useState({
    location: '',
    propertyType: '',
    priceRange: '',
    minPrice: '',
    maxPrice: ''
  });
  const [showResults, setShowResults] = useState(false);

  const handlePriceChange = (e, type) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: e.target.value
    }));
  };

  const handleSearch = () => {
    // Collect search criteria
    const searchData = {
      location: document.querySelector(`.${styles.searchInput}[type="text"]`)?.value || '',
      propertyType: document.querySelector(`.${styles.searchSelect}`)?.value || '',
      priceRange: searchMode === 'buy' ? document.querySelector(`.${styles.searchSelect}:last-child`)?.value : '',
      minPrice: searchMode === 'rent' ? priceRange.min : '',
      maxPrice: searchMode === 'rent' ? priceRange.max : ''
    };
    
    setSearchQuery(searchData);
    setShowResults(true);
    
    // Scroll to results
    setTimeout(() => {
      document.getElementById('search-results').scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleInputChange = (e) => {
    // For location suggestions (you can implement this later)
  };

  return (
    <>
      <section 
        className={styles.hero}
        style={{ 
          background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
                      url(${BlidaImage}) center/cover no-repeat` 
        }}
      >
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.brandWrapper}>
              <h1 className={styles.logo}>Beitik</h1>
              <div className={styles.tagline}>Algeria's Premier Real Estate Platform</div>
            </div>
            
            <p className={styles.subtitle}>
              Discover exceptional properties across Algeria's most sought-after locations
            </p>

            {/* Search Tabs */}
            <div className={styles.searchTabs}>
              <div className={styles.tabButtons}>
                <button 
                  className={`${styles.tabButton} ${searchMode === 'buy' ? styles.active : ''}`}
                  onClick={() => setSearchMode('buy')}
                >
                  <FiHome className={styles.tabIcon} />
                  <span>Buy</span>
                </button>
                <button 
                  className={`${styles.tabButton} ${searchMode === 'rent' ? styles.active : ''}`}
                  onClick={() => setSearchMode('rent')}
                >
                  <FiDollarSign className={styles.tabIcon} />
                  <span>Rent</span>
                </button>
                <button 
                  className={`${styles.tabButton} ${searchMode === 'short-stay' ? styles.active : ''}`}
                  onClick={() => setSearchMode('short-stay')}
                >
                  <FiCalendar className={styles.tabIcon} />
                  <span>Short Stay</span>
                </button>
              </div>

              {/* Search Form */}
              <div className={styles.searchForm}>
                <div className={styles.searchField}>
                  <FiSearch className={styles.searchIcon} />
                  <input 
                    type="text" 
                    placeholder="Search by city, neighborhood or address..." 
                    className={styles.searchInput}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className={styles.searchField}>
                  <select className={styles.searchSelect}>
                    <option value="">Property Type</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="traditional">Traditional House</option>
                    <option value="studio">Studio</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
                
                {searchMode === 'short-stay' ? (
                  <div className={styles.dateFields}>
                    <div className={styles.searchField}>
                      <input type="date" className={styles.searchInput} placeholder="Check-in" />
                    </div>
                    <div className={styles.searchField}>
                      <input type="date" className={styles.searchInput} placeholder="Check-out" />
                    </div>
                  </div>
                ) : searchMode === 'rent' ? (
                  <div className={styles.priceRangeFields}>
                    <div className={styles.searchField}>
                      <input 
                        type="number" 
                        placeholder="Min Price (DZD)" 
                        className={styles.searchInput}
                        value={priceRange.min}
                        onChange={(e) => handlePriceChange(e, 'min')}
                      />
                    </div>
                    <div className={styles.searchField}>
                      <input 
                        type="number" 
                        placeholder="Max Price (DZD)" 
                        className={styles.searchInput}
                        value={priceRange.max}
                        onChange={(e) => handlePriceChange(e, 'max')}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={styles.searchField}>
                    <select className={styles.searchSelect}>
                      <option value="">Budget Range</option>
                      <option value="100-500">100,000 - 500,000 DZD</option>
                      <option value="500-1000">500,000 - 1,000,000 DZD</option>
                      <option value="1000-2000">1M - 2M DZD</option>
                      <option value="2000+">2M+ DZD</option>
                    </select>
                  </div>
                )}
                
                <button className={styles.searchButton} onClick={handleSearch}>
                  <FiSearch className={styles.searchBtnIcon} />
                  Search
                </button>
              </div>
            </div>

            {/* Premium Stats */}
            <div className={styles.premiumStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>10K+</span>
                <span className={styles.statLabel}>Premium Listings</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>26</span>
                <span className={styles.statLabel}>Algerian Provinces</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>98%</span>
                <span className={styles.statLabel}>Client Satisfaction</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>24/7</span>
                <span className={styles.statLabel}>Dedicated Support</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scrolling Indicator */}
        <div className={styles.scrollIndicator}>
          <span>Explore</span>
          <div className={styles.mouse}>
            <div className={styles.wheel}></div>
          </div>
        </div>
      </section>

      {/* Search Results Section */}
      {showResults && (
        <SearchResults 
          searchQuery={searchQuery} 
          searchMode={searchMode}
          onClose={() => setShowResults(false)}
        />
      )}
    </>
  );
};

export default HeroSection;