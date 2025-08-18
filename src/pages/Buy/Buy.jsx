import { useState, useEffect } from 'react';
// Corrected Buy.jsx imports
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';
import properties from "../../data/propertiesData";


const Buy = () => {
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [filters, setFilters] = useState({
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    location: ''
  });

  useEffect(() => {
    // Apply filters
    let results = properties;
    if (filters.propertyType) {
      results = results.filter(p => p.type === filters.propertyType);
    }
    if (filters.minPrice) {
      results = results.filter(p => p.price >= filters.minPrice);
    }
    // Add other filter conditions...
    setFilteredProperties(results);
  }, [filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className="w-full md:w-1/4">
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </div>
        
        {/* Property Listings */}
        <div className="w-full md:w-3/4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Properties for Sale</h1>
            <p className="text-gray-600">{filteredProperties.length} properties found</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;