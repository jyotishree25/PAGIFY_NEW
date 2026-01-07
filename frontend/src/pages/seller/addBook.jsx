import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

export default function AddBook() {
  const [formData, setFormData] = useState({
    coverImage: null,
    bookPdf: null,
    title: "",
    description: "",
    price: "",
    offer: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.price) {
      toast.error("Please fill in all required fields.", { theme: "colored" });
      return;
    }

    // This is where you would handle the form submission to your backend
    console.log("Book data:", formData);
    toast.success("Book Added Successfully!", { theme: "colored" });
  };

  return (
    <>
      {/* Inline CSS for styling Toastify, since direct CSS imports don't work in this environment */}
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
          color: #fff;
          font-family: inherit;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .Toastify__toast--success {
          background-color: #10B981;
        }
        .Toastify__toast--error {
          background-color: #EF4444;
        }
        .Toastify__toast--info {
          background-color: #3B82F6;
        }
        .Toastify__toast-theme--dark {
          background-color: #1F2937;
        }
        .Toastify__progress-bar {
          background: rgba(255, 255, 255, 0.3);
        }
        .Toastify__close-button {
          color: #fff;
          opacity: 0.8;
        }
        `}
      </style>

      <div
        className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center"
        style={{ backgroundImage: 
          "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1470&q=80')", // bookstore theme
        }}
      >
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Add New Book</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Upload Book Cover */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Upload Book Cover Image
              </label>
              <input
                type="file"
                name="coverImage"
                accept="image/*"
                onChange={handleChange}
                className="w-full border p-2 rounded bg-white/50 text-gray-800"
              />
            </div>

            {/* Upload PDF */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Upload Book PDF
              </label>
              <input
                type="file"
                name="bookPdf"
                accept="application/pdf"
                onChange={handleChange}
                className="w-full border p-2 rounded bg-white/50 text-gray-800"
              />
            </div>

            {/* Title */}
            <input
              type="text"
              name="title"
              placeholder="Enter Book Name"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-white/50 text-gray-800 placeholder-gray-500"
              required
            />

            {/* Description */}
            <textarea
              name="description"
              placeholder="Enter a short description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-white/50 text-gray-800 placeholder-gray-500"
              rows="3"
              required
            ></textarea>

            {/* Price */}
            <input
              type="number"
              name="price"
              placeholder="Enter Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-white/50 text-gray-800 placeholder-gray-500"
              required
            />

            {/* Offer */}
            <input
              type="text"
              name="offer"
              placeholder="Enter Offer (Optional)"
              value={formData.offer}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-white/50 text-gray-800 placeholder-gray-500"
            />

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                type="submit"
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded shadow transition-colors"
              >
                Add Product
              </button>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded shadow transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
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
