// src/pages/About/About.jsx
import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.about}>
      <div className="container mx-auto px-4 pb-8 min-h-screen" style={{marginTop: '6rem'}}>
        <h1 className={styles.title}>About Beitik</h1>
        <p className="text-gray-600 mb-4">
          Beitik is your trusted platform for finding the perfect rental or short stay property. 
          We provide a curated selection of apartments, bungalows, and penthouse suites tailored 
          to your lifestyle and budget.
        </p>
        <p className="text-gray-600">
          Our mission is to make property rental seamless and transparent, offering a reliable 
          and user-friendly experience for everyone. Whether you're looking for a long-term rental 
          or a short stay, Beitik has you covered.
        </p>
      </div>
    </div>
  );
};

export default About;