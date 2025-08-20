// src/pages/Rent/Rent.jsx
import { useState, useEffect } from "react";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import rentalProperties from "../../data/rentalPropertiesData";
import styles from "../../components/PropertyCard/PropertyCard.module.css";

const Rent = () => {
  const [filteredProperties, setFilteredProperties] = useState(rentalProperties);
  const [filters, setFilters] = useState({
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    location: "",
  });

  useEffect(() => {
    let results = rentalProperties;

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
    <div className="container mx-auto px-4 pb-8 min-h-screen" style={{ marginTop: '6rem' }}>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </div>

        {/* Property Listings */}
        <div className="w-full md:w-3/4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Properties for Rent</h1>
            <p className="text-gray-600">
              {filteredProperties.length} rental properties found
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

export default Rent;
