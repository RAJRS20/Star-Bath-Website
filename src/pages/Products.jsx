import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { products, categories, brands, formatPrice } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Products.css';

const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
];

export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [sort, setSort] = useState('default');
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const [selectedBrands, setSelectedBrands] = useState([]);

    const categoryParam = searchParams.get('category') || '';
    const searchParam = searchParams.get('search') || '';

    const filtered = useMemo(() => {
        let list = [...products];

        if (categoryParam) list = list.filter(p => p.category === categoryParam);
        if (searchParam) {
            const q = searchParam.toLowerCase();
            list = list.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.brand.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q)
            );
        }
        if (selectedBrands.length > 0) list = list.filter(p => selectedBrands.includes(p.brand));
        list = list.filter(p => {
            const fp = p.price * (1 - p.discountPercent / 100);
            return fp >= priceRange[0] && fp <= priceRange[1];
        });

        if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
        else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
        else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);

        return list;
    }, [categoryParam, searchParam, selectedBrands, priceRange, sort]);

    const activeCat = categories.find(c => c.id === categoryParam);

    const toggleBrand = (brand) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const clearFilters = () => {
        setSelectedBrands([]);
        setPriceRange([0, 100000]);
        setSearchParams({});
    };

    const hasFilters = categoryParam || searchParam || selectedBrands.length > 0;

    return (
        <main className="products-page page-enter">
            {/* Header */}
            <div className="products-header">
                <div className="container">
                    <div className="products-header-inner">
                        <div>
                            {/* Breadcrumb inline */}
                            <div className="breadcrumb" style={{ padding: '0 0 16px 0' }}>
                                <Link to="/" className="breadcrumb-item">Home</Link>
                                <span className="breadcrumb-sep">/</span>
                                <span className="breadcrumb-item active">
                                    {activeCat ? activeCat.name : searchParam ? `Search: "${searchParam}"` : 'Shop All'}
                                </span>
                            </div>
                            <h1 className="heading-lg">
                                {activeCat ? activeCat.name : searchParam ? `Results for "${searchParam}"` : 'Shop'}
                            </h1>
                        </div>
                        <div className="products-controls">
                            <span className="subheading" style={{ marginRight: 16 }}>{filtered.length} products</span>
                            <button className="products-filter-btn" onClick={() => setFiltersOpen(!filtersOpen)}>
                                <SlidersHorizontal size={16} />
                                Filters {hasFilters && <span className="filter-count">●</span>}
                            </button>
                            <select className="form-select" value={sort} onChange={e => setSort(e.target.value)} style={{ width: 'auto', borderRadius: '99px', padding: '0 36px 0 16px', height: '40px' }}>
                                {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container products-layout">
                {/* Sidebar */}
                <aside className={`products-sidebar ${filtersOpen ? 'open' : ''}`}>
                    <div className="sidebar-header flex-between">
                        <span className="label">Filters</span>
                        <button onClick={() => setFiltersOpen(false)} className="sidebar-close"><X size={18} /></button>
                    </div>

                    <div className="filter-group">
                        <h4 className="filter-heading">Category</h4>
                        <ul className="filter-list">
                            <li>
                                <label className={`filter-label ${!categoryParam ? 'active' : ''}`}>
                                    <input type="radio" name="cat" checked={!categoryParam} onChange={() => setSearchParams({})} />
                                    All Categories
                                </label>
                            </li>
                            {categories.map(cat => (
                                <li key={cat.id}>
                                    <label className={`filter-label ${categoryParam === cat.id ? 'active' : ''}`}>
                                        <input
                                            type="radio" name="cat"
                                            checked={categoryParam === cat.id}
                                            onChange={() => setSearchParams({ category: cat.id })}
                                        />
                                        {cat.name}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="filter-group">
                        <h4 className="filter-heading">Brand</h4>
                        <ul className="filter-list">
                            {brands.map(brand => (
                                <li key={brand}>
                                    <label className={`filter-label ${selectedBrands.includes(brand) ? 'active' : ''}`}>
                                        <input
                                            type="checkbox"
                                            checked={selectedBrands.includes(brand)}
                                            onChange={() => toggleBrand(brand)}
                                        />
                                        {brand}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="filter-group" style={{ borderBottom: 'none' }}>
                        <h4 className="filter-heading">Price</h4>
                        <div className="price-range">
                            <div className="price-display">
                                <span>{formatPrice(priceRange[0])}</span>
                                <span>{formatPrice(priceRange[1])}</span>
                            </div>
                            <input
                                type="range" min={0} max={100000} step={500}
                                value={priceRange[1]}
                                onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                                className="range-input"
                            />
                        </div>
                    </div>

                    {hasFilters && (
                        <button className="btn btn-outline" onClick={clearFilters} style={{ width: '100%', marginTop: 24 }}>
                            Clear All
                        </button>
                    )}
                </aside>

                {/* Products */}
                <div className="products-grid-area">
                    {filtered.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">🔍</div>
                            <h3>No Products Found</h3>
                            <p>Try adjusting your filters or search term.</p>
                            <button onClick={clearFilters} className="btn btn-dark">Clear Filters</button>
                        </div>
                    ) : (
                        <div className="products-grid-3">
                            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
