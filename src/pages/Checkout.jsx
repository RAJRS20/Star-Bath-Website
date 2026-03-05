import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, CreditCard, Truck, Package, ArrowLeft, ShieldCheck, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../data/products';
import './Checkout.css';

const steps = ['Shipping', 'Payment', 'Review'];

const paymentMethods = [
    { id: 'upi', label: 'UPI / Scan & Pay', icon: '📱' },
    { id: 'card', label: 'Credit or Debit Card', icon: '💳' },
    { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
];

const deliveryOptions = [
    { id: 'local', label: 'Standard Delivery', price: 0, time: '3-5 Business Days', desc: 'Secure delivery via premium logistics partners.' },
    { id: 'express', label: 'Express Delivery', price: 999, time: '1-2 Business Days', desc: 'Priority shipping for urgent requirements.' },
    { id: 'pickup', label: 'Store Pickup', price: 0, time: 'Next Day', desc: 'Collect directly from our Coimbatore showroom.' },
];

export default function Checkout() {
    const { cart, cartTotal, clearCart } = useStore();
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [payment, setPayment] = useState('upi');
    const [delivery, setDelivery] = useState('local');
    const [orderPlaced, setOrderPlaced] = useState(false);

    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', phone: '', address: '', city: '', state: '', pincode: ''
    });

    const selectedDelivery = deliveryOptions.find(d => d.id === delivery);
    const subtotal = cartTotal;
    const shippingCost = subtotal > 50000 ? 0 : selectedDelivery.price;
    const grandTotal = subtotal + shippingCost;

    const handleFormChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handlePlaceOrder = () => {
        setOrderPlaced(true);
        clearCart();
        setStep(2);
    };

    if (cart.length === 0 && !orderPlaced) {
        return (
            <main className="checkout-page page-enter">
                <div className="container" style={{ textAlign: 'center', maxWidth: 600, padding: '120px 20px' }}>
                    <h1 className="heading-xl">Checkout Unavailable</h1>
                    <p className="subheading" style={{ marginTop: 16 }}>Your cart is currently empty. Add some products to proceed with checkout.</p>
                    <Link to="/products" className="btn btn-dark" style={{ marginTop: 32 }}>Explore Products</Link>
                </div>
            </main>
        );
    }

    return (
        <main className="checkout-page page-enter">
            <div className="container">
                <div className="checkout-header">
                    <Link to="/cart" className="checkout-back-link">
                        <ArrowLeft size={16} /> Return to Cart
                    </Link>
                    <h1 className="heading-lg">Secure Checkout</h1>
                </div>

                {/* Progress Steps */}
                <div className="checkout-steps">
                    {steps.map((s, i) => (
                        <div key={i} className={`checkout-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                            <div className="step-indicator">
                                {i < step ? <Check size={14} strokeWidth={3} /> : i + 1}
                            </div>
                            <span className="step-label">{s}</span>
                            {i < steps.length - 1 && <div className="step-track" />}
                        </div>
                    ))}
                </div>

                <div className="checkout-layout">
                    {/* Left Panel: Forms */}
                    <div className="checkout-main">
                        {step === 0 && (
                            <div className="checkout-block slide-in">
                                <h2 className="checkout-block-title">Contact Information</h2>
                                <div className="form-grid">
                                    <div className="form-group half">
                                        <label className="form-label">First Name *</label>
                                        <input name="firstName" className="form-input" value={form.firstName} onChange={handleFormChange} required />
                                    </div>
                                    <div className="form-group half">
                                        <label className="form-label">Last Name *</label>
                                        <input name="lastName" className="form-input" value={form.lastName} onChange={handleFormChange} required />
                                    </div>
                                    <div className="form-group half">
                                        <label className="form-label">Email Address *</label>
                                        <input name="email" type="email" className="form-input" value={form.email} onChange={handleFormChange} required />
                                    </div>
                                    <div className="form-group half">
                                        <label className="form-label">Phone Number *</label>
                                        <input name="phone" className="form-input" value={form.phone} onChange={handleFormChange} required />
                                    </div>
                                </div>

                                <div className="checkout-divider" />

                                <h2 className="checkout-block-title">Shipping Method</h2>
                                <div className="delivery-selection">
                                    {deliveryOptions.map(opt => (
                                        <label key={opt.id} className={`delivery-card ${delivery === opt.id ? 'active' : ''}`}>
                                            <input type="radio" name="delivery" value={opt.id} checked={delivery === opt.id} onChange={() => setDelivery(opt.id)} />
                                            <div className="delivery-card-content">
                                                <div className="delivery-card-header">
                                                    <span className="delivery-card-title">{opt.label}</span>
                                                    <span className="delivery-card-price">{opt.price === 0 ? 'FREE' : formatPrice(opt.price)}</span>
                                                </div>
                                                <div className="delivery-card-desc">{opt.time} — {opt.desc}</div>
                                            </div>
                                        </label>
                                    ))}
                                </div>

                                {delivery !== 'pickup' && (
                                    <>
                                        <div className="checkout-divider" />
                                        <h2 className="checkout-block-title">Shipping Address</h2>
                                        <div className="form-grid">
                                            <div className="form-group full">
                                                <label className="form-label">Street Address *</label>
                                                <input name="address" className="form-input" value={form.address} onChange={handleFormChange} placeholder="House no., Apartment, Street name" required />
                                            </div>
                                            <div className="form-group half">
                                                <label className="form-label">City *</label>
                                                <input name="city" className="form-input" value={form.city} onChange={handleFormChange} required />
                                            </div>
                                            <div className="form-group half">
                                                <label className="form-label">State *</label>
                                                <input name="state" className="form-input" value={form.state} onChange={handleFormChange} required />
                                            </div>
                                            <div className="form-group half">
                                                <label className="form-label">PIN Code *</label>
                                                <input name="pincode" className="form-input" value={form.pincode} onChange={handleFormChange} required />
                                            </div>
                                        </div>
                                    </>
                                )}

                                <button
                                    className="btn btn-dark checkout-next-btn"
                                    onClick={() => setStep(1)}
                                    disabled={delivery !== 'pickup' && (!form.firstName || !form.phone || !form.address || !form.city || !form.pincode)}
                                >
                                    Continue to Payment
                                </button>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="checkout-block slide-in">
                                <h2 className="checkout-block-title">Payment Information</h2>
                                <p className="secure-badge"><ShieldCheck size={16} /> All transactions are highly secured and encrypted.</p>

                                <div className="payment-selection">
                                    {paymentMethods.map(pm => (
                                        <label key={pm.id} className={`payment-card ${payment === pm.id ? 'active' : ''}`}>
                                            <div className="payment-card-left">
                                                <input type="radio" name="payment" value={pm.id} checked={payment === pm.id} onChange={() => setPayment(pm.id)} />
                                                <span className="payment-card-icon">{pm.icon}</span>
                                                <span className="payment-card-label">{pm.label}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>

                                {payment === 'card' && (
                                    <div className="card-form-box">
                                        <div className="form-grid">
                                            <div className="form-group full">
                                                <label className="form-label">Card Number</label>
                                                <input className="form-input" placeholder="0000 0000 0000 0000" />
                                            </div>
                                            <div className="form-group half">
                                                <label className="form-label">Expiry Date</label>
                                                <input className="form-input" placeholder="MM / YY" />
                                            </div>
                                            <div className="form-group half">
                                                <label className="form-label">CVC</label>
                                                <input className="form-input" placeholder="123" type="password" />
                                            </div>
                                            <div className="form-group full">
                                                <label className="form-label">Name on Card</label>
                                                <input className="form-input" placeholder="Cardholder Name" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {payment === 'upi' && (
                                    <div className="card-form-box">
                                        <div className="form-group full" style={{ marginBottom: 0 }}>
                                            <label className="form-label">Enter UPI ID</label>
                                            <input className="form-input" placeholder="username@bank" />
                                        </div>
                                    </div>
                                )}

                                <div className="checkout-actions-row">
                                    <button className="btn-text-back" onClick={() => setStep(0)}>Return to Shipping</button>
                                    <button className="btn btn-dark checkout-next-btn sm-width" onClick={handlePlaceOrder}>
                                        Pay {formatPrice(grandTotal)}
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="checkout-success slide-in">
                                <div className="success-check-circle">
                                    <Check size={40} color="white" strokeWidth={3} />
                                </div>
                                <h2 className="heading-lg" style={{ marginBottom: 16 }}>Order Confirmed</h2>
                                <p className="success-subtitle">Thank you, {form.firstName || 'Guest'}. Your order has been placed successfully and is being processed.</p>

                                <div className="success-info-box">
                                    <div className="success-info-row">
                                        <span className="info-label">Order Number</span>
                                        <span className="info-value">#SBW-{Math.floor(1000 + Math.random() * 9000)}</span>
                                    </div>
                                    <div className="success-info-row">
                                        <span className="info-label">Payment Method</span>
                                        <span className="info-value">{paymentMethods.find(p => p.id === payment).label}</span>
                                    </div>
                                    <div className="success-info-row">
                                        <span className="info-label">Delivery</span>
                                        <span className="info-value">{selectedDelivery.label}</span>
                                    </div>
                                    {form.email && (
                                        <div className="success-info-row">
                                            <span className="info-label">Confirmation Email</span>
                                            <span className="info-value">{form.email}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="success-actions">
                                    <Link to="/profile" className="btn btn-dark">View Order Status</Link>
                                    <Link to="/products" className="btn btn-outline">Continue Shopping</Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Panel: Summary StickySidebar */}
                    {step < 2 && (
                        <aside className="checkout-sidebar-wrapper">
                            <div className="checkout-sidebar">
                                <h3 className="checkout-sidebar-title">Order Summary</h3>

                                <div className="checkout-cart-items">
                                    {cart.map(item => (
                                        <div key={item.id} className="checkout-mini-item">
                                            <div className="mini-item-img-wrap">
                                                <img src={item.image} alt={item.name} />
                                                <span className="mini-item-badge">{item.qty}</span>
                                            </div>
                                            <div className="mini-item-info">
                                                <span className="mini-item-name">{item.name}</span>
                                                <span className="mini-item-brand">{item.brand}</span>
                                            </div>
                                            <div className="mini-item-price">{formatPrice(item.finalPrice * item.qty)}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="checkout-promo-box">
                                    <Tag size={18} color="var(--gray-500)" />
                                    <input type="text" placeholder="Promo or Gift Code" />
                                    <button>Apply</button>
                                </div>

                                <div className="checkout-totals">
                                    <div className="total-row">
                                        <span>Subtotal</span>
                                        <span>{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="total-row">
                                        <span>Shipping</span>
                                        <span className={shippingCost === 0 ? 'text-green' : ''}>
                                            {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
                                        </span>
                                    </div>
                                    <div className="total-row grand-total-row">
                                        <span>Total</span>
                                        <span className="grand-total-val">{formatPrice(grandTotal)}</span>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    )}
                </div>
            </div>
        </main>
    );
}
