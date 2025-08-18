import { useParams } from "react-router-dom";
import propertiesData from "../../data/propertiesData";

const PropertyDetails = () => {
  const { city, locality, id } = useParams();

  const property = propertiesData.find(
    (p) => p.city === city && p.locality === locality && p.id === id
  );

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

 return (
  <div className="max-w-4xl mx-auto p-6">
    {/* Image Container */}
    <div className="w-full max-w-2xl mx-auto rounded-lg overflow-hidden shadow-md">
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

    </div>

    {/* Content */}
    <h1 className="text-3xl font-bold mt-4">{property.title}</h1>
    <p className="text-gray-600 mt-2">{property.location}</p>
    <p className="text-xl font-semibold text-green-600 mt-2">
      ₹{property.price.toLocaleString()}
    </p>
    <div className="mt-4 flex gap-6">
      <p>🛏 {property.bedrooms} Bedrooms</p>
      <p>🛁 {property.bathrooms} Bathrooms</p>
    </div>
  </div>
);

};

export default PropertyDetails;
