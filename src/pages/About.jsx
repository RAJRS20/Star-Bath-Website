import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './About.css';

export default function About() {
    return (
        <main className="lookbook-page page-enter">
            {/* Header */}
            <div className="lookbook-header">
                <div className="container">
                    <h1 className="heading-xl">Lookbook</h1>
                    <p className="subheading">A visual exploration of form, function, and minimalist aesthetics for the modern home.</p>
                </div>
            </div>

            {/* Gallery Section 1 */}
            <section className="lookbook-section">
                <div className="container">
                    <div className="lookbook-grid-split">
                        <div className="lookbook-text-block">
                            <h2 className="heading-lg">Elevated Simplicity.</h2>
                            <p>We source objects that embody pure geometry and restraint. Every fixture and accessory is chosen for its ability to integrate seamlessly into a clean, architectural environment.</p>
                            <Link to="/products" className="lookbook-link">
                                Shop the Collection <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div className="lookbook-image-block">
                            <img src="/images/hero_banner.png" alt="Minimalist Bathroom" className="lookbook-img img-portrait" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section 2 */}
            <section className="lookbook-section lookbook-bg-gray">
                <div className="container">
                    <div className="lookbook-grid-split reverse">
                        <div className="lookbook-image-block">
                            <img src="/images/brand_showcase.png" alt="Modern Shower" className="lookbook-img img-landscape" />
                        </div>
                        <div className="lookbook-text-block">
                            <h2 className="heading-lg">Material Honesty.</h2>
                            <p>Embracing the inherent qualities of steel, ceramic, and stone. We celebrate surfaces that are tactile, durable, and unaffected by fleeting trends.</p>
                            <Link to="/brands" className="lookbook-link">
                                Discover Brands <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid 3 */}
            <section className="lookbook-gallery">
                <div className="container">
                    <div className="lookbook-masonry">
                        <img src="/images/product_faucet.png" alt="Faucet Detail" className="masonry-img" />
                        <img src="/images/product_washbasin.png" alt="Sink Detail" className="masonry-img" />
                        <img src="/images/product_shower.png" alt="Shower Detail" className="masonry-img" />
                    </div>
                </div>
            </section>
        </main>
    );
}
