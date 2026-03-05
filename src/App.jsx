import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Brands from './pages/Brands';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import './App.css';

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname, search]);
  return null;
}

function Toast() {
  const { toast } = useStore();
  if (!toast) return null;
  return (
    <div className="toast">
      <span>{toast.icon}</span>
      <span>{toast.msg}</span>
    </div>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/919876543210?text=Hi%20Star%20Bath%20World!%20I%20have%20an%20enquiry."
      target="_blank" rel="noreferrer"
      className="wa-float"
      title="Chat on WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#ffffff" width="35" height="35">
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.6-12 1.9-5.6-2.8-23.4-8.6-44.5-27.5-16.5-14.7-27.6-32.9-30.9-38.4-3.2-5.6-.3-8.6 2.5-11.4 2.5-2.5 5.6-6.5 8.3-9.7 2.8-3.2 3.7-5.6 5.6-9.3 1.9-3.7 .9-7-0.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
      </svg>
    </a>
  );
}

function AppContent() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={
          <div style={{ textAlign: 'center', padding: '120px 24px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', marginBottom: 16 }}>404</h2>
            <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>Page not found</p>
            <a href="/" className="btn btn-gold" style={{ display: 'inline-flex' }}>Back to Home</a>
          </div>
        } />
      </Routes>
      <Footer />
      <Toast />
      <WhatsAppFloat />
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
