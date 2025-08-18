import React from 'react';
import styles from './Cities.module.css';

const Cities = () => {
  const cities = [
    {
      id: 'algiers',
      name: 'Algiers',
      image: '/images/Algiers.jpeg'
    },
    {
      id: 'oran',
      name: 'Oran',
      image: '/images/oran.jpeg'
    },
    {
      id: 'constantine',
      name: 'Constantine',
      image: '/images/Constantine.jpeg'
    },
    {
      id: 'annaba',
      name: 'Annaba',
      image: '/images/Annaba.jpeg'
    },
    {
      id: 'blida',
      name: 'Blida',
      image: '/images/Blida.jpeg'
    },
    {
      id: 'tebessa',
      name: 'Tebessa',
      image: '/images/Tebessa.jpeg'
    },
    {
      id: 'jijel',
      name: 'Jijel',
      image: '/images/Jijel.jpeg'
    },
    {
      id: 'setif',
      name: 'Sétif',
      image: '/images/Setif.jpeg'
    }
  ];

  const handleCityClick = (cityId) => {
    // Implement your city click logic here
    console.log(`City selected: ${cityId}`);
  };

  return (
    <section className={styles.cities}>
      <div className={styles.container}>
        <h2>Explore by City</h2>
        <div className={styles.citiesGrid}>
          {cities.map(city => (
            <div 
              key={city.id} 
              className={styles.cityCard}
              onClick={() => handleCityClick(city.id)}
            >
              <div className={styles.cityImageContainer}>
                <img 
                  src={city.image} 
                  alt={city.name} 
                  className={styles.cityImage} 
                  onError={(e) => {
                    e.target.src = '/images/placeholder-city.jpg'; // Fallback image
                  }}
                />
              </div>
              <div className={styles.cityName}>{city.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cities;