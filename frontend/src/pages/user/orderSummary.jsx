import React, { useState, useMemo } from 'react';
import { Minus, Plus, ShoppingBag, Trash } from 'lucide-react'; 

// --- DATA ---

// Initial state for the shopping cart items
const initialProducts = [
  { id: 1, name: 'Red T-Shirt', price: 60.00, size: 'M', quantity: 2, imageUrl: 'https://placehold.co/100x100/dc2626/ffffff?text=Red', color: 'red' },
  { id: 2, name: 'Green T-Shirt', price: 120.00, size: 'M', quantity: 1, imageUrl: 'https://placehold.co/100x100/16a34a/ffffff?text=Green', color: 'green' },
  { id: 3, name: 'Blue T-Shirt', price: 60.00, size: 'M', quantity: 2, imageUrl: 'https://placehold.co/100x100/2563eb/ffffff?text=Blue', color: 'blue' },
];

// Related products for the "Buy More" section
const relatedProducts = [
    { id: 4, name: 'Black Hoodie', price: 85.00, imageUrl: 'https://placehold.co/100x100/1f2937/ffffff?text=Hoodie' },
    { id: 5, name: 'Sports Socks (Pair)', price: 15.00, imageUrl: 'https://placehold.co/100x100/f59e0b/ffffff?text=Socks' },
];


// --- COMPONENTS ---

// Component for a single item in the order summary (now styled as the "Cart" list)
const ProductItem = ({ product, onQuantityChange, onRemove }) => {
  const { id, name, price, size, quantity, imageUrl } = product; 

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1);
    }
  };

  const handleIncrement = () => {
    onQuantityChange(id, quantity + 1);
  };

  return (
    <div className="flex items-start justify-between py-4 border-b border-gray-100 last:border-b-0">
      
      {/* LEFT SIDE: Image + Details */}
      <div className="flex flex-col md:flex-row items-start md:items-center w-full pr-4">
        {/* Image Card */}
        <div className="w-20 h-20 flex-shrink-0 mr-4 rounded-lg overflow-hidden shadow-md">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/100x100/e5e7eb/4b5563?text=N/A";
            }}
          />
        </div>

        {/* Product Details */}
        <div className="flex-grow mt-3 md:mt-0">
          <p className="text-gray-900 font-semibold text-base">{name}</p>
          <p className="text-gray-500 text-sm mt-0.5 mb-3">Size: {size}</p>
        </div>
      </div>
        
      {/* RIGHT SIDE: Price + Quantity + Remove */}
      <div className="flex-shrink-0 mt-3 md:mt-0 text-right flex flex-col items-end">
           <p className="text-gray-900 font-semibold text-base mb-2">${(price * quantity).toFixed(2)}</p>
           
           {/* Quantity Selector */}
           <div className="flex items-center border border-emerald-500 rounded-full h-8 w-fit mb-2">
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className="p-2 h-full text-emerald-600 hover:bg-emerald-100 rounded-l-full disabled:opacity-50 transition duration-150"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm font-medium text-emerald-800 select-none">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="p-2 h-full text-emerald-600 hover:bg-emerald-100 rounded-r-full transition duration-150"
            >
              <Plus size={14} /> {/* FIXED: Correctly closed the Plus component */}
            </button>
           </div>

           {/* Remove Button */}
           <button
              onClick={() => onRemove(id)}
              className="flex items-center justify-end text-xs font-medium text-red-500 hover:text-red-700 transition duration-150 w-full"
              aria-label={`Remove ${name}`}
          >
             <Trash size={12} className="mr-1" />
             Remove
          </button>
      </div>
      
    </div>
  );
};


// Component for related products
const BuyMoreSection = ({ onAddToCart }) => (
    <div className="mt-8 pt-6 border-t border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Buy More</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedProducts.map(product => (
                <div key={product.id} className="flex items-center bg-gray-50 p-3 rounded-xl shadow-sm">
                    <div className="w-16 h-16 flex-shrink-0 mr-3 rounded-md overflow-hidden">
                        <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="w-full h-full object-cover" 
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/64x64/e5e7eb/4b5563?text=N/A"; }}
                        />
                    </div>
                    <div className="flex-grow">
                        <p className="text-sm font-semibold text-gray-800">{product.name}</p>
                        <p className="text-xs text-gray-500">${product.price.toFixed(2)}</p>
                    </div>
                    <button
                        onClick={() => onAddToCart(product)}
                        className="flex items-center justify-center p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition duration-200 shadow-md"
                        title="Add to Cart"
                    >
                        <Plus size={16} />
                    </button>
                </div>
            ))}
        </div>
    </div>
);


