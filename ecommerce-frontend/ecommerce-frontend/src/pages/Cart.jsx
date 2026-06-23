import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="page cart-page">
        <h1>Your Cart</h1>
        <p className="status-message">
          Your cart is empty. <Link to="/">Browse products</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="page cart-page">
      <h1>Your Cart</h1>

      <div className="cart-list">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>₹{item.price.toFixed(2)} each</p>
            </div>

            <div className="cart-item-controls">
              <button
                className="btn-qty"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                aria-label={`Decrease quantity of ${item.name}`}
              >
                −
              </button>
              <span className="cart-item-qty">{item.quantity}</span>
              <button
                className="btn-qty"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                aria-label={`Increase quantity of ${item.name}`}
              >
                +
              </button>
            </div>

            <div className="cart-item-subtotal">
              ₹{(item.price * item.quantity).toFixed(2)}
            </div>

            <button className="btn-remove" onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <span>Total</span>
        <strong>₹{totalPrice.toFixed(2)}</strong>
      </div>

      <button className="btn btn-primary btn-block" onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Cart;
