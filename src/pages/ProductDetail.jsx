import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Truck, ShieldCheck, RotateCcw, MessageCircle, Check } from 'lucide-react';
import { getProductById, products, formatPrice, getDiscountedPrice, categories } from '../data/products';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = getProductById(id);
    const { addToCart, toggleWishlist, isInWishlist } = useStore();
    const [qty, setQty] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [activeImg, setActiveImg] = useState(0);

    if (!product) {
        return (
            <div className="container" style={{ paddingTop: 80, textAlign: 'center' }}>
                <h2>Product Not Found</h2>
                <Link to="/products" className="btn btn-gold" style={{ marginTop: 24, display: 'inline-flex' }}>Back to Products</Link>
            </div>
        );
    }

    const finalPrice = getDiscountedPrice(product.price, product.discountPercent);
    const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    const wishlisted = isInWishlist(product.id);

    return (
        <main className="product-detail-page page-enter">
            <div className="container">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <Link to="/" className="breadcrumb-item">Home</Link>
                    <span className="breadcrumb-sep">›</span>
                    <Link to="/products" className="breadcrumb-item">Products</Link>
                    <span className="breadcrumb-sep">›</span>
                    <Link to={`/products?category=${product.category}`} className="breadcrumb-item">
                        {categories.find(c => c.id === product.category)?.name}
                    </Link>
                    <span className="breadcrumb-sep">›</span>
                    <span className="breadcrumb-item active">{product.name}</span>
                </div>

                {/* Product Layout */}
                <div className="pd-layout">
                    {/* Images */}
                    <div className="pd-images">
                        <div className="pd-main-img-wrap">
                            {product.discountPercent > 0 && (
                                <span className="badge badge-sale pd-discount-badge">-{product.discountPercent}%</span>
                            )}
                            <img src={product.images[activeImg] || product.image} alt={product.name} className="pd-main-img" />
                        </div>
                        {product.images.length > 1 && (
                            <div className="pd-thumbs">
                                {product.images.map((img, i) => (
                                    <button
                                        key={i}
                                        className={`pd-thumb ${activeImg === i ? 'active' : ''}`}
                                        onClick={() => setActiveImg(i)}
                                    >
                                        <img src={img} alt="" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="pd-info">
                        <div className="pd-brand">{product.brand}</div>
                        <h1 className="pd-name">{product.name}</h1>
                        <div className="pd-sku">SKU: {product.sku}</div>

                        {/* Rating */}
                        <div className="pd-rating">
                            <div className="stars">
                                {[1, 2, 3, 4, 5].map(s => (
                                    <span key={s} className={`star ${s <= Math.round(product.rating) ? 'filled' : 'empty'}`}>★</span>
                                ))}
                            </div>
                            <span className="pd-rating-text">{product.rating} ({product.reviews} reviews)</span>
                        </div>

                        {/* Price */}
                        <div className="pd-price-box">
                            <span className="pd-price">{formatPrice(finalPrice)}</span>
                            {product.discountPercent > 0 && (
                                <>
                                    <span className="pd-price-old">{formatPrice(product.price)}</span>
                                    <span className="badge badge-sale">Save {formatPrice(product.price - finalPrice)}</span>
                                </>
                            )}
                        </div>

                        {/* Stock */}
                        <div className={`pd-stock ${product.stock > 0 ? 'in' : 'out'}`}>
                            {product.stock > 0 ? (
                                <><Check size={14} /> In Stock ({product.stock} available)</>
                            ) : (
                                'Out of Stock'
                            )}
                        </div>

                        {/* Features */}
                        <ul className="pd-features">
                            {product.features.map((f, i) => (
                                <li key={i}><Check size={14} className="pd-check" />{f}</li>
                            ))}
                        </ul>

                        {/* Quantity */}
                        <div className="pd-qty-row">
                            <span className="pd-qty-label">Quantity:</span>
                            <div className="qty-control">
                                <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                                <span className="qty-value">{qty}</span>
                                <button className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pd-actions">
                            <button
                                className="btn btn-gold btn-lg pd-cart-btn"
                                onClick={() => addToCart(product, qty)}
                                disabled={product.stock === 0}
                            >
                                <ShoppingCart size={20} /> Add to Cart
                            </button>
                            <button
                                className={`btn pd-wish-btn ${wishlisted ? 'wishlisted' : 'btn-outline'}`}
                                onClick={() => toggleWishlist(product)}
                            >
                                <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
                            </button>
                        </div>

                        {/* WhatsApp */}
                        <a
                            href={`https://wa.me/919876543210?text=Hi!%20I%27m%20interested%20in%20${encodeURIComponent(product.name)}%20(SKU:%20${product.sku})`}
                            target="_blank" rel="noreferrer"
                            className="btn-whatsapp pd-whatsapp-btn"
                        >
                            💬 Enquire on WhatsApp
                        </a>

                        {/* Delivery */}
                        <div className="pd-delivery">
                            <div className="pd-delivery-item"><Truck size={16} /><span>Free delivery in Coimbatore</span></div>
                            <div className="pd-delivery-item"><ShieldCheck size={16} /><span>Warranty: {product.warranty}</span></div>
                            <div className="pd-delivery-item"><RotateCcw size={16} /><span>Easy returns within 7 days</span></div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="pd-tabs">
                    <div className="pd-tab-headers">
                        {['description', 'specifications', 'reviews'].map(tab => (
                            <button
                                key={tab}
                                className={`pd-tab-btn ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                    <div className="pd-tab-content">
                        {activeTab === 'description' && (
                            <div className="pd-description">
                                <p>{product.description}</p>
                                <h4 style={{ marginTop: 24, marginBottom: 12, fontFamily: 'var(--font-display)' }}>Key Highlights</h4>
                                <ul className="pd-desc-features">
                                    {product.features.map((f, i) => (
                                        <li key={i}><Check size={16} className="pd-check" style={{ flexShrink: 0 }} />{f}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {activeTab === 'specifications' && (
                            <div className="pd-specifications">
                                <table className="pd-spec-table">
                                    <tbody>
                                        {Object.entries(product.specifications).map(([key, val]) => (
                                            <tr key={key}>
                                                <td className="spec-key">{key}</td>
                                                <td className="spec-val">{val}</td>
                                            </tr>
                                        ))}
                                        <tr><td className="spec-key">Warranty</td><td className="spec-val">{product.warranty}</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {activeTab === 'reviews' && (
                            <div className="pd-reviews">
                                <div className="reviews-summary">
                                    <div className="reviews-score">
                                        <span className="score-value">{product.rating}</span>
                                        <div className="stars" style={{ fontSize: '1.3rem' }}>
                                            {[1, 2, 3, 4, 5].map(s => (
                                                <span key={s} className={`star ${s <= Math.round(product.rating) ? 'filled' : 'empty'}`}>★</span>
                                            ))}
                                        </div>
                                        <span style={{ color: 'var(--gray-500)', fontSize: '0.875rem' }}>Based on {product.reviews} reviews</span>
                                    </div>
                                </div>
                                <p style={{ color: 'var(--gray-500)', marginTop: 24 }}>
                                    Customer reviews are being loaded... Share your experience with this product.
                                </p>
                                <button className="btn btn-outline" style={{ marginTop: 16 }}>Write a Review</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                {related.length > 0 && (
                    <div className="pd-related">
                        <div className="section-header" style={{ textAlign: 'left', marginBottom: 32 }}>
                            <span className="label">You May Also Like</span>
                            <h2 className="heading-md">Related Products</h2>
                        </div>
                        <div className="pd-related-grid">
                            {related.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
