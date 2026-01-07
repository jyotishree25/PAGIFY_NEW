import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Trash2, ShoppingCart, ArrowRight, Home } from 'lucide-react';

// --- Theme and Data Mockup for Standalone Component ---

const themeStyles = {
  light: {
    appBg: "bg-white",
    headerBg: "bg-neutral-100",
    cardBg: "bg-white",
    cardHover: "bg-neutral-100",
    textColor: "text-gray-800",
    secondaryTextColor: "text-gray-500",
    accent: "text-emerald-700",
    accentButtonBg: "bg-emerald-700",
    accentButtonHover: "hover:bg-emerald-800",
    headerIconColor: "text-black",
  },
  dark: {
    appBg: "bg-gray-900",
    headerBg: "bg-gray-600",
    cardBg: "bg-gray-700",
    cardHover: "bg-gray-800",
    textColor: "text-gray-100",
    secondaryTextColor: "text-gray-400",
    accent: "text-emerald-400",
    accentButtonBg: "bg-emerald-700",
    accentButtonHover: "hover:bg-emerald-600",
    headerIconColor: "text-gray-100",
  },
};

const initialWishlistData = [
  { id: 1, title: "I owe you one", author: "Sophie Kinsella", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1539282361i/42369796.jpg", price: "₹350", inStock: true },
  { id: 2, title: "Factfulness", author: "Hans Rosling", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1523450989i/34890015.jpg", price: "₹500", inStock: true },
  { id: 3, title: "The Other Son", author: "Nick Alexander", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1360183184i/17260533.jpg", price: "₹280", inStock: false },
  { id: 4, title: "Can you keep a secret", author: "Sophie Kinsella", cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1362040103i/6207.jpg", price: "₹399", inStock: true },
];

// --------------------------------------------------------


export default function WishlistPage() {
  // Mock theme state - can be replaced with context/prop from main app
  const [theme, setTheme] = useState("light"); 
  const currentTheme = themeStyles[theme];

  // Mock wishlist state - in a real app, this would be global state/API data
  const [wishlist, setWishlist] = useState(initialWishlistData);
  const [movedToCartMessage, setMovedToCartMessage] = useState(null);

  const handleRemoveFromWishlist = (bookId) => {
    setWishlist(wishlist.filter(item => item.id !== bookId));
    setMovedToCartMessage(null); // Clear any other message
  };

  const handleMoveToCart = (book) => {
    if (!book.inStock) return;
    // Simulate moving to cart by removing from wishlist and showing a message
    setWishlist(wishlist.filter(item => item.id !== book.id));
    setMovedToCartMessage(`${book.title} has been moved to your cart!`);
    // In a real app, you would call a function to add the item to the cart state/API
  };

  const calculateTotalPrice = () => {
    return wishlist.reduce((total, item) => total + (item.inStock ? parseFloat(item.price.replace('₹', '')) : 0), 0);
  };
  
  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`min-h-screen flex flex-col ${currentTheme.appBg}`}>
      
      {/* Header */}
      <header className={`flex-shrink-0 flex items-center justify-between p-4 shadow-md ${currentTheme.headerBg} border-b border-gray-200 dark:border-gray-700`}>
        <div className="flex items-center space-x-4">
            <h1 className={`text-3xl font-bold ${currentTheme.textColor}`}>
                <Heart className={`inline h-8 w-8 mr-2 fill-red-500 text-red-500`} />
                Your Wishlist
            </h1>
        </div>
        <div className="flex items-center space-x-4">
            <motion.a 
                href="/user/home" // Link back to the home page
                className="p-2 rounded-full transition-colors duration-200 hover:bg-neutral-200 dark:hover:bg-gray-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Home className={`h-6 w-6 ${currentTheme.headerIconColor}`} />
            </motion.a>
             <motion.button
                onClick={handleThemeToggle}
                className="p-2 rounded-full transition-colors duration-200 hover:bg-neutral-200 dark:hover:bg-gray-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {theme === 'light' ? 
                    <ArrowRight className={`h-6 w-6 ${currentTheme.headerIconColor}`} /> : 
                    <ArrowRight className={`h-6 w-6 ${currentTheme.headerIconColor}`} />
                }
            </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {movedToCartMessage && (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-lg bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-semibold"
            >
                {movedToCartMessage}
            </motion.div>
        )}
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Wishlist Items */}
          <motion.div 
            className="lg:w-3/4 space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={`text-2xl font-semibold ${currentTheme.textColor}`}>
                Items in Wishlist ({wishlist.length})
            </h2>

            {wishlist.length === 0 ? (
                <div className={`p-10 rounded-xl text-center border-2 border-dashed border-gray-300 dark:border-gray-700 ${currentTheme.cardHover}`}>
                    <Heart className={`h-12 w-12 mx-auto mb-4 text-red-500`} />
                    <p className={`text-xl font-medium ${currentTheme.textColor}`}>Your wishlist is feeling a little empty!</p>
                    <p className={`text-md ${currentTheme.secondaryTextColor} mt-2`}>Browse our popular books and click the heart icon to add items here.</p>
                    <motion.a
                        href="/user/home"
                        className={`mt-6 inline-flex items-center px-6 py-2 ${currentTheme.accentButtonBg} ${currentTheme.accentButtonHover} text-white rounded-full font-semibold transition-colors`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Home className="h-5 w-5 mr-2" />
                        Go to Home Page
                    </motion.a>
                </div>
            ) : (
                <div className="space-y-4">
                    {wishlist.map(book => (
                        <motion.div 
                            key={book.id} 
                            className={`flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 p-4 rounded-lg shadow-md ${currentTheme.cardBg}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img src={book.cover} alt={book.title} className="w-20 h-32 rounded-lg shadow-lg flex-shrink-0" />
                            
                            <div className="flex-1">
                                <h3 className={`text-lg font-bold ${currentTheme.textColor}`}>{book.title}</h3>
                                <p className={`text-sm ${currentTheme.secondaryTextColor}`}>By: {book.author}</p>
                                <p className={`text-xl font-extrabold ${currentTheme.accent} mt-2`}>{book.price}</p>
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${book.inStock ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'}`}>
                                    {book.inStock ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>

                            <div className="flex space-x-3 items-center flex-shrink-0">
                                <motion.button
                                    className={`px-4 py-2 text-sm rounded-full font-semibold transition-colors duration-200 ${book.inStock ? `${currentTheme.accentButtonBg} ${currentTheme.accentButtonHover} text-white` : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                                    onClick={() => handleMoveToCart(book)}
                                    whileHover={book.inStock ? { scale: 1.05 } : {}}
                                    whileTap={book.inStock ? { scale: 0.95 } : {}}
                                    disabled={!book.inStock}
                                >
                                    <ShoppingCart className="h-4 w-4 inline mr-1" />
                                    {book.inStock ? 'Move to Cart' : 'Notify Me'}
                                </motion.button>
                                
                                <motion.button 
                                    onClick={() => handleRemoveFromWishlist(book.id)}
                                    className="p-3 rounded-full text-gray-400 hover:text-red-500 transition-colors bg-neutral-100 dark:bg-gray-900 hover:bg-red-50 dark:hover:bg-red-900"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Trash2 className="h-5 w-5" />
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
          </motion.div>

          {/* Summary Card */}
          <motion.div 
            className={`lg:w-1/4 p-6 rounded-xl shadow-lg h-fit ${currentTheme.cardBg}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className={`text-xl font-bold ${currentTheme.textColor} mb-4 border-b pb-2 border-gray-200 dark:border-gray-700`}>Wishlist Summary</h3>
            
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span className={`${currentTheme.secondaryTextColor}`}>Total Items:</span>
                    <span className={`font-semibold ${currentTheme.textColor}`}>{wishlist.length}</span>
                </div>
                <div className="flex justify-between">
                    <span className={`${currentTheme.secondaryTextColor}`}>Available for Purchase:</span>
                    <span className={`font-semibold ${currentTheme.textColor}`}>{wishlist.filter(item => item.inStock).length}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span className={`text-lg font-bold ${currentTheme.textColor}`}>Subtotal:</span>
                    <span className={`text-lg font-bold ${currentTheme.accent}`}>₹{calculateTotalPrice().toFixed(2)}</span>
                </div>
            </div>

            <motion.button
                className={`mt-6 w-full px-4 py-3 text-lg rounded-full ${currentTheme.accentButtonBg} ${currentTheme.accentButtonHover} text-white font-semibold transition-colors`}
                onClick={() => console.log('Proceed to checkout with available items')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={wishlist.filter(item => item.inStock).length === 0}
            >
                Checkout Available Items
            </motion.button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}