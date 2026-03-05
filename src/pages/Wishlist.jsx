import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import './Wishlist.css';

export default function Wishlist() {
    const { wishlist } = useStore();

    return (
        <main className="wishlist-page page-enter">
            <div className="container">
                <h1 className="heading-lg wishlist-title">My Wishlist</h1>
                {wishlist.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">❤️</div>
                        <h3>Your Wishlist is Empty</h3>
                        <p>Save products you love by clicking the ❤ button on any product.</p>
                        <Link to="/products" className="btn btn-gold" style={{ marginTop: 16 }}>
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <>
                        <p className="wishlist-count">{wishlist.length} item{wishlist.length > 1 ? 's' : ''} saved</p>
                        <div className="wishlist-grid">
                            {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
