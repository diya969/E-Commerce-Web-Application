import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";

const CATEGORY_LABELS = {
  electronics: "Electronic Gadgets",
  decorative: "Decorative Items",
  sarees: "Sarees",
  bangles: "Bangles",
};

function Products() {
  const { category } = useParams();
  const categoryLabel = CATEGORY_LABELS[category];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getProducts()
      .then((res) => {
        if (isMounted) setProducts(res.data);
      })
      .catch(() => {
        if (isMounted) setError("Could not load products. Please try again later.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const categoryProducts = products.filter((p) => p.category === categoryLabel);
  const filteredProducts = categoryProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="status-message">Loading products...</p>;
  if (error) return <p className="status-message status-error">{error}</p>;

  return (
    <div className="page products-page">
      <div className="products-header">
        <h1>{categoryLabel || "Products"}</h1>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="status-message">No products found in this category.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;