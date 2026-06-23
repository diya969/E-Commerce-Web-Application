import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/api";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    getProductById(id)
      .then((res) => setProduct(res.data))
      .catch(() => setError("Product not found."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <p className="status-message">Loading...</p>;
  if (error) return <p className="status-message status-error">{error}</p>;

  return (
    <div className="page detail-page">
      <button className="btn-back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="detail-card">
        <div className="detail-image-wrapper">
          <img
            src={product.imageUrl || "https://placehold.co/600x400?text=No+Image"}
            alt={product.name}
            className="detail-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/600x400?text=No+Image";
            }}
          />
        </div>

        <div className="detail-info">
          <span className="detail-category">{product.category}</span>
          <h1 className="detail-name">{product.name}</h1>
          <p className="detail-description">{product.description}</p>

          <div className="detail-price">₹{Number(product.price).toFixed(2)}</div>

          <button
            className={`btn btn-primary detail-add-btn ${added ? "btn-added" : ""}`}
            onClick={handleAddToCart}
          >
            {added ? "✓ Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;