import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Sidebar() {
  const [productsOpen, setProductsOpen] = useState(true);
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      logout();
      navigate("/login");
    }
  };

  const linkClass = ({ isActive }) => `sidebar-link${isActive ? " active" : ""}`;
  const sublinkClass = ({ isActive }) => `sidebar-sublink${isActive ? " active" : ""}`;

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-brand">ShopFront</div>

        <nav className="sidebar-nav">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>

          <button
            type="button"
            className="sidebar-link sidebar-toggle"
            onClick={() => setProductsOpen((open) => !open)}
          >
            Products
            <span className="sidebar-chevron">{productsOpen ? "▾" : "▸"}</span>
          </button>

          {productsOpen && (
  <div className="sidebar-submenu">
    <NavLink to="/products/electronics" className={sublinkClass}>
      Electronic Gadgets
    </NavLink>
    <NavLink to="/products/decorative" className={sublinkClass}>
      Decorative Items
    </NavLink>
    <NavLink to="/products/sarees" className={sublinkClass}>
      Sarees
    </NavLink>
    <NavLink to="/products/bangles" className={sublinkClass}>
      Bangles
    </NavLink>
  </div>
)}

          <NavLink to="/cart" className={linkClass}>
            Cart
            {totalItems > 0 && <span className="sidebar-badge">{totalItems}</span>}
          </NavLink>
        </nav>
      </div>

     <div className="sidebar-bottom">
  {isAuthenticated ? (
    <>
      <button
        type="button"
        className="sidebar-profile-btn"
        onClick={() => navigate("/profile")}
      >
        <div className="sidebar-avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <span className="sidebar-username">{user.name}</span>
      </button>
      <button
        type="button"
        className="sidebar-link sidebar-logout"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  ) : (
    <NavLink to="/login" className={linkClass}>
      Login
    </NavLink>
  )}
</div>
    </aside>
  );
}

export default Sidebar;