import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
    const navigate = useNavigate();
    const [isFullDescVisible, setIsFullDescVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isShareTooltipVisible, setIsShareTooltipVisible] = useState(false);
    const [isCartTooltipVisible, setIsCartTooltipVisible] = useState(false);
    const [isWishlistTooltipVisible, setIsWishlistTooltipVisible] = useState(false);
    const [isProfileTooltipVisible, setIsProfileTooltipVisible] = useState(false);
    const [isProductWishlistTooltipVisible, setIsProductWishlistTooltipVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [reviewText, setReviewText] = useState('');

    const bookTitle = "The Age of Innocence";
    const bookAuthor = "Edith Wharton";

    const showModal = (content) => {
        setModalContent(content);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const handleMoreClick = (e) => {
        e.preventDefault();
        setIsFullDescVisible(!isFullDescVisible);
    };

    const handleWishlistClick = () => {
        setIsWishlisted(!isWishlisted);
    };

    const handleShareClick = () => {
        const url = window.location.href;
        const tempInput = document.createElement('textarea');
        tempInput.value = url;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
            document.execCommand('copy');
            showModal('Link copied to clipboard!');
        } catch (err) {
            showModal('Could not copy link. Please copy it manually.');
            console.error('Error copying to clipboard:', err);
        }
        document.body.removeChild(tempInput);
    };
    
    // Function to go back to the previous page
    const goBack = () => {
        window.history.back();
    };

    // Determine the classes for the submit button based on reviewText state
    const submitButtonClasses = `py-2 px-6 font-semibold rounded-full transition-colors bg-gray-100 text-gray-700
        ${reviewText.length > 0 ? 'hover:bg-emerald-600 hover:text-white' : 'hover:bg-gray-200'}`;

    const logoNormalText = "text-2xl font-bold text-gray-800";
    const logoGText = "text-5xl font-extrabold text-emerald-600";

    return (
        // Added a max-width and centered the entire application wrapper
        <div className="bg-gray-50 text-gray-800 flex justify-center min-h-screen">
            <div className="w-full max-w-screen-xl">
                {/* Header Section */}
                <header className="bg-white shadow-md py-4 px-8 sticky top-0 z-50">
                    <div className="container mx-auto flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-xl md:text-3xl font-bold flex items-end">
                                <span className="text-black">Pa</span>
                                <span className="text-emerald-500 text-3xl md:text-5xl">G</span>
                                <span className="text-black">ify</span>
                            </h1>

                            <div className="hidden lg:flex items-center space-x-4 ml-6">
                                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">Home</a>
                                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">My Books</a>
                                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">Community</a>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative hidden sm:block">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="pl-10 pr-4 py-2 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                />
                                <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                            </div>
                            <div className="flex items-center space-x-2 sm:space-x-4">
                                <div className="relative" onMouseEnter={() => setIsCartTooltipVisible(true)} onMouseLeave={() => setIsCartTooltipVisible(false)}>
                                    <a href="#" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.182 1.708.707 1.708H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                    </a>
                                    {isCartTooltipVisible && (
                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap shadow-md">
                                            Cart
                                            <div className="absolute left-1/2 bottom-[-4px] transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-solid border-transparent border-t-gray-800"></div>
                                        </div>
                                    )}
                                </div>
                                <div className="relative" onMouseEnter={() => setIsWishlistTooltipVisible(true)} onMouseLeave={() => setIsWishlistTooltipVisible(false)}>
                                    <a href="#" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                    </a>
                                    {isWishlistTooltipVisible && (
                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap shadow-md">
                                            Wishlist
                                            <div className="absolute left-1/2 bottom-[-4px] transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-solid border-transparent border-t-gray-800"></div>
                                        </div>
                                    )}
                                </div>
                                <div className="relative p-2 rounded-full hover:bg-gray-100 cursor-pointer" onMouseEnter={() => setIsProfileTooltipVisible(true)} onMouseLeave={() => setIsProfileTooltipVisible(false)}>
                                    <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                    {isProfileTooltipVisible && (
                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap shadow-md">
                                            Profile
                                            <div className="absolute left-1/2 bottom-[-4px] transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-solid border-transparent border-t-gray-800"></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Section */}
                <main className="container mx-auto px-4 py-8 md:px-8 lg:py-16">
                    <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-12 relative">
                        {/* Back button */}
                        <button 
                            onClick={goBack}
                            className="absolute top-4 left-4 md:top-6 md:left-6 p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        </button>
                        {/* Product Image and Actions */}
                        <div className="lg:w-1/3 flex flex-col items-center mt-12 lg:mt-0">
                            <div className="w-full max-w-sm h-96 rounded-lg shadow-xl mb-6 bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500 text-lg font-semibold text-center">{bookTitle}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:space-x-4 w-full justify-between items-center space-y-4 sm:space-y-0">
                                <div className="flex space-x-4 w-full sm:w-auto flex-grow">
                                    <button onClick={() => showModal('This button would take you to the checkout page!')} className="flex-grow py-3 px-6 bg-emerald-600 text-white font-semibold rounded-full shadow-lg hover:bg-emerald-700 transition-colors">
                                        Buy Now
                                    </button>
                                    <button onClick={() => showModal('Item added to cart!')} className="flex-grow py-3 px-6 bg-gray-100 text-gray-700 font-semibold rounded-full shadow-lg hover:bg-gray-200 transition-colors">
                                        Add to cart
                                    </button>
                                </div>
                                <div className="flex space-x-2">
                                    <div
                                        className="relative"
                                        onMouseEnter={() => setIsProductWishlistTooltipVisible(true)}
                                        onMouseLeave={() => setIsProductWishlistTooltipVisible(false)}
                                    >
                                        <button onClick={handleWishlistClick} className="p-3 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                                            <svg className={`w-6 h-6 ${isWishlisted ? 'hidden' : ''} text-gray-700`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                            <svg className={`w-6 h-6 ${isWishlisted ? '' : 'hidden'} text-red-500`} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" clipRule="evenodd"></path></svg>
                                        </button>
                                        {isProductWishlistTooltipVisible && (
                                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap shadow-md">
                                                {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                                                <div className="absolute left-1/2 bottom-[-4px] transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-solid border-transparent border-t-gray-800"></div>
                                            </div>
                                        )}
                                    </div>
                                    <div 
                                        className="relative"
                                        onMouseEnter={() => setIsShareTooltipVisible(true)}
                                        onMouseLeave={() => setIsShareTooltipVisible(false)}
                                    >
                                        <button onClick={handleShareClick} className="p-3 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                        </button>
                                        {isShareTooltipVisible && (
                                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap shadow-md">
                                                Share
                                                <div className="absolute left-1/2 bottom-[-4px] transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-solid border-transparent border-t-gray-800"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Product Details */}
                        <div className="lg:w-2/3">
                            <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-2">{bookTitle}</h1>
                            <p className="text-xl text-gray-600 font-semibold mb-2">{bookAuthor}</p>
                            <div className="flex items-center mb-2 space-x-2">
                                <div className="rating-stars text-lg text-yellow-400">★★★★☆</div>
                                <span className="text-gray-500 text-sm">(7569 ratings)</span>
                            </div>
                            <p className="text-3xl font-bold text-gray-900 mb-6">$12.99</p>
                            
                            <p className="text-gray-700 leading-relaxed mb-6">
                                <span className={isFullDescVisible ? 'hidden' : ''}>Set in the world of wealthy, old-money New York society in the 1870s, this classic novel follows Newland Archer, a respected lawyer engaged to the beautiful May Welland. Their perfect world is threatened by the arrival of May's cousin, the Countess Ellen Olenska. </span>
                                <span className={isFullDescVisible ? '' : 'hidden'}>The sophisticated and unconventional Countess, fleeing an unhappy marriage to a Polish Count, disrupts the tightly-controlled social circles. Newland finds himself drawn to Ellen's freedom and intellect, which stands in stark contrast to the rigid conformity of his own world and his fiancée. As Newland's passion for Ellen grows, he must choose between duty, social expectation, and a love that seems impossible within his society's rules.</span>
                                <a href="#" onClick={handleMoreClick} className="text-emerald-600 hover:underline">
                                    {isFullDescVisible ? 'less' : 'more'}
                                </a>
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-gray-700 mt-6">
                                <div>
                                    <span className="font-semibold">Publisher:</span> D. Appleton & Company
                                </div>
                                <div>
                                    <span className="font-semibold">First Published:</span> July 1920
                                </div>
                                <div>
                                    <span className="font-semibold">ISBN:</span> 9780684803657
                                </div>
                                <div>
                                    <span className="font-semibold">Language:</span> English
                                </div>
                                <div>
                                    <span className="font-semibold">Pages:</span> 360pp
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reviews and Related Books Section */}
                    <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Write Review Section */}
                        <div className="bg-white p-8 rounded-xl shadow-lg lg:col-span-2">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Write a Review</h2>
                            <div className="flex items-start space-x-4 mb-6">
                                <img src="https://placehold.co/40x40/f3f4f6/374151?text=U" alt="User Profile" className="w-10 h-10 rounded-full" />
                                <div className="flex-1">
                                    <textarea 
                                        id="review-textarea" 
                                        placeholder="Type here" 
                                        className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all h-24"
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                    ></textarea>
                                    <div className="flex items-center space-x-4 mt-4">
                                        <button 
                                            onClick={() => showModal('Review submitted successfully!')} 
                                            className={submitButtonClasses}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Existing Reviews */}
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Reviews</h2>
                            <div className="space-y-6">
                                {/* Review 1 */}
                                <div className="flex items-start space-x-4">
                                    <img src="https://placehold.co/40x40/f3f4f6/374151?text=U" alt="Gautham" className="w-10 h-10 rounded-full" />
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900">Emily Bronte</p>
                                        <div className="flex items-center text-sm space-x-2">
                                            <div className="rating-stars text-yellow-400">★★★★☆</div>
                                            <span className="text-gray-500">· July 21, 2022</span>
                                        </div>
                                        <p className="mt-2 text-gray-700 leading-relaxed">
                                            A masterful portrait of a bygone era. Wharton's prose is as sharp as the societal rules she dissects. I felt the tension between Newland and Ellen on every page, a powerful commentary on the suffocating nature of high society. A must-read for any fan of classic literature.
                                        </p>
                                    </div>
                                </div>
                                {/* Review 2 */}
                                <div className="flex items-start space-x-4">
                                    <img src="https://placehold.co/40x40/f3f4f6/374151?text=U" alt="Laura Radzievski" className="w-10 h-10 rounded-full" />
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900">Jane Austen</p>
                                        <div className="flex items-center text-sm space-x-2">
                                            <div className="rating-stars text-yellow-400">★★★★★</div>
                                            <span className="text-gray-500">· August 02, 2022</span>
                                        </div>
                                        <p className="mt-2 text-gray-700 leading-relaxed">
                                            Wharton's writing is a delight. The intricate details of New York's elite and the silent struggles of its characters make for a captivating read. It's a poignant story about the sacrifices made for the sake of appearances. I loved it.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Related Books Section */}
                        <div className="bg-white p-6 rounded-xl shadow-lg h-fit">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Books</h2>
                            <div className="space-y-6">
                                {/* Related Book 1 */}
                                <div className="flex items-start space-x-4 p-2 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg cursor-pointer">
                                    <img src="https://placehold.co/60x90/f8f9fa/374151?text=Book" alt="Book Cover" className="rounded-lg shadow" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">The House of Mirth</h3>
                                        <p className="text-sm text-gray-600">Edith Wharton</p>
                                        <div className="flex items-center text-sm space-x-2 mt-1">
                                            <div className="rating-stars text-yellow-400">★★★★☆</div>
                                            <span className="text-gray-500 text-xs">(1234)</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Related Book 2 */}
                                <div className="flex items-start space-x-4 p-2 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg cursor-pointer">
                                    <img src="https://placehold.co/60x90/f8f9fa/374151?text=Book" alt="Book Cover" className="rounded-lg shadow" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">Pride and Prejudice</h3>
                                        <p className="text-sm text-gray-600">Jane Austen</p>
                                        <div className="flex items-center text-sm space-x-2 mt-1">
                                            <div className="rating-stars text-yellow-400">★★★★★</div>
                                            <span className="text-gray-500 text-xs">(5678)</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Related Book 3 */}
                                <div className="flex items-start space-x-4 p-2 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg cursor-pointer">
                                    <img src="https://placehold.co/60x90/f8f9fa/374151?text=Book" alt="Book Cover" className="rounded-lg shadow" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">Wuthering Heights</h3>
                                        <p className="text-sm text-gray-600">Emily Bronte</p>
                                        <div className="flex items-center text-sm space-x-2 mt-1">
                                            <div className="rating-stars text-yellow-400">★★★☆☆</div>
                                            <span className="text-gray-500 text-xs">(9012)</span>
                                        </div>
                                    </div>
                                </div>
                                <a href="#" className="block mt-4 text-center text-emerald-600 hover:underline font-semibold">See all</a>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Modal for generated content */}
                {isModalVisible && (
                    <div className="modal" style={{ display: 'flex' }}>
                        <div className="modal-content">
                            <span className="close-btn" onClick={closeModal}>&times;</span>
                            <div className="text-gray-800 leading-relaxed">{modalContent}</div>
                        </div>
                    </div>
                )}

                {/* Footer Section */}
                <footer className="bg-white py-8 px-8 mt-12 shadow-inner">
                    <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-gray-600">
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">Pagify</h3>
                            <ul className="space-y-1 text-sm">
                                <li><a href="#" className="hover:underline">About us</a></li>
                                <li><a href="#" className="hover:underline">Careers</a></li>
                                <li><a href="#" className="hover:underline">Privacy</a></li>
                                <li><a href="#" className="hover:underline">Terms</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">Community</h3>
                            <ul className="space-y-1 text-sm">
                                <li><a href="#" className="hover:underline">Groups</a></li>
                                <li><a href="#" className="hover:underline">Discussions</a></li>
                                <li><a href="#" className="hover:underline">Blog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">More</h3>
                            <ul className="space-y-1 text-sm">
                                <li><a href="#" className="hover:underline">Authors</a></li>
                                <li><a href="#" className="hover:underline">Readers</a></li>
                                <li><a href="#" className="hover:underline">Help</a></li>
                            </ul>
                        </div>
                        <div className="col-span-2 md:col-span-1 lg:col-span-3">
                            <h3 className="font-semibold text-gray-800 mb-2">Contact</h3>
                            <p className="text-sm">For any queries, please email us.</p>
                            <div className="flex space-x-4 mt-2">
                                <a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07c3.252.148 4.67 1.624 4.818 4.829.058 1.264.07 1.644.07 4.849 0 3.204-.012 3.584-.07 4.85-.148 3.252-1.624-4.67-4.829-4.818-1.264-.058-1.644-.07-4.849-.07-3.204 0-3.584-.012-4.85-.07-3.252-.148-4.67-1.624-4.818-4.829-.058-1.264-.07-1.644-.07-4.849 0-3.204.012-3.584.07-4.85.148-3.252 1.624-4.67 4.829-4.818 1.264-.058 1.644-.07 4.849-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.623-6.98 6.98-.059 1.28-.073 1.688-.073 4.948 0 3.26.014 3.668.072 4.948.2 4.358 2.623 6.78 6.98 6.98 1.28.058 1.688.072 4.948.072 3.26 0 3.668-.014 4.948-.072 4.358-.2 6.78-2.623 6.98-6.98.058-1.28.072-1.688.072-4.948 0-3.259-.014-3.667-.072-4.947-.2-4.358-2.623-6.78-6.98-6.98-1.28-.059-1.688-.073-4.948-.073z"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-sm text-gray-500">
                        &copy; 2023 Pagify Inc.
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default App;