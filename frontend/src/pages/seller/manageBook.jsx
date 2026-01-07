import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Trash2,
  BookOpen,
  PackageCheck,
  Pencil,
  X,
  Plus,
  Minus,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";

export default function ManageBook({ books = [], setBooks = () => {}, darkMode }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- Static fallback book data ---
  const sampleBook = {
    id: "201",
    title: "Demo Book Title",
    author: "John Doe",
    price: "₹499",
    stock: 25,
    available: true,
    category: "Fiction",
    description:
      "This is a sample book description. It provides details about the book, storyline, and author background.",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=500&q=80",
  };

  const bookData = books.find((b) => b.id === id) || sampleBook;

  // Local state
  const [book, setBook] = useState(bookData);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(book);
  const [tempStock, setTempStock] = useState(book.stock);

  // --- Toast helper ---
  const showToast = (msg, type = "success") => {
    toast[type](msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: darkMode ? "dark" : "light",
    });
  };

  // --- Delete handler ---
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setBooks((prev) => prev.filter((b) => b.id !== book.id));
      showToast("Product deleted successfully!", "error");
      navigate("/seller/dashboard");
    }
  };

  // --- Update stock only when clicking button ---
  const updateStock = () => {
    if (tempStock < 0) return;

    setBook({ ...book, stock: tempStock, available: tempStock > 0 });
    setBooks((prev) =>
      prev.map((b) =>
        b.id === book.id ? { ...b, stock: tempStock, available: tempStock > 0 } : b
      )
    );
    showToast("Stock updated successfully!", "info");
  };

  // --- Toggle availability ---
  const toggleAvailability = () => {
    const newAvailability = !book.available;
    setBook({ ...book, available: newAvailability });
    setBooks((prev) =>
      prev.map((b) =>
        b.id === book.id ? { ...b, available: newAvailability } : b
      )
    );
    showToast(
      newAvailability ? "Marked Available" : "Marked Out of Stock",
      "info"
    );
  };

  // --- Save Edited Product ---
  const handleEditSave = () => {
    setBook(editForm);
    setBooks((prev) =>
      prev.map((b) => (b.id === book.id ? { ...editForm } : b))
    );
    setIsEditing(false);
    showToast("Product updated successfully!");
  };

  // --- Upload Book Image ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditForm({ ...editForm, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <style>
        {`
        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
        }
        .Toastify__toast-container {
          padding: 10px;
        }
        .Toastify__toast {
          border-radius: 8px;
          background-color: #ffffff;
          color: #1F2937;
          font-family: inherit;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .Toastify__toast--success {
          border-left: 5px solid #10B981;
        }
        .Toastify__toast--error {
          border-left: 5px solid #EF4444;
        }
        .Toastify__toast--info {
          border-left: 5px solid #10B981;
        }
        .Toastify__toast-theme--dark {
          background-color: #1F2937;
          color: #fff;
        }
        .Toastify__progress-bar {
          background: rgba(0, 0, 0, 0.3);
        }
        .Toastify__progress-bar--dark {
          background: rgba(255, 255, 255, 0.3);
        }
        .Toastify__close-button {
          color: #1F2937;
          opacity: 0.8;
        }
        .Toastify__close-button--dark {
          color: #fff;
        }
        `}
      </style>
      <div
        className={`p-8 min-h-screen relative ${
          darkMode ? "bg-black text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold">Manage Product: {book.title}</h1>
        </div>

        {/* Product Card */}
        <div
          className={`rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-8 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Left: Product Image */}
          <div className="flex justify-center items-start">
            <img
              src={book.image}
              alt={book.title}
              className="w-48 h-64 object-cover rounded-lg shadow"
            />
          </div>

          {/* Right: Product Info */}
          <div className="md:col-span-2 space-y-6">
            {/* Title & Author */}
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center">
                <BookOpen className="mr-2" /> {book.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">by {book.author}</p>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4">
              <p>
                <span className="font-semibold">Price:</span> {book.price}
              </p>
              <p>
                <span className="font-semibold">Category:</span> {book.category}
              </p>
              <p>
                <span className="font-semibold">Product ID:</span> {book.id}
              </p>
              <p className="flex items-center space-x-2">
                <span className="font-semibold">Status:</span>
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${
                    book.available
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {book.available ? "Available" : "Out of Stock"}
                </span>
              </p>
            </div>

            {/* Stock Management */}
            <div>
              <h3 className="font-semibold mb-2 flex items-center">
                <PackageCheck className="mr-2" /> Stock Management
              </h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setTempStock((s) => Math.max(0, s - 1))}
                  className="p-2 rounded-lg bg-gray-300 dark:bg-gray-700"
                >
                  <Minus size={18} />
                </button>
                <input
                  type="number"
                  min="0"
                  value={tempStock}
                  onChange={(e) => setTempStock(parseInt(e.target.value))}
                  className={`w-24 px-3 py-2 border rounded-lg focus:outline-none text-center ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-black"
                  }`}
                />
                <button
                  onClick={() => setTempStock((s) => s + 1)}
                  className="p-2 rounded-lg bg-gray-300 dark:bg-gray-700"
                >
                  <Plus size={18} />
                </button>
                <button
                  onClick={updateStock}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
                >
                  Update Stock
                </button>
              </div>
              <div className="mt-3">
                <button
                  onClick={toggleAvailability}
                  className={`px-4 py-2 rounded-lg text-white font-medium ${
                    book.available
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {book.available ? "Mark Out of Stock" : "Mark Available"}
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-sm leading-relaxed">{book.description}</p>
            </div>

            {/* Actions */}
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => {
                  setEditForm(book);
                  setIsEditing(true);
                }}
                className="px-5 py-2 rounded-lg font-medium flex items-center space-x-2 bg-emerald-600 text-white hover:bg-emerald-700 shadow"
              >
                <Pencil size={18} />
                <span>Edit Product</span>
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 rounded-lg font-medium flex items-center space-x-2 bg-red-600 text-white hover:bg-red-700 shadow"
              >
                <Trash2 size={18} />
                <span>Delete Product</span>
              </button>
            </div>
          </div>
        </div>

        {/* Edit Product Modal */}
        {isEditing && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
              className={`w-full max-w-lg rounded-xl shadow-lg p-6 relative ${
                darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
              }`}
            >
              {/* Close button */}
              <button
                onClick={() => setIsEditing(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>

              <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

              {/* Form */}
              <div className="space-y-4">
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                  placeholder="Book Title"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  value={editForm.author}
                  onChange={(e) =>
                    setEditForm({ ...editForm, author: e.target.value })
                  }
                  placeholder="Author"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, price: e.target.value })
                  }
                  placeholder="Price"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  value={editForm.category}
                  onChange={(e) =>
                    setEditForm({ ...editForm, category: e.target.value })
                  }
                  placeholder="Category"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <textarea
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  placeholder="Description"
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={3}
                />

                {/* Image Upload */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full"
                />
                {editForm.image && (
                  <img
                    src={editForm.image}
                    alt="Preview"
                    className="w-32 h-44 object-cover rounded mt-2 mx-auto"
                  />
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSave}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
