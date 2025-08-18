import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Buy from './pages/Buy/Buy';
import Rent from './pages/Rent/Rent';
import ShortStay from './pages/ShortStay/ShortStay';
import About from './pages/About/About';
import PropertyDetails from './components/PropertyDetails/PropertyDetails';
import PostPropertyForm from './components/PostPropertyForm/PostPropertyForm';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="buy" element={<Buy />} />
            <Route path="rent" element={<Rent />} />
            <Route path="short-stay" element={<ShortStay />} />
            <Route path="about" element={<About />} />
            <Route path="/property/:city/:locality/:id" element={<PropertyDetails />} />
            
            {/* Protected Route */}
            <Route element={<ProtectedRoute />}>
              <Route path="post-property" element={<PostPropertyForm />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;