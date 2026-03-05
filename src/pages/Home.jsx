import { Link } from 'react-router-dom';
import { ArrowRight, Box, Package, Award } from 'lucide-react';
import { products, categories, getFeaturedProducts, getNewProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Home.css';

export default function Home() {
    const featured = getFeaturedProducts().slice(0, 4);
    const bundles = getNewProducts().slice(0, 4);

    return (
        <main className="home page-enter">
            {/* ── Hero ──────────────────────────── */}
            <section className="hero">
                <div className="hero-bg">
                    <img src="/images/hero_banner.png" alt="Elegant Space" className="hero-img" />
                    <div className="hero-overlay" />
                </div>
                <div className="container hero-content">
                    <div className="hero-text-bottom">
                        <span className="hero-label">by Star Bath World</span>
                        <h1 className="hero-heading">
                            Premium European<br />
                            Bathroom Fittings
                        </h1>
                        <Link to="/products" className="btn btn-white btn-lg hero-btn">
                            Show more
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Sets & Bundles (Bestsellers) ──── */}
            <section className="section">
                <div className="container">
                    <div className="section-header-inline">
                        <h2 className="heading-md">Sets & Bundles</h2>
                        <span className="divider-vertical"></span>
                        <span className="subheading">Save up to 50%</span>
                    </div>
                    <div className="products-grid">
                        {featured.map(p => <ProductCard key={p.id} product={{ ...p, isBestseller: true }} />)}
                    </div>
                </div>
            </section>

            {/* ── New Arrivals ──────────────────── */}
            <section className="section section-grey">
                <div className="container">
                    <div className="section-header-inline">
                        <h2 className="heading-md">New Arrivals</h2>
                        <span className="divider-vertical"></span>
                        <span className="subheading">Latest collections</span>
                    </div>
                    <div className="products-grid">
                        {bundles.map(p => <ProductCard key={p.id} product={{ ...p, isNew: true, isBestseller: false }} />)}
                    </div>
                </div>
            </section>
        </main>
    );
}
