import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice, getDiscountedPrice } from '../data/products';
import './ProductCard.css';

export default function ProductCard({ product }) {
    const { addToCart, toggleWishlist, isInWishlist } = useStore();
    const navigate = useNavigate();
    const wishlisted = isInWishlist(product.id);
    const finalPrice = getDiscountedPrice(product.price, product.discountPercent);

    return (
        <div className="product-card">
            {/* Wishlist */}
            <button
                className={`product-wishlist ${wishlisted ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label="Toggle wishlist"
            >
                <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} strokeWidth={1.5} />
            </button>

            {/* Image */}
            <Link to={`/product/${product.id}`} className="product-img-wrap">
                <img src={product.image} alt={product.name} className="product-img" loading="lazy" />

                {/* Badges -> Moved inside img wrap to sit on right */}
                <div className="product-badges">
                    {product.discountPercent > 0 && <span className="badge badge-sale">-{product.discountPercent}%</span>}
                    {product.isNew && <span className="badge badge-new">NEW</span>}
                    {product.isBestseller && <span className="badge badge-new" style={{ border: '1px solid #e5e5e5' }}>VALUE BUNDLE</span>}
                </div>

            </Link>

            {/* Info */}
            <div className="product-info">
                {/* Price Row (Moved to top based on design) */}
                <div className="product-price-row">
                    <div className="product-price-wrap">
                        <span className="product-price">{formatPrice(finalPrice)}</span>
                        {product.discountPercent > 0 && (
                            <span className="product-price-old">{formatPrice(product.price)}</span>
                        )}
                    </div>
                    <button
                        className="quick-add-btn"
                        title="Add to Cart"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }}
                    >
                        <ShoppingBag size={18} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Name */}
                <Link to={`/product/${product.id}`} className="product-name">{product.name}</Link>

                {/* Rating */}
                <div className="product-rating">
                    <div className="stars">
                        {[1, 2, 3, 4, 5].map(s => (
                            <span key={s} className={`star ${s <= Math.round(product.rating) ? 'filled' : 'empty'}`}>★</span>
                        ))}
                    </div>
                    <span className="product-rating-text">({product.reviews})</span>
                </div>

                {/* Tags */}
                <div className="product-tags">
                    <span className="product-tag">🌫️ {product.category.replace('-', ' ')}</span>
                    {product.brand && <span className="product-tag">{product.brand}</span>}
                </div>
            </div>
        </div>
    );
}
