import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, MapPin, Package, Heart, LogOut, CheckCircle, Edit2, Trash2, Plus } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import './Profile.css';

const SECTIONS = [
    { id: 'account', label: 'Account Details', Icon: User },
    { id: 'orders', label: 'Order History', Icon: Package },
    { id: 'addresses', label: 'Saved Addresses', Icon: MapPin },
    { id: 'wishlist', label: 'Wishlist', Icon: Heart },
];

const MOCK_ORDERS = [
    { id: 'SBW-1042', date: 'Feb 18, 2026', total: '₹24,225', status: 'Delivered', items: 2 },
    { id: 'SBW-0987', date: 'Jan 05, 2026', total: '₹11,520', status: 'Delivered', items: 1 },
    { id: 'SBW-0934', date: 'Dec 12, 2025', total: '₹36,000', status: 'Delivered', items: 1 },
];

export default function Profile() {
    const { wishlist } = useStore();
    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState('account');
    const [saved, setSaved] = useState(false);
    const [pwSaved, setPwSaved] = useState(false);

    const [profile, setProfile] = useState({
        firstName: 'Guest',
        lastName: 'User',
        email: 'guest@example.com',
        phone: '',
    });

    const [passwords, setPasswords] = useState({
        current: '',
        newPass: '',
        confirm: '',
    });

    const [pwError, setPwError] = useState('');

    const [addresses, setAddresses] = useState([
        { id: 1, label: 'Home', line1: '12, Peelamedu Main Road', city: 'Coimbatore', state: 'Tamil Nadu', pin: '641 004' },
    ]);

    const handleProfileChange = (e) =>
        setProfile((p) => ({ ...p, [e.target.name]: e.target.value }));

    const handleProfileSave = (e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handlePasswordSave = (e) => {
        e.preventDefault();
        setPwError('');
        if (!passwords.current) { setPwError('Please enter your current password.'); return; }
        if (passwords.newPass.length < 6) { setPwError('New password must be at least 6 characters.'); return; }
        if (passwords.newPass !== passwords.confirm) { setPwError('Passwords do not match.'); return; }
        setPwSaved(true);
        setPasswords({ current: '', newPass: '', confirm: '' });
        setTimeout(() => setPwSaved(false), 3000);
    };

    const deleteAddress = (id) =>
        setAddresses((prev) => prev.filter((a) => a.id !== id));

    const handleSignOut = () => {
        if (window.confirm('Are you sure you want to sign out?')) {
            navigate('/');
        }
    };

    return (
        <main className="profile-page page-enter">
            {/* Header */}
            <div className="profile-header">
                <div className="container">
                    <h1 className="heading-xl">My Account</h1>
                    <p className="subheading">Manage your details, orders, addresses, and saved items.</p>
                </div>
            </div>

            <div className="container profile-layout">
                {/* Sidebar */}
                <aside className="profile-sidebar">
                    <div className="profile-summary">
                        <div className="profile-avatar">
                            <User size={32} color="var(--charcoal)" />
                        </div>
                        <h3 className="profile-name">{profile.firstName} {profile.lastName}</h3>
                        <p className="profile-email">{profile.email}</p>
                    </div>

                    <nav className="profile-nav">
                        {SECTIONS.map(({ id, label, Icon }) => (
                            <button
                                key={id}
                                className={`profile-nav-btn ${activeSection === id ? 'active' : ''}`}
                                onClick={() => setActiveSection(id)}
                            >
                                <Icon size={18} /> {label}
                            </button>
                        ))}
                        <button className="profile-nav-btn profile-logout-btn" onClick={handleSignOut}>
                            <LogOut size={18} /> Sign Out
                        </button>
                    </nav>
                </aside>

                {/* Content */}
                <section className="profile-content">

                    {/* ── Account Details ─── */}
                    {activeSection === 'account' && (
                        <div className="profile-section-card">
                            <h2 className="heading-md profile-section-title">Account Details</h2>

                            {saved && (
                                <div className="profile-success-banner">
                                    <CheckCircle size={18} /> Changes saved successfully!
                                </div>
                            )}

                            <form className="minimal-form" onSubmit={handleProfileSave}>
                                <div className="form-row-2">
                                    <div className="form-group">
                                        <label className="form-label">First Name</label>
                                        <input name="firstName" type="text" className="form-input" value={profile.firstName} onChange={handleProfileChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Last Name</label>
                                        <input name="lastName" type="text" className="form-input" value={profile.lastName} onChange={handleProfileChange} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email Address</label>
                                    <input name="email" type="email" className="form-input" value={profile.email} onChange={handleProfileChange} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Phone Number</label>
                                    <input name="phone" type="tel" className="form-input" value={profile.phone} onChange={handleProfileChange} placeholder="+91 00000 00000" />
                                </div>
                                <div className="profile-form-actions">
                                    <button type="submit" className="btn btn-dark">Save Changes</button>
                                </div>
                            </form>

                            <div className="profile-divider" />

                            <h2 className="heading-md profile-section-title">Password &amp; Security</h2>

                            {pwSaved && (
                                <div className="profile-success-banner">
                                    <CheckCircle size={18} /> Password updated successfully!
                                </div>
                            )}
                            {pwError && <p className="profile-error-banner">{pwError}</p>}

                            <form className="minimal-form" onSubmit={handlePasswordSave}>
                                <div className="form-group">
                                    <label className="form-label">Current Password</label>
                                    <input type="password" className="form-input" value={passwords.current} onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))} placeholder="••••••••" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">New Password</label>
                                    <input type="password" className="form-input" value={passwords.newPass} onChange={e => setPasswords(p => ({ ...p, newPass: e.target.value }))} placeholder="Min 6 characters" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Confirm New Password</label>
                                    <input type="password" className="form-input" value={passwords.confirm} onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))} placeholder="Repeat new password" />
                                </div>
                                <div className="profile-form-actions">
                                    <button type="submit" className="btn btn-outline">Update Password</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* ── Order History ─── */}
                    {activeSection === 'orders' && (
                        <div className="profile-section-card">
                            <h2 className="heading-md profile-section-title">Order History</h2>
                            {MOCK_ORDERS.length === 0 ? (
                                <div className="profile-empty">
                                    <Package size={40} opacity={0.2} />
                                    <p>No orders yet. <Link to="/products">Start shopping →</Link></p>
                                </div>
                            ) : (
                                <div className="orders-list">
                                    {MOCK_ORDERS.map(o => (
                                        <div key={o.id} className="order-item">
                                            <div className="order-item-left">
                                                <span className="order-id">{o.id}</span>
                                                <span className="order-date">{o.date} · {o.items} item{o.items > 1 ? 's' : ''}</span>
                                            </div>
                                            <div className="order-item-right">
                                                <span className="order-total">{o.total}</span>
                                                <span className={`order-status order-status-${o.status.toLowerCase()}`}>{o.status}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── Saved Addresses ─── */}
                    {activeSection === 'addresses' && (
                        <div className="profile-section-card">
                            <div className="profile-section-header">
                                <h2 className="heading-md profile-section-title">Saved Addresses</h2>
                                <button className="btn btn-outline btn-sm" onClick={() => alert('Add address form coming soon!')}>
                                    <Plus size={14} /> Add New
                                </button>
                            </div>
                            {addresses.length === 0 ? (
                                <div className="profile-empty">
                                    <MapPin size={40} opacity={0.2} />
                                    <p>No saved addresses yet.</p>
                                </div>
                            ) : (
                                <div className="addresses-list">
                                    {addresses.map(a => (
                                        <div key={a.id} className="address-card">
                                            <div className="address-card-label">{a.label}</div>
                                            <p className="address-card-text">
                                                {a.line1}<br />
                                                {a.city}, {a.state} – {a.pin}
                                            </p>
                                            <div className="address-card-actions">
                                                <button className="btn-text-sm" onClick={() => alert('Edit coming soon!')}>
                                                    <Edit2 size={14} /> Edit
                                                </button>
                                                <button className="btn-text-sm danger" onClick={() => deleteAddress(a.id)}>
                                                    <Trash2 size={14} /> Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── Wishlist ─── */}
                    {activeSection === 'wishlist' && (
                        <div className="profile-section-card">
                            <h2 className="heading-md profile-section-title">Wishlist</h2>
                            {wishlist.length === 0 ? (
                                <div className="profile-empty">
                                    <Heart size={40} opacity={0.2} />
                                    <p>Nothing saved yet. <Link to="/products">Browse products →</Link></p>
                                </div>
                            ) : (
                                <div className="profile-wishlist-grid">
                                    {wishlist.map(p => (
                                        <Link to={`/product/${p.id}`} key={p.id} className="profile-wish-card">
                                            <div className="profile-wish-img">
                                                <img src={p.image} alt={p.name} />
                                            </div>
                                            <p className="profile-wish-name">{p.name}</p>
                                            <p className="profile-wish-price">₹{(p.price * (1 - p.discountPercent / 100)).toLocaleString('en-IN')}</p>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                </section>
            </div>
        </main>
    );
}
