import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, XCircle, CheckCircle } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";

export default function SellerOrder({ orders = [], setOrders = () => {}, darkMode }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  // NEW: Control dropdown visibility
  const [editingStatus, setEditingStatus] = useState(false);
  const [status, setStatus] = useState("Pending");
  const [tempStatus, setTempStatus] = useState(status);

  // --- Static fallback order ---
  const sampleOrder = {
    id: "101",
    book: "Demo Book",
    qty: 2,
    total: "₹998",
    status: "Pending",
    requirements: "Gift wrap the book with a note.",
    customerDetails: {
      name: "Alice Smith",
      email: "alice@example.com",
      phone: "+91 9876543210",
      address: "123 Demo Street, Kolkata",
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700001",
    },
  };

  const order = orders.find((o) => o.id === id) || sampleOrder;

  // --- Cancel order handler ---
  const handleCancelSubmit = (e) => {
    e.preventDefault();
    if (!cancelReason.trim()) {
      toast.error("Please provide a cancellation reason.", { theme: darkMode ? 'dark' : 'colored' });
      return;
    }
    toast.success(`Order cancelled successfully.`, { theme: darkMode ? 'dark' : 'colored' });
    setShowModal(false);
    navigate("/seller/dashboard");
  };

  // --- Save status update ---
  const handleSaveStatus = () => {
    setStatus(tempStatus);
    setEditingStatus(false);
    toast.success(`Order status updated to: ${tempStatus}`, { theme: darkMode ? 'dark' : 'colored' });
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
        .Toastify__toast-theme--colored .Toastify__toast--success {
          background-color: #10B981;
        }
        .Toastify__toast-theme--colored .Toastify__toast--error {
          background-color: #EF4444;
        }
        .Toastify__toast-theme--colored .Toastify__toast--info {
          background-color: #3B82F6;
        }
        .Toastify__toast-theme--dark {
          background-color: #1F2937;
          color: #fff;
        }
        .Toastify__progress-bar {
          background: rgba(255, 255, 255, 0.3);
        }
        .Toastify__progress-bar--dark {
          background: rgba(255, 255, 255, 0.3);
        }
        .Toastify__close-button {
          color: #fff;
          opacity: 0.8;
        }
        .Toastify__close-button--dark {
          color: #fff;
        }
        `}
      </style>
      <div
        className={`p-8 min-h-screen ${
          darkMode ? "bg-black text-white" : "bg-white text-gray-900"
        }`}
      >
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold">Manage Order: {order.id}</h1>
        </div>

        {/* Card */}
        <div
          className={`p-6 rounded-xl shadow ${
            darkMode ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Order Details */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              <p>
                <strong>Book:</strong> {order.book}
              </p>
              <p>
                <strong>Quantity:</strong> {order.qty}
              </p>
              <p>
                <strong>Total Price:</strong> {order.total}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    status === "Pending"
                      ? "text-yellow-500 font-semibold"
                      : status === "Shipped"
                      ? "text-blue-500 font-semibold"
                      : "text-green-500 font-semibold"
                  }
                >
                  {status}
                </span>
              </p>
              <p>
                <strong>Special Requirements:</strong> {order.requirements}
              </p>
            </div>

            {/* Customer Details */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
              <p>
                <strong>Name:</strong> {order.customerDetails.name}
              </p>
              <p>
                <strong>Email:</strong> {order.customerDetails.email}
              </p>
              <p>
                <strong>Phone:</strong> {order.customerDetails.phone}
              </p>
              <p>
                <strong>Address:</strong> {order.customerDetails.address}
              </p>
              <p>
                <strong>City:</strong> {order.customerDetails.city}
              </p>
              <p>
                <strong>State:</strong> {order.customerDetails.state}
              </p>
              <p>
                <strong>Pincode:</strong> {order.customerDetails.pincode}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-4 justify-end">
            {/* Update Status Button */}
            {!editingStatus ? (
              <button
                onClick={() => setEditingStatus(true)}
                className="px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 inline-flex items-center"
              >
                <CheckCircle size={18} className="mr-2" />
                Update Status
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                <select
                  value={tempStatus}
                  onChange={(e) => setTempStatus(e.target.value)}
                  className="px-4 py-2 rounded-full border dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <button
                  onClick={handleSaveStatus}
                  className="px-5 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingStatus(false)}
                  className="px-5 py-2 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Cancel Order */}
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 inline-flex items-center"
            >
              <XCircle size={18} className="mr-2" />
              Cancel Order
            </button>
          </div>
        </div>

        {/* Cancel Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div
              className={`rounded-xl shadow-lg w-full max-w-md p-6 ${
                darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
              }`}
            >
              <h2 className="text-xl font-bold mb-4">Cancel Order</h2>
              <form onSubmit={handleCancelSubmit}>
                <label className="block text-sm font-medium mb-2">
                  Reason for cancellation
                </label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-600"
                  placeholder="Enter the reason..."
                  rows={4}
                  required
                ></textarea>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                  >
                    Confirm Cancel
                  </button>
                </div>
              </form>
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
