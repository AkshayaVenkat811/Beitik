import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Buy from './pages/Buy/Buy';
import Rent from './pages/Rent/Rent';
import ShortStay from './pages/ShortStay/ShortStay';
import About from './pages/About/About';
import PropertyDetails from './components/PropertyDetails/PropertyDetails';
import PostPropertyForm from './components/PostPropertyForm/PostPropertyForm';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="buy" element={<Buy />} />
        <Route path="rent" element={<Rent />} />
        <Route path="short-stay" element={<ShortStay />} />
        <Route path="about" element={<About />} />
        <Route path="/property/:city/:locality/:id" element={<PropertyDetails />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="post-property" element={<PostPropertyForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;