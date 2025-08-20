// src/pages/ShortStay/ShortStay.jsx
import React from "react";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import styles from "../../components/PropertyCard/PropertyCard.module.css";

const properties = [
  {
    id: 1,
    title: "Modern Studio Apartment",
    location: "Downtown City",
    price: "$80/night",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Beachside Bungalow",
    location: "Coastal Area",
    price: "$150/night",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Luxury Penthouse Suite",
    location: "Uptown",
    price: "$220/night",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
  },
];

const ShortStay = () => {
  return (
    <div className="container mx-auto px-4 pb-8 min-h-screen" style={{ marginTop: '6rem' }}>

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Short Stay Rentals</h1>
        <p className="text-gray-600">{properties.length} properties found</p>
      </div>

      <div className={styles.propertiesGrid}>
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default ShortStay;
