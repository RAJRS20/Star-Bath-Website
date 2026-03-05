import { Link } from 'react-router-dom';
import { ArrowRight, Globe } from 'lucide-react';
import { brands } from '../data/products';
import './Brands.css';

const brandDetails = {
    Jaquar: {
        desc: 'India\'s leading bathing brand, renowned for its commitment to exceptional design, advanced technology, and flawless performance.',
        origin: 'India',
        year: '1960',
        specialty: 'Complete Bathroom Solutions'
    },
    Parryware: {
        desc: 'A pioneer in Indian sanitaryware, continually pushing the boundaries of contemporary bathroom aesthetics and functionality.',
        origin: 'India',
        year: '1952',
        specialty: 'Sanitaryware & Ceramics'
    },
    Morcka: {
        desc: 'Architectural minimalism meets superior engineering. Crafting products focused on precise geometry and raw industrial beauty.',
        origin: 'International',
        year: '2005',
        specialty: 'Minimalist Architecture'
    },
    Kohler: {
        desc: 'A global powerhouse defined by a heritage of bold design, vibrant colors, and unparalleled technological innovation.',
        origin: 'USA',
        year: '1873',
        specialty: 'Luxury & Smart Tech'
    },
    Grohe: {
        desc: 'Precision German engineering dedicated to creating intelligent, sustainable, and beautifully crafted water experiences.',
        origin: 'Germany',
        year: '1936',
        specialty: 'Precision Engineering'
    },
    Hindware: {
        desc: 'Combining decades of trust with modern sensibilities to deliver stylish, durable, and highly reliable bath accessories.',
        origin: 'India',
        year: '1960',
        specialty: 'Durable Elegance'
    },
};

export default function Brands() {
    return (
        <main className="brands-page page-enter">
            {/* Minimalist Hero */}
            <div className="brands-hero-minimal">
                <div className="container">
                    <h1 className="brands-title-large">Partner<br />Brands</h1>
                    <div className="brands-hero-content">
                        <p>
                            We curate the world's most distinguished plumbing and sanitary manufacturers.
                            Every brand is selected for its commitment to material honesty, architectural integration, and enduring quality.
                        </p>
                    </div>
                </div>
            </div>

            {/* Brands Grid Layout */}
            <section className="brands-grid-section">
                <div className="container">
                    <div className="brands-architectural-grid">
                        {brands.map((brand) => {
                            const details = brandDetails[brand] || {};
                            return (
                                <Link to={`/products?brand=${brand}`} key={brand} className="brand-arch-card">
                                    <div className="brand-arch-header">
                                        <h2 className="brand-arch-name">{brand}</h2>
                                        <ArrowRight className="brand-arch-arrow" size={24} strokeWidth={1.5} />
                                    </div>

                                    <div className="brand-arch-body">
                                        <p className="brand-arch-desc">{details.desc}</p>
                                    </div>

                                    <div className="brand-arch-footer">
                                        <div className="brand-meta-column">
                                            <span className="meta-label">Origin</span>
                                            <span className="meta-value">
                                                {details.origin === 'India' ? 'IN' : details.origin === 'USA' ? 'US' : details.origin === 'Germany' ? 'DE' : 'INT'}
                                            </span>
                                        </div>
                                        <div className="brand-meta-column">
                                            <span className="meta-label">Est.</span>
                                            <span className="meta-value">{details.year}</span>
                                        </div>
                                        <div className="brand-meta-column">
                                            <span className="meta-label">Focus</span>
                                            <span className="meta-value">{details.specialty}</span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>
        </main>
    );
}
