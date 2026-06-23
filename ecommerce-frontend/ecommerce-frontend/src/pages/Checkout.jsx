import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createOrder, getProfile, updateProfile } from "../services/api";

function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [savedAddress, setSavedAddress] = useState("");
  const [address, setAddress] = useState("");
  const [editingAddress, setEditingAddress] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const [placed, setPlaced] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    getProfile()
      .then((res) => {
        const addr = res.data.address || "";
        setSavedAddress(addr);
        setAddress(addr);
        if (!addr) setEditingAddress(true);
      })
      .catch(() => setEditingAddress(true))
      .finally(() => setLoadingProfile(false));
  }, []);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (items.length === 0 && !placed) return <Navigate to="/" replace />;

  const handleSaveAddress = async () => {
  try {
    const profileRes = await getProfile();
    await updateProfile({ name: profileRes.data.name, address });
    setSavedAddress(address);
    setEditingAddress(false);
  } catch {
    setError("Could not save address.");
  }
};

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      setError("Please add a delivery address before placing the order.");
      setEditingAddress(true);
      return;
    }
    setPlacing(true);
    setError("");
    try {
      await Promise.all(
        items.map((item) =>
          createOrder({ productId: item.id, quantity: item.quantity })
        )
      );
      clearCart();
      setPlaced(true);
    } catch {
      setError("Could not place your order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  if (placed) {
  return (
    <div className="page checkout-page">
      <div className="checkout-success">
        <div className="success-icon-wrapper">
          <svg className="success-circle" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke="#6e9c46" strokeWidth="6" />
            <polyline
              className="success-check"
              points="28,52 43,67 72,34"
              fill="none"
              stroke="#6e9c46"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="success-title">Order placed!</h1>
        <p className="success-subtitle">
          Thanks for shopping with us. Your order is confirmed.
        </p>

        <div className="success-address-card">
          <div className="success-address-label">Delivering to</div>
          <p className="success-address-text">{savedAddress}</p>
        </div>

        <button className="btn btn-primary success-btn" onClick={() => navigate("/")}>
          Continue shopping
        </button>
      </div>
    </div>
  );
}

  return (
    <div className="page checkout-page">
      <h1>Checkout</h1>

      {/* Address section */}
      <div className="checkout-address-section">
        <div className="checkout-section-title">Delivery address</div>

        {!editingAddress ? (
          <div className="checkout-address-box">
            <p className="checkout-address-display">{savedAddress}</p>
            <button
              className="btn-link"
              onClick={() => setEditingAddress(true)}
            >
              Change address
            </button>
          </div>
        ) : (
          <div className="checkout-address-edit">
            <textarea
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House / flat no., Street, City, State, PIN code"
              className="checkout-address-input"
            />
            <div className="checkout-address-actions">
              <button className="btn btn-primary" onClick={handleSaveAddress}>
                Use this address
              </button>
              {savedAddress && (
                <button
                  className="btn-link"
                  onClick={() => {
                    setAddress(savedAddress);
                    setEditingAddress(false);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Order summary */}
      <div className="checkout-summary">
        {items.map((item) => (
          <div key={item.id} className="checkout-row">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="checkout-row checkout-total">
          <span>Total</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {error && <p className="form-error">{error}</p>}

      {loadingProfile ? null : (
        <button
          className="btn btn-primary btn-block"
          onClick={handlePlaceOrder}
          disabled={placing}
        >
          {placing ? "Placing order..." : "Place Order"}
        </button>
      )}
    </div>
  );
}

export default Checkout;