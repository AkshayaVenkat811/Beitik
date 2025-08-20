// src/pages/Buy/Buy.jsx
import { useState, useEffect } from "react";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import properties from "../../data/propertiesData";
import styles from "../../components/PropertyCard/PropertyCard.module.css"; // reuse same grid styles



const Buy = () => {
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [filters, setFilters] = useState({
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    location: "",
  });

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

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="container mx-auto px-4 pb-8 min-h-screen" style={{ marginTop: '6rem' }}>

        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </div>

        {/* Property Listings */}
        <div className="w-full md:w-3/4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Properties for Sale</h1>
            <p className="text-gray-600">
              {filteredProperties.length} properties found
            </p>
          </div>

          <div className={styles.propertiesGrid}>
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;
