import React, { useState, useMemo } from 'react';
import { ShoppingCart, X, Plus, Minus, Home, Trash2, ArrowLeft, LoaderCircle, BadgeDollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Book Data Definitions (Reusing from category.jsx context) ---

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

// Helper to generate IDs
const generateId = (() => {
    let idCounter = 1;
    return () => `b${idCounter++}`;
})();

// Helper function to create mock cart data with quantities
const getMockCartData = () => {
    const mockBooks = [
        { id: generateId(), subcategory: 'romance', title: 'The Last Summer Whisper', price: 14.50, premium: false, form: 'hard-copy', quantity: 2 },
        { id: generateId(), subcategory: 'sci-fi', title: 'Galactic Pioneers, Vol. 3', price: 22.99, premium: true, form: 'e-read', quantity: 1 },
        { id: generateId(), subcategory: 'business', title: 'The Lean Startup Revisited', price: 19.00, premium: false, form: 'hard-copy', quantity: 3 },
    ];
    // Add image URLs based on title
    return mockBooks.map(book => ({
        ...book,
        image: `https://placehold.co/100x130/cfcfcf/333333?text=${encodeURIComponent(book.title.split(' ').slice(0, 2).join('\n'))}`,
    }));
};

// --- Constants (Still needed for total cost calculation) ---
const SHIPPING_RATE = 8.00;
const TAX_RATE = 0.05; // 5% tax

// Currency formatting helper: Changed to Indian Rupee (₹)
const formatCurrency = (amount) => `₹${amount.toFixed(2)}`;

// --- Cart Item Component ---
const CartItem = ({ item, onQuantityChange, onRemove }) => {
    const genreName = pretty[item.subcategory] || item.subcategory;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex items-start bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm mb-4"
        >
            {/* Image */}
            <div className="flex-shrink-0 w-20 h-28 sm:w-24 sm:h-32 mr-4 rounded-lg overflow-hidden border border-gray-100">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex-1 min-w-0">
                {/* Title & Info */}
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-1">
                    {item.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                    {genreName} | <span className="capitalize">{item.form}</span>
                    {item.premium && <span className="ml-2 inline-flex items-center text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full"><BadgeDollarSign size={12} /> Premium</span>}
                </p>

                {/* Price and Quantity Controls */}
                <div className="flex items-center justify-between mt-3">
                    {/* Item Price: Changed color to black/gray-900 and used new formatCurrency */}
                    <div className="text-lg font-bold text-gray-900">
                        {formatCurrency(item.price * item.quantity)}
                    </div>
                    <div className="flex items-center border border-gray-300 rounded-lg p-1">
                        <button
                            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-1 text-gray-600 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label="Decrease quantity"
                        >
                            <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-medium text-gray-800 select-none">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                            className="p-1 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                            aria-label="Increase quantity"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Remove Button */}
            <button
                onClick={() => onRemove(item.id)}
                className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors self-start"
                aria-label="Remove item"
                title="Remove Item"
            >
                <Trash2 size={20} />
            </button>
        </motion.div>
    );
};

