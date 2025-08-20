// src/data/rentalPropertiesData.js
const rentalProperties = [
  {
    id: 101,
    title: "Cozy Apartment in Downtown",
    price: 1200, // monthly rent
    bedrooms: 2,
    location: "Downtown City",
    type: "apartment",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=80", // replace with real img
    rating: 4.5,
    verified: true,
  },
  {
    id: 102,
    title: "Spacious Villa for Rent",
    price: 3000,
    bedrooms: 4,
    location: "Suburban Area",
    type: "villa",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    rating: 4.8,
    verified: true,
  },
  {
    id: 103,
    title: "Modern Studio",
    price: 900,
    bedrooms: 1,
    location: "City Center",
    type: "studio",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    rating: 4.2,
    verified: false,
  },
];

export default rentalProperties;
