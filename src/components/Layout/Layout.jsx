import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        <Outlet /> {/* This renders the matched route */}
      </main>
    </div>
  );
};

export default Layout;