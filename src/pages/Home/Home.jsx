import HeroSection from '../../components/HeroSection/HeroSection';
import Features from '../../components/Features/Features';
import PopularProperties from '../../components/PopularProperties/PopularProperties';
import Cities from '../../components/Cities/Cities';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <HeroSection />
      <Features />
      <PopularProperties />
      <Cities />
    </div>
  );
};

export default Home;
