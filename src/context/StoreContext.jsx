import { createContext, useContext, useState, useCallback } from 'react';
import { getDiscountedPrice } from '../data/products';

const StoreContext = createContext();

export function StoreProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [toast, setToast] = useState(null);
    const [searchOpen, setSearchOpen] = useState(false);

    const showToast = useCallback((msg, icon = '✓') => {
        setToast({ msg, icon });
        setTimeout(() => setToast(null), 3000);
    }, []);

    /* ── Cart ─────────────────────────────────────────────── */
    const addToCart = useCallback((product, qty = 1) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === product.id);
            if (existing) {
                return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
            }
            const price = getDiscountedPrice(product.price, product.discountPercent);
            return [...prev, { ...product, qty, finalPrice: price }];
        });
        showToast(`${product.name} added to cart`, '🛒');
    }, [showToast]);

    const removeFromCart = useCallback((id) => {
        setCart(prev => prev.filter(i => i.id !== id));
    }, []);

    const updateQty = useCallback((id, qty) => {
        if (qty < 1) return;
        setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
    }, []);

    const clearCart = useCallback(() => setCart([]), []);

    const cartCount = cart.reduce((s, i) => s + i.qty, 0);
    const cartTotal = cart.reduce((s, i) => s + i.finalPrice * i.qty, 0);

    /* ── Wishlist ──────────────────────────────────────────── */
    const toggleWishlist = useCallback((product) => {
        setWishlist(prev => {
            const exists = prev.find(i => i.id === product.id);
            if (exists) {
                showToast(`Removed from wishlist`, '💔');
                return prev.filter(i => i.id !== product.id);
            }
            showToast(`Added to wishlist`, '❤️');
            return [...prev, product];
        });
    }, [showToast]);

    const isInWishlist = useCallback((id) => wishlist.some(i => i.id === id), [wishlist]);
    const wishlistCount = wishlist.length;

    return (
        <StoreContext.Provider value={{
            cart, cartCount, cartTotal,
            addToCart, removeFromCart, updateQty, clearCart,
            wishlist, wishlistCount, toggleWishlist, isInWishlist,
            toast, showToast,
            searchOpen, setSearchOpen,
        }}>
            {children}
        </StoreContext.Provider>
    );
}

export const useStore = () => useContext(StoreContext);
