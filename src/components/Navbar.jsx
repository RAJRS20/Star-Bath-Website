import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Search, User, Filter, ShoppingBag, Menu, X, Home } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import './Navbar.css';

export default function Navbar() {
    const { cartCount } = useStore();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const isHome = location.pathname === '/';

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const isSolid = scrolled || !isHome;

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
            setSearchOpen(false);
            setSearchQuery('');
        }
    };

    return (
        <nav className={`navbar ${isSolid ? 'navbar-scrolled' : ''}`}>
            {/* Main Nav Container */}
            <div className="nav-container">
                {/* Left: Logo */}
                <div className="nav-left">
                    <Link to="/" className="logo">
                        Star Bath World
                    </Link>
                </div>

                {/* Center: Desktop Nav Links */}
                <div className="nav-links">
                    <Link to="/products" className={`nav-link nav-link-text ${location.pathname === '/products' && !location.search ? 'active' : ''}`}>Shop</Link>
                    <NavLink to="/brands" className="nav-link nav-link-text">Brands</NavLink>
                    <NavLink to="/about" className="nav-link nav-link-text">Lookbook</NavLink>
                    <NavLink to="/contact" className="nav-link nav-link-text">Contact</NavLink>
                </div>

                {/* Right: Actions */}
                <div className="nav-actions">
                    <div className={`nav-search-container ${searchOpen ? 'open' : ''}`}>
                        <form onSubmit={handleSearch} className="nav-search-form">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                            <button type="button" onClick={() => setSearchOpen(false)} className="nav-search-close"><X size={16} strokeWidth={1.5} /></button>
                        </form>
                        <button className="nav-icon-btn" onClick={() => setSearchOpen(true)}><Search size={20} strokeWidth={1.5} /></button>
                    </div>

                    <Link to="/profile" className="nav-icon-btn"><User size={20} strokeWidth={1.5} /></Link>

                    <Link to="/cart" className="nav-icon-btn nav-badge-wrap">
                        <ShoppingBag size={20} strokeWidth={1.5} />
                        {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
                    </Link>

                    {/* Mobile Toggle */}
                    <button className="nav-icon-btn mobile-only" onClick={() => setMobileOpen(!mobileOpen)}>
                        {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
                <div className="mobile-nav-list">
                    <Link to="/" className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>Home</Link>
                    <Link to="/products" className={`mobile-nav-link ${location.pathname === '/products' && !location.search ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>Shop</Link>
                    <NavLink to="/brands" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Brands</NavLink>
                    <NavLink to="/about" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Lookbook</NavLink>
                    <NavLink to="/contact" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Contact</NavLink>
                </div>
            </div>
        </nav>
    );
}
