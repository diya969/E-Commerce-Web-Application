import { Link, useParams } from "react-router-dom";

function ProductCard({ product }) {
  const { category } = useParams();

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img
          src={product.imageUrl || "https://placehold.co/400x300?text=No+Image"}
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/400x300?text=No+Image";
          }}
        />
      </div>
      <div className="product-card-body">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">₹{Number(product.price).toFixed(2)}</span>
          <Link
            to={`/products/${category}/${product.id}`}
            className="btn btn-primary"
          >
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;