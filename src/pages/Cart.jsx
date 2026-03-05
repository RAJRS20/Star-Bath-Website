import { Link } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../data/products';
import './Cart.css';

export default function Cart() {
    const { cart, cartTotal, removeFromCart, updateQty, clearCart } = useStore();

    const shipping = cartTotal > 50000 ? 0 : 499;
    const grandTotal = cartTotal + shipping;

    if (cart.length === 0) {
        return (
            <main className="cart-page page-enter">
                <div className="container">
                    <div className="cart-empty-state">
                        <h1 className="heading-xl">Your Cart is Empty</h1>
                        <p className="subheading">Looks like you haven't added any products yet to your cart.</p>
                        <Link to="/products" className="btn btn-dark" style={{ marginTop: 32 }}>
                            Explore Collection <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="cart-page page-enter">
            <div className="container">
                <div className="cart-header flex-between">
                    <h1 className="heading-lg">Shopping Bag</h1>
                    <button className="cart-clear-btn" onClick={clearCart}>
                        <Trash2 size={16} /> Clear Bag
                    </button>
                </div>

                <div className="cart-layout">
                    {/* Items List */}
                    <div className="cart-items">
                        {cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <Link to={`/product/${item.id}`} className="cart-item-img-link">
                                    <div className="cart-item-img-wrap">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                </Link>

                                <div className="cart-item-details">
                                    <div className="cart-item-info">
                                        <div className="cart-item-meta">
                                            <span className="cart-item-brand">{item.brand}</span>
                                            <span className="cart-item-sku">SKU: {item.sku}</span>
                                        </div>
                                        <Link to={`/product/${item.id}`} className="cart-item-name">{item.name}</Link>
                                        <div className="cart-item-price">{formatPrice(item.finalPrice)}</div>
                                    </div>

                                    <div className="cart-item-actions">
                                        <div className="qty-control minimal-qty">
                                            <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                                            <span className="qty-value">{item.qty}</span>
                                            <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                                        </div>
                                        <div className="cart-item-total">{formatPrice(item.finalPrice * item.qty)}</div>
                                        <button className="cart-remove-icon" onClick={() => removeFromCart(item.id)}>
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="cart-summary-wrapper">
                        <div className="cart-summary">
                            <h3 className="cart-summary-title">Order Summary</h3>
                            <div className="cart-summary-content">
                                <div className="cart-summary-row">
                                    <span>Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
                                    <span>{formatPrice(cartTotal)}</span>
                                </div>
                                <div className="cart-summary-row">
                                    <span>Estimated Shipping</span>
                                    <span className={shipping === 0 ? 'text-green' : ''}>
                                        {shipping === 0 ? 'Complimentary' : formatPrice(shipping)}
                                    </span>
                                </div>
                                {shipping > 0 && (
                                    <div className="cart-shipping-notice">
                                        Add {formatPrice(50000 - cartTotal)} more for free shipping.
                                    </div>
                                )}
                                <div className="cart-summary-divider" />
                                <div className="cart-summary-row cart-total-row">
                                    <span>Total</span>
                                    <span className="cart-total-value">{formatPrice(grandTotal)}</span>
                                </div>
                            </div>

                            <div className="cart-summary-actions">
                                <Link to="/checkout" className="btn btn-dark cart-checkout-btn">
                                    Proceed to Checkout
                                </Link>
                                <a
                                    href={`https://wa.me/919876543210?text=Hi!%20I%27d%20like%20to%20order%20${cart.map(i => `${i.name}%20(x${i.qty})`).join('%2C%20')}`}
                                    target="_blank" rel="noreferrer"
                                    className="btn btn-outline cart-whatsapp-btn"
                                >
                                    Order via WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