// --- Main Cart Component ---
export const App = () => {
    const [cartItems, setCartItems] = useState(getMockCartData);
    // Removed isProcessing state as it is no longer used for simulation

    // --- Calculations ---
    const { subtotal, totalItems, totalCost } = useMemo(() => {
        const initialValue = { subtotal: 0, totalItems: 0 };
        const result = cartItems.reduce((acc, item) => {
            acc.subtotal += item.price * item.quantity;
            acc.totalItems += item.quantity;
            return acc;
        }, initialValue);

        // Note: Calculations still use hardcoded global rates for demo purposes
        const tax = result.subtotal * TAX_RATE;
        const total = result.subtotal + tax + (result.subtotal > 0 ? SHIPPING_RATE : 0);

        return {
            subtotal: result.subtotal,
            // Removed taxAmount as it's no longer displayed
            totalItems: result.totalItems,
            totalCost: total
        };
    }, [cartItems]);

    const isCartEmpty = cartItems.length === 0;

    // --- Handlers ---
    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    const handleRemoveItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    // Modified to immediately redirect to /user/ordersummary
    const handleCheckout = () => {
        if (isCartEmpty) return;

        // Redirect to the order summary page
        window.location.href = '/user/ordersummary';
    };

    // --- Rendering Components ---
    const renderOrderSummary = () => (
        <div className="sticky top-24 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">Order Total</h3>
            <div className="space-y-3 text-gray-700">
                {/* Only showing the final total cost */}
                <div className="flex justify-between items-center text-4xl font-black text-gray-900">
                    <span>Total Price</span>
                    <span>{formatCurrency(totalCost)}</span>
                </div>
            </div>
            <motion.button
                onClick={handleCheckout}
                disabled={isCartEmpty}
                className={`mt-6 w-full py-3 rounded-full text-white font-bold text-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
                    isCartEmpty
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-700 active:ring-4 active:ring-emerald-300'
                }`}
                whileHover={{ scale: isCartEmpty ? 1 : 1.01 }}
                whileTap={{ scale: isCartEmpty ? 1 : 0.98 }}
            >
                {/* Removed processing spinner logic */}
                <BadgeDollarSign size={20} />
                Proceed to Checkout
            </motion.button>
        </div>
    );

    // Changed anchor tag to button using window.history.back()
    const renderEmptyCart = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="col-span-full bg-white p-12 rounded-xl shadow-lg text-center border border-gray-200"
        >
            <ShoppingCart size={48} className="text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Your Cart is Empty</h2>
            <p className="text-gray-500 mb-6">
                Looks like you haven't added any books yet. Start exploring our categories!
            </p>
            <button
                onClick={() => window.history.back()}
                className="inline-flex items-center bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition-colors shadow-md gap-2"
            >
                <ArrowLeft size={20} />
                Continue Shopping
            </button>
        </motion.div>
    );

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col font-inter">
            {/* Navbar (Minimal for Cart Page) */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
                <div className="container mx-auto max-w-screen-2xl px-4 md:px-12 py-3 flex items-center justify-between">
                    <a
                        href="/" // Link back to the main category/home page (kept as home link)
                        className="flex items-center text-2xl font-extrabold tracking-tight text-gray-800"
                    >
                        <span className="text-black">Pa</span>
                        <span className="text-emerald-500 text-3xl md:text-5xl">G</span>
                        <span className="text-black">ify</span>
                    </a>
                    <div className="text-gray-700 text-lg font-medium hidden sm:block">
                        Your Shopping Cart ({totalItems} items)
                    </div>
                    <a
                        href="/user/home"
                        className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-center"
                        title="Back to Home"
                        aria-label="Back to Home"
                    >
                        <Home size={22} />
                    </a>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto max-w-screen-2xl px-4 md:px-12 py-10 flex-1">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <ShoppingCart size={28} className="text-blue-600" />
                        Shopping Cart
                    </h1>
                </div>

                <div className="md:grid md:grid-cols-3 md:gap-8">
                    {/* Cart Items List - Takes 2/3 column space */}
                    <div className="md:col-span-2">
                        {isCartEmpty ? (
                            renderEmptyCart()
                        ) : (
                            <div className="cart-list">
                                <AnimatePresence mode="popLayout">
                                    {cartItems.map(item => (
                                        <CartItem
                                            key={item.id}
                                            item={item}
                                            onQuantityChange={handleQuantityChange}
                                            onRemove={handleRemoveItem}
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                        {/* Changed anchor tag to button using window.history.back() */}
                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center mt-6 text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                        >
                            <ArrowLeft size={18} className="mr-2" /> Continue Shopping
                        </button>
                    </div>

                    {/* Order Summary - Takes 1/3 column space */}
                    <div className="md:col-span-1 mt-8 md:mt-0">
                        {renderOrderSummary()}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-6 mt-8 shadow-inner">
                <div className="container mx-auto max-w-screen-2xl px-4 md:px-12 text-center text-sm text-gray-500">
                    &copy; 2024 PaGify. All Rights Reserved.
                </div>
            </footer>
        </div>
    );
};

export default App;