// Component for the Final Order Summary & Calculations
const OrderSummaryCard = ({ subtotal, discount, onApplyCoupon, onCheckout, couponCode, setCouponCode, isCheckingOut }) => {
    // Hardcoded values for simplicity
    const delivery = 12.99;
    
    const total = subtotal - discount + delivery;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl sticky top-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b">Order Summary</h2>

            {/* Coupon Code Input (NOW BEFORE Price Breakdown) */}
            {!isCheckingOut && (
              <div className="mb-4 pb-4 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800 mb-2">Have a coupon code?</p>
                  <div className="flex space-x-2">
                      <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Enter code"
                          className="flex-grow px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
                      />
                      <button
                          onClick={onApplyCoupon}
                          className="flex-shrink-0 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition duration-300 shadow-md"
                      >
                          Apply
                      </button>
                  </div>
              </div>
            )}
            
            {/* Price Breakdown */}
            <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="font-medium">${delivery.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Discount</span>
                    <span className="font-medium text-red-600">-${discount.toFixed(2)}</span>
                </div>
            </div>

            {/* Total */}
            <div className="flex justify-between pt-4 mt-4 border-t border-gray-200">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <button 
                onClick={onCheckout}
                className="flex items-center justify-center w-full mt-6 px-6 py-3 bg-emerald-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-emerald-700 transition duration-300"
            >
                <ShoppingBag size={20} className="mr-2" />
                Proceed to Checkout
            </button>
        </div>
    );
}

// Main App component
const App = () => {
  const [products, setProducts] = useState(initialProducts);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(25.00); 
  const [isCheckingOut, setIsCheckingOut] = useState(false); // New state for checkout flow

  // Calculate Subtotal dynamically using useMemo
  const subtotal = useMemo(() => {
    return products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  }, [products]);


  // Handler to update quantity state
  const handleQuantityChange = (id, newQuantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, quantity: newQuantity } : product
      )
    );
  };
  
  // Handler to remove a product
  const handleRemoveProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
  };
  
  // Handler for adding a related product to cart
  const handleAddToCart = (newProduct) => {
    setProducts(prevProducts => {
        // Check if product already exists
        const existingProduct = prevProducts.find(p => p.id === newProduct.id);
        if (existingProduct) {
            return prevProducts.map(p => 
                p.id === newProduct.id ? { ...p, quantity: p.quantity + 1 } : p
            );
        } else {
            // Add new product with quantity 1 (using a unique ID structure to avoid collisions)
            const newId = Math.max(...prevProducts.map(p => p.id)) + 1 || 1;
            return [...prevProducts, { ...newProduct, id: newId, quantity: 1, size: 'One Size' }];
        }
    });
  };

  // Handler for applying coupon code (placeholder)
  const handleApplyCoupon = () => {
    console.log(`Attempting to apply coupon: ${couponCode}`);
    // Simulated discount application
    if (couponCode.toUpperCase() === 'SAVE20') {
        setDiscount(subtotal * 0.20);
    } else {
        setDiscount(25.00); // Default or failure discount
    }
  };
  
  // Placeholder for checkout action
  const handleCheckout = () => {
      console.log('Proceeding to Checkout with total:', subtotal - discount + 12.99);
      // In a real app, this would initiate payment/shipping steps
      setIsCheckingOut(true); 
  };


  return (
    // Outer container adjusted for full page website look, using min-h-screen for responsiveness
    <div className="flex justify-center min-h-screen bg-gray-50 p-4 sm:p-8 md:p-12 font-[Inter]">
      
      {/* Main Grid Container for Left (Cart) and Right (Summary) */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Cart Details (Takes 2/3 width on large screens) */}
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-xl">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 border-b pb-4">
            Shopping Cart
          </h1>

          {/* Product List */}
          <div className="divide-y divide-gray-100">
            {products.length > 0 ? (
                products.map((product) => (
                    <ProductItem
                      key={product.id}
                      product={product}
                      onQuantityChange={handleQuantityChange}
                      onRemove={handleRemoveProduct}
                    />
                ))
            ) : (
                <p className="py-8 text-center text-gray-500">Your cart is empty!</p>
            )}
          </div>
          
          {/* BUY MORE Section */}
          <BuyMoreSection onAddToCart={handleAddToCart} />
        </div>
        
        {/* RIGHT COLUMN: Order Summary (Takes 1/3 width on large screens) */}
        <div className="lg:col-span-1">
            <OrderSummaryCard 
                subtotal={subtotal}
                discount={discount}
                onApplyCoupon={handleApplyCoupon}
                onCheckout={handleCheckout}
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                isCheckingOut={isCheckingOut} // Pass state to control UI
            />
        </div>

      </div>
    </div>
  );
};

export default App;
