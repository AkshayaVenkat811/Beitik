// src/components/PropertyCard/PropertyCard.jsx
import React from "react";

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      {/* Image */}
         <img 
  src={property.image} 
  alt={property.title} 
  style={{ 
    maxWidth: "600px",   // limit width
    width: "100%",       // make it responsive
    height: "auto",      // keep aspect ratio
    objectFit: "cover",  // crop instead of stretching
    borderRadius: "12px" // optional, rounded corners
  }} 
/>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold">{property.title}</h2>
        <p className="text-gray-600">{property.location}</p>
        <p className="text-blue-600 font-bold mt-2">${property.price}</p>
      </div>
    </div>
  );
};


export default PropertyCard;
