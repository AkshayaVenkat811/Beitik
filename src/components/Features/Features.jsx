import React from 'react';
import { FiUserCheck, FiHeart, FiFileText, FiUpload, FiShield, FiTrendingUp } from 'react-icons/fi';
import styles from './Features.module.css';

const Features = () => {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why Choose Beitik</h2>
          <p className={styles.sectionSubtitle}>
            Algeria's premier real estate platform with premium services
          </p>
          <div className={styles.titleDivider}></div>
        </div>
        
        <div className={styles.featuresGrid}>
          {/* Feature Card 1 */}
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <FiUserCheck className={styles.featureIcon} />
            </div>
            <h3>Verified Owners</h3>
            <p>Direct contact with authenticated property owners and agents</p>
            <div className={styles.featureHoverEffect}></div>
          </div>
          
          {/* Feature Card 2 */}
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <FiHeart className={styles.featureIcon} />
            </div>
            <h3>Smart Selection</h3>
            <p>Save and compare properties with advanced filtering</p>
            <div className={styles.featureHoverEffect}></div>
          </div>
          
          {/* Feature Card 3 */}
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <FiFileText className={styles.featureIcon} />
            </div>
            <h3>Complete Support</h3>
            <p>End-to-end assistance with all legal procedures</p>
            <div className={styles.featureHoverEffect}></div>
          </div>
          
          {/* Feature Card 4 */}
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <FiUpload className={styles.featureIcon} />
            </div>
            <h3>Free Listings</h3>
            <p>Premium visibility for your property at no cost</p>
            <div className={styles.featureHoverEffect}></div>
          </div>

          {/* Feature Card 5 */}
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <FiShield className={styles.featureIcon} />
            </div>
            <h3>Secure Transactions</h3>
            <p>Protected payments and verified documentation</p>
            <div className={styles.featureHoverEffect}></div>
          </div>

          {/* Feature Card 6 */}
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <FiTrendingUp className={styles.featureIcon} />
            </div>
            <h3>Market Insights</h3>
            <p>Real-time analytics and price trends</p>
            <div className={styles.featureHoverEffect}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;