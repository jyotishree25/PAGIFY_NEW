import React, { useState, useEffect, useMemo } from 'react';
import {
    Search,
    Heart,
    ShoppingCart,
    User,
    Home,
    X,
    BadgeDollarSign,
    LoaderCircle,
    Filter
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// --- Book data simulation & definitions ---
const allGenres = [
    "horror", "romance", "mystery", "sci-fi", "autobiography",
    "business", "self-help", "study", "politics", "travel",
    "art", "bengali", "children", "cooking", "manga", "poetry",
    "religion"
];

const pretty = {
    "horror": "Horror", "romance": "Romance", "mystery": "Mystery & Thriller",
    "sci-fi": "Science Fiction", "autobiography": "Autobiography", "business": "Business & Economy",
    "self-help": "Self Help", "study": "Study Materials", "politics": "Current Affairs & Politics",
    "travel": "Travel", "art": "Art & Photography", "bengali": "Bengali Books & Covers",
    "children": "Children's Book", "cooking": "Cooking", "manga": "Manga", "poetry": "Poetry",
    "religion": "Religion & Spirituality"
};

const generateId = (() => {
    let idCounter = 1;
    return () => `b${idCounter++}`;
})();

const generateBooks = () => {
    const forms = ['e-read', 'hard-copy'];
    const generatedBooks = [];
    allGenres.forEach(sub => {
        const premiumIndices = new Set();
        while (premiumIndices.size < 2) premiumIndices.add(Math.floor(Math.random() * 7));
        for (let i = 0; i < 7; i++) {
            const id = generateId();
            const isPremium = premiumIndices.has(i);
            const title = `${pretty[sub]} Book ${i + 1}`;
            const price = (Math.floor(Math.random() * 30) + 10);
            generatedBooks.push({
                id,
                subcategory: sub,
                title,
                price,
                premium: isPremium,
                form: forms[Math.floor(Math.random() * forms.length)],
                image: `https://placehold.co/200x260/${(isPremium ? 'd1d1d1' : 'cfcfcf')}/333333?text=${encodeURIComponent(title.replace(' ', '\n'))}`,
            });
        }
    });
    return generatedBooks;
};

// --- Reusable Modal Component ---
const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-white rounded-xl shadow-2xl w-full max-w-xl mx-auto p-6 relative"
                    initial={{ scale: 0.9, y: -50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 50 }}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Close modal"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>
                    <h2 className="text-2xl font-bold mb-4">{title}</h2>
                    {children}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// --- Book Card Component (Moved outside App for better performance) ---
const BookCard = ({ book, onWishlistClick, onCartClick, onPremiumClick, isWishlisted }) => (
    <div className="bg-white rounded-xl p-4 text-center book-card relative flex flex-col items-center shadow-lg hover:shadow-xl transition-all duration-300">
        <img
            src={book.image}
            alt={book.title}
            className="w-full h-auto rounded-lg object-cover mb-4 shadow-md"
        />
        <div className="flex-1 w-full text-left">
            <h3 className="text-base font-semibold text-gray-800 line-clamp-2">{book.title}</h3>
            <div className="text-sm font-medium text-gray-600 mt-1">S${book.price.toFixed(2)}</div>
            <div className="text-xs text-gray-400 mt-1">{pretty[book.subcategory]}</div>
        </div>
        <div className="mt-4 w-full flex justify-between items-center gap-2">
            {book.premium ? (
                <button
                    className="w-full bg-yellow-500 text-white px-3 py-2 rounded-full text-sm font-bold hover:bg-yellow-600 transition-colors shadow-md flex items-center justify-center gap-1.5"
                    onClick={() => onPremiumClick()}
                >
                    <BadgeDollarSign size={16} /> Premium
                </button>
            ) : (
                <button
                    className="w-full bg-emerald-500 text-white px-3 py-2 rounded-full text-sm font-bold hover:bg-emerald-600 transition-colors shadow-md flex items-center justify-center gap-1.5"
                    onClick={() => onCartClick(book.id)}
                >
                    <ShoppingCart size={16} />
                    Add to Cart
                </button>
            )}
        </div>
        <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button
                className={`wish-btn p-2 rounded-full transition-all duration-200 hover:bg-gray-100 ${isWishlisted ? 'text-red-500' : 'text-gray-400'}`}
                onClick={() => onWishlistClick(book.id)}
                title="Add to wishlist"
            >
                <Heart size={20} className={`${isWishlisted ? 'fill-current' : ''}`} />
            </button>
        </div>
    </div>
);


// --- Main App Component ---
export const App = () => {
    const [books, setBooks] = useState([]);
    const [wishlist, setWishlist] = useState(new Set());
    const [cart, setCart] = useState(new Set());
    const [searchTerm, setSearchTerm] = useState('');

    // Active filter state
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [selectedForms, setSelectedForms] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(50); // Assumed max price for all books

    // Kept for Premium Modal only
    const [showPremiumModal, setShowPremiumModal] = useState(false);
    
    // Removed wishlistPop and cartPop states
    const [loading, setLoading] = useState(true);

    // Initial data generation on component mount
    useEffect(() => {
        setBooks(generateBooks());
        setLoading(false);
    }, []);

    // Removed useEffects for pop animations

    // Memoize filtered books to prevent re-computation
    const filteredBooks = useMemo(() => {
        let newFilteredBooks = books;

        if (selectedSubcategories.length > 0) {
            newFilteredBooks = newFilteredBooks.filter(b => selectedSubcategories.includes(b.subcategory));
        }

        if (selectedForms.length > 0) {
            newFilteredBooks = newFilteredBooks.filter(b => {
                if (selectedForms.includes('premium')) {
                    if (b.premium) return true;
                }
                if (selectedForms.includes('hard-copy')) {
                    if (b.form === 'hard-copy') return true;
                }
                return false;
            });
        }

        newFilteredBooks = newFilteredBooks.filter(b => b.price >= minPrice && b.price <= maxPrice);

        if (searchTerm) {
            newFilteredBooks = newFilteredBooks.filter(b => b.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        return newFilteredBooks;
    }, [books, selectedSubcategories, selectedForms, minPrice, maxPrice, searchTerm]);

    // --- Handlers ---
    const handleGenreFilterChange = (e) => {
        const { value, checked } = e.target;
        setSelectedSubcategories(prev => checked ? [...prev, value] : prev.filter(sub => sub !== value));
    };
    
    const handleFormFilterChange = (e) => {
        const { value, checked } = e.target;
        setSelectedForms(prev => checked ? [...prev, value] : prev.filter(form => form !== value));
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setSelectedSubcategories([]);
        setSelectedForms([]);
    };
    
    const handleClearAll = () => {
        setSelectedSubcategories([]);
        setSelectedForms([]);
        setMinPrice(0);
        setMaxPrice(50);
        setSearchTerm('');
    };

    const handleWishlistClick = (id) => {
        setWishlist(prev => {
            const newWishlist = new Set(prev);
            if (newWishlist.has(id)) {
                newWishlist.delete(id);
            } else {
                newWishlist.add(id);
            }
            return newWishlist;
        });
    };

    // Updated: Adds item to cart and redirects to /user/cart on addition
    const handleCartClick = (id) => {
        const isAdding = !cart.has(id); // Determine if we are adding BEFORE state update is scheduled
        
        // This toggles the item
        setCart(prev => {
            const newCart = new Set(prev);
            if (isAdding) {
                newCart.add(id);
            } else {
                newCart.delete(id);
            }
            return newCart;
        });

        if (isAdding) {
            // Redirect only on ADDITION
            window.location.href = '/user/cart';
        }
    };

    const handlePremiumClick = () => {
        setShowPremiumModal(true);
    };

    const getBooksFromSet = (itemSet) => {
        return Array.from(itemSet).map(id => books.find(b => b.id === id));
    };

    const renderSearchResults = () => {
        if (!searchTerm) return null;
        const parts = filteredBooks.length > 0 ? [`Found ${filteredBooks.length} result(s) for `, `"${searchTerm}"`] : [`No results found for `, `"${searchTerm}"`];
        return (
            <h2 className="text-xl font-semibold mb-4">
                {parts[0]}<span className="text-blue-600 font-bold">{parts[1]}</span>
            </h2>
        );
    };

    const renderBookGrid = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center p-12">
                    <LoaderCircle size={48} className="animate-spin text-blue-600" />
                </div>
            );
        }

        if (filteredBooks.length === 0) {
            return (
                <div className="bg-white rounded-xl p-6 text-center text-gray-500 shadow-lg">
                    No books found. Please adjust your filters or search term.
                </div>
            );
        }
        return (
            <div id="bookGrid" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                <AnimatePresence>
                    {filteredBooks.map(book => (
                        <motion.div
                            key={book.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <BookCard
                                book={book}
                                onWishlistClick={handleWishlistClick}
                                onCartClick={handleCartClick}
                                onPremiumClick={handlePremiumClick}
                                isWishlisted={wishlist.has(book.id)}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col font-inter">
            {/* Style for custom UI elements */}
            <style>
                {`
                .book-card { transition: transform .18s, box-shadow .18s; }
                .book-card:hover { transform: translateY(-6px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
                .wish-btn, .cart-btn { transform: translateY(0); transition: transform .2s ease-in-out; }
                .wish-btn:hover, .cart-btn:hover { transform: translateY(-2px); }

                /* Custom style to enforce emerald color on checked checkboxes */
                input[type="checkbox"]:checked {
                    accent-color: #10b981;
                }

                /* Custom range slider styling */
                .range-slider-container {
                    position: relative;
                    height: 24px;
                    width: 100%;
                }
                
                .range-slider-container input[type="range"] {
                    -webkit-appearance: none;
                    appearance: none;
                    background: transparent;
                    width: 100%;
                    position: absolute;
                    pointer-events: none;
                }

                .range-slider-container input[type="range"]::-webkit-slider-runnable-track {
                    height: 8px;
                    background: #e5e7eb; /* gray-200 */
                    border-radius: 9999px;
                }

                .range-slider-container input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    height: 16px;
                    width: 16px;
                    background-color: #10b981; /* emerald-500 */
                    border-radius: 9999px;
                    margin-top: -4px;
                    cursor: pointer;
                    pointer-events: all;
                    border: 2px solid white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    transition: transform 0.1s ease-in-out;
                }

                .range-slider-container input[type="range"]::-webkit-slider-thumb:hover {
                    transform: scale(1.1);
                }
                
                .tooltip-container {
                    position: relative;
                    display: inline-block;
                }
                .tooltip {
                    position: absolute;
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%) translateY(-8px);
                    background-color: #333;
                    color: white;
                    padding: 6px 12px;
                    border-radius: 6px;
                    white-space: nowrap;
                    font-size: 0.75rem;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.2s, visibility 0.2s;
                    pointer-events: none;
                    z-index: 10;
                }
                .tooltip::after {
                    content: '';
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    border-width: 5px;
                    border-style: solid;
                    border-color: #333 transparent transparent transparent;
                }
                .tooltip-container:hover .tooltip {
                    opacity: 1;
                    visibility: visible;
                }

                `}
            </style>
            
            {/* Navbar */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
                <div className="container mx-auto max-w-screen-2xl px-4 md:px-12 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        {/* Home Icon links to /user/home */}
                        <a
                            href="/user/home"
                            className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-center"
                            title="Go to Home"
                            aria-label="Go to Home"
                        >
                            <Home size={22} />
                        </a>
                        <div className="flex items-center text-2xl font-extrabold tracking-tight text-gray-800">
                            
                            <h1 className="text-xl md:text-3xl font-bold flex items-center">
                                <span className="text-black">Pa</span>
                                <span className="text-emerald-500 text-3xl md:text-5xl">G</span>
                                <span className="text-black">ify</span>
                            </h1>
                            
                        </div>
                    </div>

                    <div className="flex-1 max-w-2xl hidden md:block">
                        <div className="relative">
                            <input
                                type="search"
                                className="w-full border border-gray-300 rounded-full py-2.5 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                placeholder="Search books, authors, categories..."
                                aria-label="Search books"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                <Search size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Wishlist button now redirects to /user/wishlist */}
                        <button
                            onClick={() => { window.location.href = '/user/wishlist'; }}
                            className="relative p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                            title="Wishlist"
                            aria-label="Wishlist"
                        >
                            <Heart size={22} />
                            {/* Removed pop animation styling */}
                            <span className={`absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold`}>
                                {wishlist.size}
                            </span>
                        </button>
                        {/* Cart button now redirects to /user/cart */}
                        <button
                            onClick={() => { window.location.href = '/user/cart'; }}
                            className="relative p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                            title="Cart"
                            aria-label="Cart"
                        >
                            <ShoppingCart size={22} />
                            {/* Removed pop animation styling */}
                            <span className={`absolute -top-1 -right-1 text-xs bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold`}>
                                {cart.size}
                            </span>
                        </button>
                        <button
                            className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors hidden sm:block"
                            title="Profile"
                            aria-label="Profile"
                        >
                            <User size={22} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto max-w-screen-2xl px-4 md:px-12 py-8 flex flex-1">
                {/* Sidebar */}
                <aside className="w-full md:w-1/5 p-6 bg-white rounded-xl border border-gray-200 shadow-md flex-shrink-0 flex flex-col h-full overflow-hidden sticky top-12">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter size={20} className="text-gray-500" />
                        <h3 className="font-bold text-lg text-gray-800">Filter by</h3>
                    </div>
                    {/* The content that should have its own scrollbar */}
                    <div className="flex-1 overflow-y-auto pr-2" style={{ maxHeight: '75vh' }}>
                        {/* Genre Filter */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-700 mb-2 border-b border-gray-200 pb-2">Genre</h4>
                            <ul className="space-y-2 text-sm">
                                {allGenres.map(sub => (
                                    <li key={sub}>
                                        <label className="inline-flex items-center gap-2 cursor-pointer text-gray-700 hover:text-emerald-500 transition-colors">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox text-emerald-500 rounded-sm border-gray-300 focus:ring-emerald-500"
                                                value={sub}
                                                checked={selectedSubcategories.includes(sub)}
                                                onChange={handleGenreFilterChange}
                                            />
                                            {pretty[sub]}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* Price Range Filter */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-700 mb-2 border-b border-gray-200 pb-2">Price Range</h4>
                            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                                <span>S${minPrice}</span>
                                <span>S${maxPrice}</span>
                            </div>
                            <div className="range-slider-container">
                                <input
                                    type="range"
                                    min="0"
                                    max="50"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice))}
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="50"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice))}
                                />
                            </div>
                        </div>

                        {/* Form Filter */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-700 mb-2 border-b border-gray-200 pb-2">Form</h4>
                            <ul className="space-y-2 text-sm">
                                <li key="hard-copy">
                                    <label className="inline-flex items-center gap-2 cursor-pointer text-gray-700 hover:text-emerald-500 transition-colors">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox text-emerald-500 rounded-sm border-gray-300 focus:ring-emerald-500"
                                            value="hard-copy"
                                            checked={selectedForms.includes("hard-copy")}
                                            onChange={handleFormFilterChange}
                                        />
                                        Hard Copy
                                    </label>
                                </li>
                                <li key="premium">
                                    <label className="inline-flex items-center gap-2 cursor-pointer text-gray-700 hover:text-emerald-500 transition-colors">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox text-emerald-500 rounded-sm border-gray-300 focus:ring-emerald-500"
                                            value="premium"
                                            checked={selectedForms.includes("premium")}
                                            onChange={handleFormFilterChange}
                                        />
                                        Premium Special
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-2 mt-2 flex-shrink-0">
                        <button
                            onClick={handleClearAll}
                            className="w-full border border-gray-300 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors tooltip-container group"
                        >
                            Clear All
                            <span className="tooltip">Reset all filters</span>
                        </button>
                    </div>
                </aside>

                {/* Book Grid */}
                <div className="flex-1 p-6">
                    <div className="flex items-center justify-between mb-6">
                        {renderSearchResults() || (
                            <h2 className="text-xl font-semibold text-gray-800">
                                {selectedSubcategories.length > 0 ? `Showing: ${selectedSubcategories.map(s => pretty[s]).join(', ')}` : 'Explore your next favourite!'}
                            </h2>
                        )}
                        <div className="text-sm text-gray-500">
                            {filteredBooks.length} Books
                        </div>
                    </div>

                    {renderBookGrid()}
                </div>
            </main>

            {/* Modals */}
            
            {/* Wishlist and Cart Modals removed as requested */}

            <Modal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} title="Premium Content">
                <div className="text-center text-gray-700 p-4">
                    Get premium to unlock this book!
                </div>
            </Modal>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-6 mt-8 shadow-inner">
                <div className="container mx-auto max-w-screen-2xl px-4 md:px-12 text-center text-sm text-gray-500">
                    &copy; 2024 Bookshelves. All Rights Reserved.
                </div>
            </footer>
        </div>
    );
};

export default App;
