import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import './Contact.css';

export default function Contact() {
    const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handleSubmit = (e) => { e.preventDefault(); setSent(true); };

    return (
        <main className="contact-page page-enter">
            {/* Header */}
            <div className="contact-header">
                <div className="container">
                    <h1 className="heading-xl">Contact</h1>
                    <p className="subheading">We're here to help. Reach out for product enquiries, installation advice or showroom visits.</p>
                </div>
            </div>

            <div className="container contact-layout">
                {/* Left Column: Info */}
                <div className="contact-info-col">
                    <div className="contact-info-block">
                        <h3 className="contact-block-title">Showroom</h3>
                        <p className="contact-block-text">
                            12, Avinashi Road, Peelamedu,<br />
                            Coimbatore – 641 004<br />
                            Tamil Nadu, India
                        </p>
                        <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="contact-link">
                            Get Directions <ArrowRight size={14} />
                        </a>
                    </div>

                    <div className="contact-info-block">
                        <h3 className="contact-block-title">Hours</h3>
                        <div className="hours-grid">
                            <div className="hours-row">
                                <span className="hours-day">Monday – Friday</span>
                                <span className="hours-time">9:00 AM – 7:00 PM</span>
                            </div>
                            <div className="hours-row">
                                <span className="hours-day">Saturday</span>
                                <span className="hours-time">9:00 AM – 6:00 PM</span>
                            </div>
                            <div className="hours-row">
                                <span className="hours-day">Sunday</span>
                                <span className="hours-time closed">Closed</span>
                            </div>
                        </div>
                    </div>

                    <div className="contact-info-block">
                        <h3 className="contact-block-title">Contact Details</h3>
                        <div className="contact-methods">
                            <div className="contact-method">
                                <Phone size={16} className="contact-method-icon" />
                                <div>
                                    <span className="contact-method-label">Call Us</span>
                                    <a href="tel:+919876543210" className="contact-method-val">+91 98765 43210</a>
                                </div>
                            </div>
                            <div className="contact-method">
                                <Mail size={16} className="contact-method-icon" />
                                <div>
                                    <span className="contact-method-label">Email</span>
                                    <a href="mailto:hello@starbathworld.com" className="contact-method-val">hello@starbathworld.com</a>
                                </div>
                            </div>
                            <div className="contact-method">
                                <MessageCircle size={16} className="contact-method-icon" />
                                <div>
                                    <span className="contact-method-label">WhatsApp</span>
                                    <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="contact-method-val">+91 98765 43210</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Form */}
                <div className="contact-form-col">
                    <div className="contact-form-wrapper">
                        <h2 className="heading-md" style={{ marginBottom: 32 }}>Send an Enquiry</h2>

                        {sent ? (
                            <div className="form-success">
                                <div className="success-emoji">✨</div>
                                <h3>Thank you for reaching out.</h3>
                                <p>We have received your message and will respond within 24 hours.</p>
                                <button className="btn btn-dark" style={{ marginTop: 24 }} onClick={() => setSent(false)}>Send Another Message</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="minimal-form">
                                <div className="form-row-2">
                                    <div className="form-group">
                                        <label className="form-label">Full Name</label>
                                        <input name="name" className="form-input" required value={form.name} onChange={handleChange} placeholder="Jane Doe" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Phone Number</label>
                                        <input name="phone" className="form-input" required value={form.phone} onChange={handleChange} placeholder="+91 00000 00000" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Email Address</label>
                                    <input name="email" type="email" className="form-input" required value={form.email} onChange={handleChange} placeholder="hello@example.com" />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Subject</label>
                                    <select name="subject" className="form-select" value={form.subject} onChange={handleChange} required>
                                        <option value="" disabled>Select a subject</option>
                                        <option>Product Enquiry</option>
                                        <option>Price Quote / Build a Set</option>
                                        <option>Installation Request</option>
                                        <option>After-Sales Support</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Message</label>
                                    <textarea name="message" className="form-textarea" required value={form.message} onChange={handleChange} placeholder="How can we help you?" rows={4} />
                                </div>

                                <button type="submit" className="btn btn-dark" style={{ width: '100%', marginTop: 8 }}>
                                    Submit Enquiry
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
