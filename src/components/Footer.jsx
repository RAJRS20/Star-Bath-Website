import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    {/* Brand Info */}
                    <div className="footer-brand">
                        <Link to="/" className="logo">
                            Star Bath World
                        </Link>
                        <p className="footer-desc">
                            Elevating everyday rituals with thoughtfully curated, premium bathroom fittings and architectural plumbing.
                        </p>
                    </div>

                    {/* Cleaned Up Links */}
                    <div className="footer-links">
                        <div className="footer-col">
                            <h4 className="footer-title">Explore</h4>
                            <ul>
                                <li><Link to="/products">Shop Collection</Link></li>
                                <li><Link to="/brands">Partner Brands</Link></li>
                                <li><Link to="/about">Lookbook</Link></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4 className="footer-title">Support</h4>
                            <ul>
                                <li><Link to="/contact">Contact Us</Link></li>
                                <li><Link to="/contact">Visit Showroom</Link></li>
                                <li><Link to="/profile">My Account</Link></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4 className="footer-title">Social</h4>
                            <div className="footer-social-vertical">
                                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                                    <Instagram size={16} /> Instagram
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                                    <Facebook size={16} /> Facebook
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                                    <Twitter size={16} /> Twitter
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Star Bath World. All rights reserved.</p>
                    <div className="footer-legal">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
